import amber from 'material-ui/colors/amber';
import blueGrey from 'material-ui/colors/blueGrey';
import grey from 'material-ui/colors/grey';
import red from 'material-ui/colors/red';
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import * as React from 'react';


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