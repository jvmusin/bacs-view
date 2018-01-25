import * as React from 'react';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import TagFacesIcon from 'material-ui-icons/TagFaces';
import ExitToApp from 'material-ui-icons/ExitToApp';
import Home from 'material-ui-icons/Home';
import IconButton from 'material-ui/IconButton';
import AppBar from 'material-ui/AppBar';
import { SessionInfo } from '../typings';
import AuthService from '../auth/authService';
import { withStyles, StyleRules } from 'material-ui/styles';
import { ClassNameMap } from 'material-ui/styles/withStyles';
import Popover from 'material-ui/Popover';
import List, { ListItem, ListItemText, ListSubheader } from 'material-ui/List';
import { Link } from 'react-router-dom';

interface IHeaderState {
  sessionInfo: SessionInfo;
}

type ClassKey = 'headerIcon' | 'homeGroup' | 'homeLink' | 'homeTitle' | 'homeTitleWrapper';

const styles: StyleRules<ClassKey> = {
  headerIcon: {
    fontSize: '2.4rem',
  },
  homeGroup: {
    flex: 1,
  },
  homeLink: {
    cursor: 'pointer',
  },
  homeTitle: {
    color: 'white',
  },
  homeTitleWrapper: {
    display:'inline-block',
    verticalAlign: 'middle',
  },
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
        <div className={classes.homeGroup}>
          <Link className={classes.homeLink} to='/'>
            <IconButton color='secondary'>
              <Home className={classes.headerIcon} />
            </IconButton>
            <Typography className={classes.homeTitleWrapper} type='title'>
              <span className={classes.homeTitle}>Welcome!</span>
            </Typography>
          </Link>
        </div>

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
          color='secondary'>
          <ExitToApp className={classes.headerIcon} />
        </IconButton>
      </Toolbar>
    </AppBar>
  }
}


export default withStyles(styles)(Header as any);