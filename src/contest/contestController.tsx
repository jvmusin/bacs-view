import * as React from 'react';
import Paper from 'material-ui/Paper/Paper';
import { Route, match, Redirect, Switch } from 'react-router';
import { History, Location } from 'history';
import ContestMenu from './contestMenu';
import ProblemTable from '../problem/problemTable';
import { ContestInfo, ProblemInfo, Submission, SessionInfo } from '../typings';
import ContestApi from '../api/contestApi';
import SubmitForm from './submitForm';
import Submits from './submits';
import Standings from './standings';
import AllSubmits from './allSubmits';
import AuthService from '../auth/authService';

interface IContestControllerProps {
  match: match<any>;
  history: History;
  location: Location;
}

interface IContestControllerState {
  contestInfo: ContestInfo;
  currentTab: Tab['pathTo'];
  standing: any;
  userSubmits: Submission[];
  allSubmits: Submission[];
  sessionInfo: SessionInfo;
}

export type Tab = {
  name: string;
  pathTo: string;
  needAdminsRight?: boolean;
}

enum PagePath {
  Problems = 'problems',
  Standings = 'standings',
  Submits = 'submits',
  Submit = 'submit',
  AllSubmits = 'submitsList',
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
  {
    name: 'Список посылок',
    pathTo: PagePath.AllSubmits,
    needAdminsRight: true,
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
      userSubmits: [],
      allSubmits: [],
      sessionInfo: null,
    };

    this.fetchBypageName = (pageName) => {
      pageName = pageName || this.state.currentTab;
      switch (pageName) {
        case PagePath.Submits: return this.fetchUserSubmits();
        case PagePath.AllSubmits: return this.fetchAllSubmits();
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
      ContestApi.GetStandings(this.state.contestInfo.id)
        .then(standing => this.setState({ standing }))
        .catch(console.log);
  }

  fetchUserSubmits() {
    if (this.state.contestInfo)
      ContestApi.GetUserSubmissions(this.state.contestInfo.id, this.state.sessionInfo.sub)
        .then(userSubmits => this.setState({ userSubmits }))
        .catch(console.log);
  }

  fetchAllSubmits() {
    if (this.state.contestInfo)
      ContestApi.GetAllSubmissions(this.state.contestInfo.id)
        .then(allSubmits => this.setState({ allSubmits }))
        .catch(console.log);
  }

  componentDidMount() {
    this.fetchContestInfo()
      .then(() => this.fetchBypageName());
    this.setState({
      sessionInfo: AuthService.GetSessionInfo()
    });
  }

  to = (to) => this.props.match.url + '/' + to;

  render() {
    const { match, history } = this.props;
    const { currentTab, contestInfo, allSubmits, standing, userSubmits, sessionInfo } = this.state;
    const problems = contestInfo && contestInfo.problems || [];
    const current = match.url + '/';
    const isAdmin = AuthService.IsAdmin(sessionInfo);
    const isContestFinished = contestInfo && new Date(contestInfo.finishTime) < new Date();

    return <div>
      <div>
        <ContestMenu
          currentTab={currentTab}
          handleTabChange={this.handleTabChange}
          isAdmin={isAdmin}
          tabs={tabs}
        />
      </div>
      <Switch>
        <Redirect exact from={current} to={this.to(PagePath.Problems)} />
        <Route
          exact
          path={this.to(PagePath.Problems)}
          render={(props) => <Paper>
            <ProblemTable problems={problems} />
          </Paper>} />
        <Route
          exact
          path={this.to(PagePath.Submit)}
          render={(props) => <SubmitForm contestId={contestInfo && contestInfo.id} problems={problems} />} />
        <Route
          exact
          path={this.to(PagePath.Problems)}
          render={(props) => <Submits submissions={userSubmits} />} />
        <Route
          exact
          path={this.to(PagePath.Standings)}
          render={
            (props) => <Standings problems={problems} standing={standing} />
          } />
        {
          (isContestFinished || isAdmin)
          &&
          <Route
            exact
            path={this.to(PagePath.AllSubmits)}
            render={
              (props) => <AllSubmits problems={problems} submissions={allSubmits} />
            } />
        }
      </Switch>
    </div>
  }
} 