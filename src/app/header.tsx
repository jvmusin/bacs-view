import * as React from 'react';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import TagFacesIcon from 'material-ui-icons/TagFaces'
import AppBar from 'material-ui/AppBar';

const Header = () => (
  <AppBar position='static' color='primary'>
    <Toolbar>
      <Typography type='title' color='inherit'>
        Добро пожаловать, любитель контестов!
      </Typography>
      &nbsp;
      <TagFacesIcon />
    </Toolbar>
  </AppBar>
);

export default Header;