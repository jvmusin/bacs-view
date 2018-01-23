import * as React from 'react';
import { ProblemInfo, ContestMeta, Language } from '../typings';
import Select from 'material-ui/Select';
import Button from 'material-ui/Button';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormGroup, FormControl, FormHelperText } from 'material-ui/Form';
import Paper from 'material-ui/Paper';
import { StyleRules } from 'material-ui/styles';
import withStyles from 'material-ui/styles/withStyles';
import ContestApi from '../api/contestApi';

interface ISubmitProps {
  contestId: ContestMeta['id'],
  problems: ProblemInfo[];
  classes?: any;
}

interface ISubmitState {
  problemIndex: ProblemInfo['index'];
  language: string;
  solution: string;
}

const avaliableLanguages: Language[] = [
    'C',
    'CPP',
    'Delphi',
    'FPC',
    'Python2',
    'Python3',
    'Mono',
];

class SubmitForm extends React.Component<ISubmitProps, ISubmitState> {
  constructor(props) {
    super(props);
    this.state = {
      problemIndex: '',
      language: '',
      solution: '',
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  submit = () => {
    ContestApi.SubmitSolution(     
      this.state.problemIndex,
      this.state.solution,
      this.state.language,
      this.props.contestId
    );
    this.setState({ solution: '' });
  }

  render() {
    const { problems, classes } = this.props;
    const { language, problemIndex, solution } = this.state;
    return (
      <Paper>
        <FormGroup className={classes.wrapper}>
          <FormControl>
            <InputLabel htmlFor='problem-index'>Задача</InputLabel>
            <Select
              autoWidth
              value={this.state.problemIndex}
              onChange={this.handleChange}
              input={<Input name='problemIndex' id='problem-index' />}
            >
              <MenuItem value=''>
                <em>None</em>
              </MenuItem>
              {
                problems.map(problem => (
                  <MenuItem key={problem.index} value={problem.index}>{problem.name}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel htmlFor='language'>Язык</InputLabel>
            <Select
              autoWidth
              value={this.state.language}
              onChange={this.handleChange}
              input={<Input name='language' id='language' />}
            >
              <MenuItem value=''>
                <em>None</em>
              </MenuItem>
              {
                avaliableLanguages.map(language => (
                  <MenuItem key={language} value={language}>{language}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
          <textarea
            name='solution'
            value={this.state.solution}
            onChange={this.handleChange}
            placeholder='print(1)'
          />
          <Button disabled={!(
            this.state.solution &&
            this.state.language &&
            this.state.problemIndex
          )}
          onClick={this.submit} 
          >
            Отправить решение
        </Button>
        </FormGroup>
      </Paper>
    );
  }
}

const styles: StyleRules = {
  wrapper: {
    padding: '15px 10px',
    '&>*': {
      marginBottom: 15,
    }
  },
}

export default withStyles(styles)<ISubmitProps>(SubmitForm as any);