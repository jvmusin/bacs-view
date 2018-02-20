import AddIcon from 'material-ui-icons/Add';
import DeleteIcon from 'material-ui-icons/Delete';
import Button from 'material-ui/Button';
import Checkbox from 'material-ui/Checkbox';
import { FormControl, FormControlLabel, FormGroup } from 'material-ui/Form';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper/Paper';
import { StyleRules } from 'material-ui/styles';
import withStyles from 'material-ui/styles/withStyles';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography/Typography';
import * as React from 'react';
import ContestInfoEditer from './ContestInfoEditor';
import ContestApi from '../api/contestApi';
import problemsApi from '../api/problemsApi';
import AuthService from '../auth/authService';
import { formatTime } from '../DateFormats';
import ProblemTable from '../problem/problemTable';
import {
  ArchiveProblem,
  ContestInfo,
  ContestProblem,
  Enhance
  } from '../typings';

interface IContestBuilderProps {
  classes?: any;
  match: any;
}
type FullProblemInfo = ArchiveProblem & ContestProblem;
interface IContestBuilderState {
  allProblems: ArchiveProblem[];
  includeExternal: boolean;
  contestInfo: ContestInfo;
  error: boolean;
}

class ContestBuilder extends React.Component<IContestBuilderProps, IContestBuilderState> {
  indexes;
  catch = (e) => console.log(e) || this.setState({ error: true })
  constructor(props) {
    super(props);
    const start = new Date();
    const finish = new Date();
    finish.setHours(start.getHours() + 5);

    this.state = {
      contestInfo: {
        startTime: start.toISOString(),
        finishTime: finish.toISOString(),
        name: '',
        problems: [],
        id: null,
      },
      allProblems: [],
      includeExternal: false,
      error: false,
    };
    this.indexes = {};
    this.handleProblemIndexChange = this.handleProblemIndexChange.bind(this);
  }

  fetchContestInfo = async (contestId) => {
    if (!contestId)
      return;
    const contestInfo = await ContestApi.GetContestInfo(contestId);
    this.setState({
      contestInfo
    });
    const problems = contestInfo && contestInfo.problems;
    if (!problems)
      return;
    await this.patchProblems(problems);
  }

  private async patchProblems(problems: ContestProblem[]) {
    const archiveProblems = await Promise.all(problems.map(problem => problemsApi.GetArchiveProblem(problem.contestId, problem.index)));
    const updatedByArchiveIdsProblems = problems.map((p, index) => ({
      ...p,
      ...archiveProblems[index]
    }));
    this.setState(prevState => ({
      contestInfo: {
        ...prevState.contestInfo,
        problems: updatedByArchiveIdsProblems,
      }
    }));
  }

  fetchAllProblems = () => {
    problemsApi.GetProblems(this.state.includeExternal)
      .then(allProblems => this.setState({ allProblems }))
  }

  componentWillReceiveProps(nextProps) {
    this.fetchContestInfo(
      nextProps.match.params.contestId
    );
  }

  componentDidMount() {
    this.fetchContestInfo(
      this.props.match.params.contestId
    );
  }

  handleCheckboxChange = (event) => {
    this.setState({
      [event.target.name]: event.target.checked
    });
  }

  render() {
    if (!AuthService.IsAdmin()) {
      return null;
    }
    const { classes } = this.props;
    const { contestInfo, allProblems, includeExternal } = this.state;
    const contestProblemsNamesSet = new Set(contestInfo.problems.map(p => p.name));
    const otherProblems = allProblems.filter(p => !contestProblemsNamesSet.has(p.name));
    return (
      <Paper className={classes.container}>
        <ContestInfoEditer />
        <div>
          <Typography type='subheading'>
            Задачи в контесте
          </Typography>
            <ProblemTable
              problems={contestInfo.problems}
            />
        </div>
        <div>
          <Typography type='subheading'>
            Все задачи
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={includeExternal}
                onChange={this.handleCheckboxChange}
                name='includeExternal'
              />
            }
            label='External'
          />
          <Button onClick={this.fetchAllProblems}>
            Загрузить все задачи (будет больно)
          </Button>
          <ProblemTable
            problems={otherProblems}
            enhance={this.allProblemsEnhance}
            withPaging
          />
        </div>
      </Paper>
    );
  }

  updateContest = async (contestInfo) => {
    return ContestApi.EditContest(this.props.match.params.contestId, contestInfo);
  }

  handleAddProblem = (problem: ArchiveProblem) => () => {
    const patchedProblem = {
      ...problem,
      index: this.indexes[problem.problemId.resourceProblemId],
    }
    const newProblems = [...this.state.contestInfo.problems, patchedProblem];
    const newInfo = {
      ...this.state.contestInfo,
      problems: newProblems,
    }
    this.updateContest(newInfo)
      .then(() => this.setState({ contestInfo: newInfo }))
      .catch(this.catch);
  }

  handleProblemIndexChange(event) {
    this.indexes[event.target.name] = event.target.value;
    this.setState({});
  }

  allProblemsEnhance = [{
    title: '',
    width: 150,
    renderCell: (problem: ArchiveProblem) => {
      const index = this.indexes[problem.problemId.resourceProblemId];
      return <>
        <TextField
          error={index === ''}
          name={problem.problemId.resourceProblemId}
          value={index}
          onChange={this.handleProblemIndexChange}
        />
        <IconButton onClick={this.handleAddProblem(problem)} >
          <AddIcon />
        </IconButton>
      </>
    }
  }];
}

const styles: StyleRules = {
  container: {
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
};

export default withStyles(styles)<IContestBuilderProps>(ContestBuilder as any);