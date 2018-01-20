import * as React from 'react';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import TagFacesIcon from 'material-ui-icons/TagFaces';
import ExitToApp from 'material-ui-icons/ExitToApp';
import IconButton from 'material-ui/IconButton';
import AppBar from 'material-ui/AppBar';
import { SessionInfo } from '../typings';
import AuthService from '../auth/authService';
import { withStyles, StyleRules } from 'material-ui/styles';
import { ClassNameMap } from 'material-ui/styles/withStyles';
import Popover from 'material-ui/Popover';
import List, { ListItem, ListItemText, ListSubheader } from 'material-ui/List';

interface IHeaderState {
  sessionInfo: SessionInfo;
}

type ClassKey = 'iconSize' | 'flex';

const styles: StyleRules<ClassKey> = {
  iconSize: {
    fontSize: '2.4rem',
  },
  flex: {
    flex: 1,
  }
};

interface IHeaderProps {
  classes: ClassNameMap<ClassKey>;
}

class Header extends React.Component<IHeaderProps, IHeaderState> {
  constructor(props) {
    super(props);
    this.state = {
      sessionInfo: null,
    };
  }

  componentDidMount() {
    const info = AuthService.GetSessionInfo();
    this.setState({
      sessionInfo: info,
    });
  }

  logout = (event) => {
    AuthService.Logout();
    window.location.reload(false);
  }

  render() {
    const { classes } = this.props;
    const { sessionInfo } = this.state;
    return <AppBar position='static' color='primary'>
      <Toolbar >
        <Typography className={classes.flex} type='title' color='inherit'>
          <span>Welcome!</span>
        </Typography>

        <Typography type='title' color='inherit'>
          <span>
            {
              sessionInfo &&
              sessionInfo.sub
            }
          </span>
        </Typography>
        <IconButton
          onClick={this.logout}
          color='contrast'>
          <ExitToApp className={classes.iconSize} />
        </IconButton>
      </Toolbar>
    </AppBar>
  }
}


export default withStyles(styles)(Header as any);