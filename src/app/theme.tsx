import * as React from 'react';
import { MuiThemeProvider, createMuiTheme, withStyles, StyleRules } from 'material-ui/styles';

import blueGrey from 'material-ui/colors/blueGrey';
import amber from 'material-ui/colors/amber';
import red from 'material-ui/colors/red';
import grey from 'material-ui/colors/grey';

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


const Theme = (props) => (
  <MuiThemeProvider theme={muiTheme}>
    {
      props.children
      }
  </MuiThemeProvider>
);

export default Theme;