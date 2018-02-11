import * as React from 'react';
import AuthService from '../auth/authService';
import Paper from 'material-ui/Paper/Paper';
import { FormGroup, FormControl } from 'material-ui/Form';
import TextField from 'material-ui/TextField';
import { StyleRules } from 'material-ui/styles';
import withStyles from 'material-ui/styles/withStyles';
import Typography from 'material-ui/Typography/Typography';
import ContestApi from '../api/contestApi';
import { ProblemInfo, ContestInfo, Enhance } from '../typings';
import { formatTime } from '../DateFormats';
import ProblemTable from '../problem/problemTable';
import Checkbox from 'material-ui/Checkbox';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import AddIcon from 'material-ui-icons/Add';
import DeleteIcon from 'material-ui-icons/Delete';
import contestApi from '../api/contestApi';
import problemsApi from '../api/problemsApi';

interface IContestBuilderProps {
  classes?: any;
  match: any;
}

interface IContestBuilderState {
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  name: string;
  contestProblems: ProblemInfo[];
  allProblems: ProblemInfo[];
  includeExternal: boolean;
}

const toIsoDate = (date: Date) => date.toISOString().substring(0, 10);

class ContestBuilder extends React.Component<IContestBuilderProps, IContestBuilderState> {
  createEnhance = (onCheck): Enhance<ProblemInfo> => ({
    title: '',
    width: 80,
    renderCell: (problem: ProblemInfo) => (
      <IconButton>
        <AddIcon />
      </IconButton>
    )
  });

  enhance = [{
    title: '',
    width: 50,
    renderCell: (problem: ProblemInfo) => (
      <IconButton>
        <AddIcon />
      </IconButton>
    )
  }];


  constructor(props) {
    super(props);
    const now = toIsoDate(new Date());

    this.state = {
      startDate: now,
      startTime: '12:00',
      endDate: now,
      endTime: '17:00',
      name: '',
      contestProblems: [],
      allProblems: [],
      includeExternal: false,
    };
  }

  destructContestInfoToState = (contestInfo: ContestInfo): IContestBuilderState => {
    const endDate = new Date(contestInfo.startTime);
    const startDate = new Date(contestInfo.finishTime);
    return {
      contestProblems: contestInfo.problems,
      name: contestInfo.name,
      endDate: toIsoDate(endDate),
      startDate: toIsoDate(startDate),
      startTime: formatTime(startDate),
      endTime: formatTime(endDate),
    } as IContestBuilderState;
  }

  fetchContestInfo = (contestId) => {
    if (!contestId)
      return;
    ContestApi.GetContestInfo(contestId)
      .then(data => this.setState(this.destructContestInfoToState(data)));
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

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
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
    const { endDate, endTime, startDate, startTime, contestProblems, allProblems, includeExternal } = this.state;
    const contestProblemsNamesSet = new Set(contestProblems.map(p => p.name));
    const otherProblems = allProblems.filter(p => contestProblemsNamesSet.has(p.name));
    return (
      <Paper className={classes.container}>
        <FormGroup className={classes.group}>
          <Typography type='headline'>
            Контест билдер, йоу!
          </Typography>
          <FormControl className={classes.nameForm}>
            <TextField
              onChange={this.handleChange}
              name='name'
              value={this.state.name}
              label='Название контеста'
            />
          </FormControl>
          <FormControl className={classes.form}>
            <TextField
              name='startDate'
              type='date'
              onChange={this.handleChange}
              value={startDate}
              label='Дата начала'
            />
            <TextField
              autoFocus
              name='startTime'
              type='time'
              onChange={this.handleChange}
              value={startTime}
              label='Время начала'
            />
          </FormControl>
          <FormControl className={classes.form}>
            <TextField
              name='endDate'
              type='date'
              onChange={this.handleChange}
              value={endDate}
              label='Дата окончания'
            />
            <TextField
              name='endTime'
              type='time'
              onChange={this.handleChange}
              value={endTime}
              label='Время окончания'
            />
          </FormControl>
        </FormGroup>
        <div>
          <Typography type='subheading'>
            Задачи в контесте
        </Typography>
          <ProblemTable
            problems={contestProblems}
            enhance={this.enhance}
          />
        </div>
        <div>
          <Typography type='subheading'>
            Все задачи
          </Typography>
          <Checkbox
            checked={includeExternal}
            onChange={this.handleCheckboxChange}
            name='includeExternal'
          />
          <ProblemTable
            problems={otherProblems}
            enhance={this.enhance}
          />
        </div>
      </Paper>
    );
  }
}

const selectWidth = 170;

const styles: StyleRules = {
  container: {
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  group: {
    width: selectWidth * 2 + 20,
    marginBottom: 30,
  },
  form: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    '& > div': {
      width: selectWidth,
    },
    marginBottom: 10,
  },
  nameForm: {
    marginBottom: 15,
  }
};

export default withStyles(styles)<IContestBuilderProps>(ContestBuilder as any);