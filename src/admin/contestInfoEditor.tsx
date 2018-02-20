import * as React from 'react';
import { ContestInfo } from '../typings';
import { FormGroup, FormControl } from 'material-ui/Form/'
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import withStyles from 'material-ui/styles/withStyles';
import { StyleRules } from 'material-ui/styles';

interface IContestInfoEditorProps {
  onChangeContestInfo: (contestInfo: ContestInfo) => void;
  contestInfo: ContestInfo;
  classes?: any;
}

const substringToDateAndTime = (dateInISO: string) => [dateInISO.substring(0, 10), dateInISO.substring(11, 19)];
const combainDate = (date: string, time: string) => date + 'T' + time;

class ContestInfoEditor extends React.Component<IContestInfoEditorProps> {
  handleChange = (event) => {
    this.props.onChangeContestInfo({
      ...this.props.contestInfo,
      [event.target.name]: event.target.value
    });
  }

  render() {
    const { classes, contestInfo, onChangeContestInfo } = this.props;
    const [startDate, startTime] = substringToDateAndTime(contestInfo.startTime);
    const [finishDate, finishTime] = substringToDateAndTime(contestInfo.finishTime);

    return <FormGroup className={classes.group}>
    <Typography type='headline'>
        Контест билдер, йоу!
    </Typography>
      <FormControl className={classes.nameForm}>
        <TextField
          onChange={this.handleChange}
          name='name'
          value={name}
          label='Название контеста'
          autoFocus
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
          value={finishDate}
          label='Дата окончания'
        />
        <TextField
          name='endTime'
          type='time'
          onChange={this.handleChange}
          value={finishTime}
          label='Время окончания'
        />
      </FormControl>
    </FormGroup>
  }
}

const selectWidth = 170;

const styles: StyleRules = {
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

export default withStyles(styles)<IContestInfoEditorProps>(ContestInfoEditor as any);