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
import TagFacesIcon from 'material-ui-icons/TagFaces'

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
    maxWidth: '90%',
  },

  contestListWrapper: {
    padding: '15px 10px',
    backgroundColor: '#A0BDCB',
  },
};


interface IAppProps {
  classes?: classes;
}

const App = (props: IAppProps) => (
  <MuiThemeProvider theme={muiTheme}>
    <div className={props.classes.main}>
      <AppBar position='static' color='primary'>
        <Toolbar>
          <Typography type='title' color='inherit'>
            Добро пожаловать, любитель контестов!
          </Typography>
          &nbsp;
          <TagFacesIcon />
        </Toolbar>
      </AppBar>
      <Paper className={props.classes.contestListWrapper}>
        <ContestList />
      </Paper>
    </div>
  </MuiThemeProvider>
);

export default withStyles(styles)<IAppProps>(App);
