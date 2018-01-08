import * as React from 'react';
import { ContestMeta } from '../typings';
import ContestCard from './contestCard';
import { StyleRules } from 'material-ui/styles';
import withStyles from 'material-ui/styles/withStyles';
import contestApi from '../api/contestApi';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography/';
import Update from 'material-ui-icons/Update';

interface IContestListState {
  contests: ContestMeta[];
  expandedContestIndx: number;
}

interface IContestListProps {
  classes?: any;
}

const styles: StyleRules = {
  cardWrapper: {
    marginBottom: 20,
  },
  wrapper: {
  }
}

class ContestList extends React.Component<IContestListProps, IContestListState> {
  constructor(props) {
    super(props);
    this.state = {
      contests: [],
      expandedContestIndx: -1,

    }
  }

  fetchContests() {
    contestApi.GetContests()
      .then(contests => this.setState({ contests }));
  }

  componentDidMount() {
    this.fetchContests();
  }

  handleExpandContest(event, expand, index) {
    this.setState(prevState => ({
      expandedContestIndx: prevState.expandedContestIndx === index && !expand
        ? -1
        : index,
    }));
  }

  render() {
    const { classes } = this.props;
    return (<div>
      <div className={classes.wrapper} >
        <IconButton style={{ verticalAlign: 'middle' }} color='contrast' onClick={this.fetchContests}>
          <Update />
        </IconButton>
        <Typography type='title' style={{ display: 'inline' }}>
          Список доступных вам контестов:
       </Typography>
      </div>
      {
        this.state.contests &&
        this.state.contests
          .map((contest, index) => <div key={contest.id} className={classes.cardWrapper}>
            <ContestCard
              isExpanded={this.state.expandedContestIndx === index}
              contest={contest}
              onExpand={(event, expand) => this.handleExpandContest(event, expand, index)} />
          </div>
          )
      }
    </div>)
  }

}

export default withStyles(styles)<IContestListProps>(ContestList as any);