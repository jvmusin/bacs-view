import * as React from 'react';

import { MuiThemeProvider, createMuiTheme, withStyles, StyleRules } from 'material-ui/styles';

import blueGrey from 'material-ui/colors/blueGrey';
import amber from 'material-ui/colors/amber';
import red from 'material-ui/colors/red';
import grey from 'material-ui/colors/grey';

import ContestList from '../contest/contestList';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import Header from './header';
import Auth from '../auth/auth';

const muiTheme = createMuiTheme({
  typography: {
    fontFamily: 'Segoe UI',
  },
  palette: {
    primary: blueGrey,
    secondary: amber,
    error: red,
    grey: grey,
    text: {
      secondary: '#7B7B7B'
    }
  },
});

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
  <MuiThemeProvider theme={muiTheme}>
    <Auth>
      <div className={props.classes.main}>
        <Header />
        <Paper className={props.classes.contestListWrapper}>
          <ContestList />
        </Paper>
      </div>
    </Auth>
  </MuiThemeProvider>
);

export default withStyles(styles)<IAppProps>(App);
