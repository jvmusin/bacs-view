import * as React from 'react';
import Paper from 'material-ui/Paper/Paper';
import { Route, match, Redirect, Switch } from 'react-router';
import { History } from 'history';
import ContestMenu from './contestMenu';
import ProblemTable from '../problem/problemTable';
import { ContestMeta, ProblemInfo, FullContestInfo } from '../typings';
import SubmitForm from './submitForm';
import ContestApi from '../api/contestApi';


interface IStandingsProps {
  standings: any;
}

const Standings = (props: IStandingsProps) => {
  return <div>213</div>;
}

export default Standings;