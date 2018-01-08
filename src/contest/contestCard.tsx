import * as React from 'react';
import { ContestMeta } from '../typings';
import ExpansionPanel, {
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import { format, FormatType, getDateDiff, TimeDiffType, padToTwoDigit } from '../DateFormats';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import { StyleRules, withStyles } from 'material-ui/styles';

interface IContestCardProps {
  contest: ContestMeta;
  isExpanded: boolean;
  onExpand: (event, expand?) => void;
  classes?: any;
}

function formatContinuingContestTime(now: Date, finish: Date) {
  const minDiff = getDateDiff(finish, now, TimeDiffType.Minutes);
  const hour = minDiff / 60 | 0;
  const min = minDiff % 60;
  return (hour ? hour : '') + 'ч. ' + padToTwoDigit(min) + 'мин.';
}

const styles: StyleRules = {

};

const ContestCard = (props: IContestCardProps) => {
  const { contest, isExpanded, onExpand, classes } = props;
  const start = new Date(contest.startTime);
  const finish = new Date(contest.finishTime);
  const now = new Date();
  return (
    <ExpansionPanel expanded={isExpanded} onChange={onExpand}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <div>
          <Typography type='headline' >
            {contest.name}
          </Typography>
          <Typography type='subheading'>
            {
              now < start &&
              'Начнется ' + format(start)
            }
            {
              now > finish &&
              'Закончился ' + (
                getDateDiff(now, finish, TimeDiffType.Day) > 1
                  ? format(finish, FormatType.Date)
                  : getDateDiff(now, finish, TimeDiffType.Hour) <= 1
                    ? 'менее часа назад'
                    : getDateDiff(now, finish, TimeDiffType.Hour) + 'часов назад'
              )
            }
            {
              now > start && now < finish && (
                getDateDiff(finish, now, TimeDiffType.Day) > 1
                  ? 'Закончится ' + format(finish)
                  : 'До конца контеста осталось ' +
                  formatContinuingContestTime(now, finish)
              )
            }
          </Typography>
        </div>
      </ExpansionPanelSummary>
    </ExpansionPanel>
  )
};

export default withStyles(styles)(ContestCard);