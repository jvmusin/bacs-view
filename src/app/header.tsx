import * as React from 'react';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import TagFacesIcon from 'material-ui-icons/TagFaces';
import AccountCircle from 'material-ui-icons/AccountCircle';
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
  isUserPopoverOpen: boolean;
  anchorEl: HTMLElement;
}

type ClassKey = 'iconSize' | 'popeverContent';

const styles: (theme) => StyleRules<ClassKey> = theme => ({
  iconSize: {
    fontSize: '2.5rem',
  },
  popeverContent: {
    margin: theme.spacing.unit,
  },
});

interface IHeaderProps {
  classes: ClassNameMap<ClassKey>;
}

class Header extends React.Component<IHeaderProps, IHeaderState> {
  constructor(props) {
    super(props);
    this.state = {
      sessionInfo: null,
      anchorEl: null,
      isUserPopoverOpen: false,
    };
  }

  componentDidMount() {
    const info = AuthService.GetSessionInfo();
    this.setState({
      sessionInfo: info,
    });
  }

  handleUserIconClick = (event) => {
    this.setState({
      isUserPopoverOpen: true,
      anchorEl: event.target,
    });
  }

  handleClose = () => this.setState({ isUserPopoverOpen: false })

  render() {
    const { classes } = this.props;
    const { anchorEl, isUserPopoverOpen, sessionInfo } = this.state;
    return <AppBar position='static' color='primary'>
      <Toolbar >
        <div>
          <IconButton
            onClick={this.handleUserIconClick}
            color='contrast'>
            <AccountCircle className={classes.iconSize} />
          </IconButton>
          <Popover
            open={isUserPopoverOpen}
            anchorEl={anchorEl}
            onClose={this.handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            {
              sessionInfo &&
              <List>
                <ListSubheader>Ваши роли:</ListSubheader>
                {
                  sessionInfo.authorities.map(role => (
                    <ListItem key={role}>
                      <ListItemText secondary={role} />
                    </ListItem>
                  ))
                }
              </List>
            }
          </Popover>
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


export default withStyles(styles)(Header as any);