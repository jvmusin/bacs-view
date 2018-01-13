import * as React from 'react';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import AuthService from './authService';
import { isNullOrUndefined } from 'util';
import { AuthState } from '../typings';
import { StyleRules } from 'material-ui/styles';
import withStyles from 'material-ui/styles/withStyles';


interface IAuthProps {
  classes: any;
}

interface IAuthState {
  login: string;
  password: string;
  authState: AuthState;
  errorMessage: string;
}

class Auth extends React.Component<any, IAuthState> {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
      authState: AuthService.CheckAuth(),
      errorMessage: '',
    };
  }

  signUp = () => {
    AuthService.SignUp(this.state.login, this.state.password)
      .catch(error => {
        this.setState({ errorMessage: error.response.data });
        return Promise.reject(AuthState.Fail);
      })
      .then(() => this.tryAuthorize())
      .catch(reason => this.setState({ authState: reason || AuthState.Fail }));
  }

  tryAuthorize = () => {
    AuthService.Auth(this.state.login, this.state.password)
      .then(authState => this.setState({ authState }));
  }

  handleInputKeyPressed = (event) => {
    if (event.key === 13 || event.key === 'Enter')
      this.tryAuthorize();
  }

  render() {
    if (this.state.authState === AuthState.Success)
      return this.props.children;
    const isFailed = this.state.authState === AuthState.Fail;
    return <Dialog
      className={this.props.classes.root}
      disableBackdropClick
      disableEscapeKeyDown
      open={true}
    >
      <DialogTitle>Вход</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          fullWidth
          placeholder='Логин'
          value={this.state.login}
          error={isFailed}
          onChange={event => this.setState({ login: event.target.value })}
          onKeyPress={this.handleInputKeyPressed}
          type='text'
        />
        <TextField
          fullWidth
          placeholder='Пароль'
          value={this.state.password}
          error={isFailed}
          onChange={event => this.setState({ password: event.target.value })}
          onKeyPress={this.handleInputKeyPressed}
          type='password'
        />
        <span>
          {
            this.state.errorMessage 
            &&
            this.state.errorMessage
          }
        </span>
      </DialogContent>
      <DialogActions>
        <Button onClick={this.signUp} color='primary'>
          Зарегистрироваться
        </Button>
        <Button onClick={this.tryAuthorize} color='primary'>
          Войти
        </Button>
      </DialogActions>
    </Dialog>
  }
}

const styles: StyleRules = {
  root: {
    height: 'inherit !important'
  }
}

export default withStyles(styles)(Auth as any);