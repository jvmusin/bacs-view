import * as React from 'react';

import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import Paper from 'material-ui/Paper';
import { StyleRules, withStyles } from 'material-ui/styles';

import Header from './header';
import Auth from '../auth/auth';
import Theme from './theme';

import ContestList from '../main/contestList';
import ContestController from '../contest/contestController';
import ContestBuilder from '../admin/contestBuilder';

type classes = {
  main: string,
  contestListWrapper: string,
};

const styles: StyleRules = {
  main: {
    margin: 'auto',
    maxWidth: '1500px',
  },

  contestListWrapper: {
    padding: '15px 20px',
    backgroundColor: '#A0BDCB',
  },
};

interface IAppProps {
  classes?: classes;
}

const App = (props: IAppProps) => (
  <Theme>
    <Auth>
      <div className={props.classes.main}>
        <Router>
          <>
            <Header />
            <Paper className={props.classes.contestListWrapper}>
              <Route path='/' exact component={ContestList} />
              <Route path='/admin/:contestId?' component={ContestBuilder} />
              <Route path='/contest/:contestId/' component={ContestController} />
            </Paper>
          </>
        </Router>
      </div>
    </Auth>
  </Theme>
);

export default withStyles(styles)<IAppProps>(App);
