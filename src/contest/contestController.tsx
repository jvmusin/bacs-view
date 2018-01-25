import * as React from 'react';
import Paper from 'material-ui/Paper/Paper';
import { Route, match, Redirect, Switch } from 'react-router';
import { History, Location } from 'history';
import ContestMenu from './contestMenu';
import ProblemTable from '../problem/problemTable';
import { ContestMeta, ProblemInfo, FullContestInfo, Submission } from '../typings';
import ContestApi from '../api/contestApi';
import SubmitForm from './submitForm';
import Submits from './submits';
import Standings from './standings';
import AuthService from '../auth/authService';

interface IContestControllerProps {
  match: match<any>;
  history: History;
  location: Location;
}

interface IContestControllerState {
  contestInfo: FullContestInfo;
  currentTab: Tab['pathTo'];
  standing: any;
  submits: Submission[];
}

export type Tab = {
  name: string;
  pathTo: string;
}

enum PagePath {
  Problems = 'problems',
  Standings = 'standings',
  Submits = 'submits',
  Submit = 'submit',
}

const tabs: Tab[] = [
  {
    name: 'Задачи',
    pathTo: PagePath.Problems
  },
  {
    name: 'Монитор',
    pathTo: PagePath.Standings
  },
  {
    name: 'Отправка',
    pathTo: PagePath.Submit
  },
  {
    name: 'Посылки',
    pathTo: PagePath.Submits
  },
];

export default class ContestController extends React.Component<IContestControllerProps, IContestControllerState> {
  fetchBypageName;
  constructor(props: IContestControllerProps) {
    super(props);
    const currentTab = tabs.find(link => props.location.pathname.endsWith(link.pathTo))
      || tabs[0];

    this.state = {
      contestInfo: null,
      currentTab: currentTab.pathTo,
      standing: null,
      submits: [],
    };

    this.fetchBypageName = (pageName) => {
      pageName = pageName || this.state.currentTab;
      switch(pageName) {
        case PagePath.Submits: return this.fetchSubmits();
        case PagePath.Standings: return this.fetchStanding();
      }
    }
  }

  handleTabChange = (_, value) => {
    this.fetchBypageName(value);

    this.setState({ currentTab: value }, () =>
      this.props.history.push(this.props.match.url + '/' + value)
    );
  }

  fetchContestInfo() {
    const contestId = this.props.match.params.contestId;
    return ContestApi.GetContestInfo(contestId)
      .then(contestInfo => this.setState({ contestInfo }));
  }

  fetchStanding() {
    if (this.state.contestInfo)
      ContestApi.GetStandings(this.state.contestInfo.meta.id)
        .then(standing => this.setState({ standing }))
        .catch(console.log);
  }

  fetchSubmits() {
    if (this.state.contestInfo)
      ContestApi.GetSubmissions(this.state.contestInfo.meta.id)
        .then(submits => this.setState({ submits }))
        .catch(console.log);
  }

  componentDidMount() {
    this.fetchContestInfo()
      .then(() => this.fetchBypageName());
    
  }

  render() {
    const { match, history } = this.props;
    const { currentTab, contestInfo } = this.state;
    const problems = contestInfo && contestInfo.problems || [];
    const current = match.url + '/';
    const toProblems = current + PagePath.Problems;
    const isAdmin = AuthService.IsAdmin();
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
          path={current + PagePath.Submit}
          render={(props) => <SubmitForm contestId={contestInfo && contestInfo.meta.id} problems={problems} />} />
        <Route
          exact
          path={current + PagePath.Submits}
          render={(props) => <Submits isAdmin={isAdmin} submissions={this.state.submits} />} />
        <Route
          exact
          path={current + PagePath.Standings}
          render={(props) => <Standings problems={problems} standing={this.state.standing} /> } />
      </Switch>
    </div>
  }
} 