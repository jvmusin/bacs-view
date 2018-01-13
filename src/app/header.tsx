import * as React from 'react';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import TagFacesIcon from 'material-ui-icons/TagFaces';
import AccountCircle from 'material-ui-icons/AccountCircle';
import IconButton from 'material-ui/IconButton';
import AppBar from 'material-ui/AppBar';
import { SessionInfo } from '../typings';
import AuthService from '../auth/authService';

interface IHeaderState {
  sessionInfo: SessionInfo;
}

class Header extends React.Component<any, IHeaderState> {
  constructor(props) {
    super(props);
    this.state = {
      sessionInfo: null
    };
  }

  componentDidMount() {
    const info = AuthService.GetSessionInfo();
    this.setState({
      sessionInfo: info,
    });
  }

  render() {
    return <AppBar position='static' color='primary'>
      <Toolbar >
        <div>
          <IconButton
            color='contrast'>
            <AccountCircle />
          </IconButton>
        </div>
        <Typography type='title' color='inherit'>
          <span>Добро пожаловать, </span>
          {
            this.state.sessionInfo
              ? this.state.sessionInfo.sub
              : 'любитель контестов'
          }
          !
        </Typography>
      </Toolbar>
    </AppBar>
  }
}
export default Header;