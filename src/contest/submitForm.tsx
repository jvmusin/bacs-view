import * as React from 'react';
import { ContestProblem, ContestInfo, Language } from '../typings';
import Select from 'material-ui/Select';
import Button from 'material-ui/Button';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormGroup, FormControl, FormHelperText } from 'material-ui/Form';
import Paper from 'material-ui/Paper';
import { StyleRules } from 'material-ui/styles';
import withStyles from 'material-ui/styles/withStyles';
import ContestApi from '../api/contestApi';
import NativeSelect from '../common/select';

interface ISubmitProps {
  contestId: ContestInfo['id'],
  problems: ContestProblem[];
  classes?: any;
}

interface ISubmitState {
  problemIndex: ContestProblem['index'];
  language: Language;
  solution: string;
}

const avaliableLanguages: string[] = Object.keys(Language).map(key => Language[key]);

class SubmitForm extends React.Component<ISubmitProps, ISubmitState> {
  constructor(props) {
    super(props);
    this.state = {
      problemIndex: '',
      language: null,
      solution: '',
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  submit = () => {
    const unFormattedLanguage = Language.keyOf(this.state.language);
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
      <Paper className={classes.wrapper}>
        <FormGroup className={classes.formGroup}>
          <NativeSelect
            label={'Задача'}
            name={'problemIndex'}
            onChange={this.handleChange}
            selectedValue={this.state.problemIndex}
            values={problems.map(p => p.name)}
          />
          <NativeSelect
            label={'Язык'}
            name={'language'}
            onChange={this.handleChange}
            selectedValue={this.state.language}
            values={avaliableLanguages}
          />
        </FormGroup>
        <textarea
          className={classes.codePlace}
          name='solution'
          rows={20}
          value={this.state.solution}
          onChange={this.handleChange}
          placeholder='print(1)'
        />
        <Button disabled={!(
          this.state.solution &&
          this.state.language &&
          this.state.problemIndex
        )}
          className={classes.submitButton}
          onClick={this.submit}>
          Отправить решение
        </Button>
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
  formGroup: {
    maxWidth: '20%',
    minWidth: 70,
    '&>*': {
      marginBottom: 15,
    }
  },
  codePlace: {
    maxWidth: '100%',
    width: '100%',
  },
  submitButton: {
    width: '100%',
  }
}

export default withStyles(styles)<ISubmitProps>(SubmitForm as any);