import * as React from 'react';
import Paper from 'material-ui/Paper/Paper';
import { Route, match, Redirect, Switch } from 'react-router';
import { History, Location } from 'history';
import ContestMenu from './contestMenu';
import ProblemTable from '../problem/problemTable';
import { ContestMeta, ProblemInfo, FullContestInfo } from '../typings';
import ContestApi from '../api/contestApi';
import SubmitForm from './submitForm';
import Standings from './standings';

interface IContestControllerProps {
  match: match<any>;
  history: History;
  location: Location;
}

interface IContestControllerState {
  contestInfo: FullContestInfo;
  currentTab: Tab['pathTo'];
  standings: any;
}

export type Tab = {
  name: string;
  pathTo: string;
}

const tabs: Tab[] = [
  {
    name: 'Задачи',
    pathTo: 'problems'
  },
  {
    name: 'Отправка',
    pathTo: 'submit'
  },
  {
    name: 'Посылки',
    pathTo: 'submits'
  },
];

export default class ContestController extends React.Component<IContestControllerProps, IContestControllerState> {
  constructor(props: IContestControllerProps) {
    super(props);
    const currentTab = tabs.find(link => props.location.pathname.endsWith(link.pathTo))
      || tabs[0];
      
    if (currentTab.pathTo === 'submits')
      this.fetchStandings();

    this.state = {
      contestInfo: null,
      currentTab: currentTab.pathTo,
      standings: null,
    };
  }

  handleTabChange = (_, value) => {
    if (value === 'submits')
      this.fetchStandings();
    this.setState({ currentTab: value }, () =>
      this.props.history.push(this.props.match.url + '/' + value)
    );
  }

  fetchContestInfo() {
    const contestId = this.props.match.params.contestId;
    if (contestId)
      ContestApi.GetContestInfo(contestId)
        .then(contestInfo => this.setState({ contestInfo }));
  }

  fetchStandings() {
    if (this.state.contestInfo)
      ContestApi.GetStandings(this.state.contestInfo.meta.id)
        .then(standings => this.setState({ standings }))
        .catch(console.log);
  }

  componentDidMount() {
    this.fetchContestInfo();
  }

  render() {
    const { match, history } = this.props;
    const { currentTab } = this.state;
    const contestInfo = this.state.contestInfo;
    const problems = contestInfo && contestInfo.problems || [];
    const current = match.url + '/';
    const toProblems = current + 'problems';
    return <div>
      <div>
        <ContestMenu
          currentTab={currentTab}
          handleTabChange={this.handleTabChange}
          tabs={tabs}
        />
      </div>
      <Switch>
        <Redirect exact from={current} to={toProblems} />
        <Route
          exact
          path={toProblems}
          render={(props) => <Paper>
            <ProblemTable problems={problems} />
          </Paper>} />
        <Route
          exact
          path={current + 'submit'}
          render={(props) => <SubmitForm contestId={contestInfo && contestInfo.meta.id} problems={problems} />} />
        <Route
          exact
          path={current + 'submits'}
          render={(props) => <Standings standings={this.state.standings} />} />
      </Switch>
    </div>
  }
} 