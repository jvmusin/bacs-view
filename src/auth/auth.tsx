import Button from 'material-ui/Button';
import { CircularProgress } from 'material-ui/Progress';
import { StyleRules } from 'material-ui/styles';
import withStyles from 'material-ui/styles/withStyles';
import TextField from 'material-ui/TextField';
import * as React from 'react';
import { Fragment } from 'react';
import AuthService from './authService';
import { AuthState } from '../typings';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';


interface IAuthState {
  login: string;
  password: string;
  authState: AuthState;
  errorMessage: string;
  loading: boolean;
}

class Auth extends React.Component<any, IAuthState> {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
      authState: AuthService.CheckAuth(),
      errorMessage: '',
      loading: false,
    };
  }

  signUp = () => {
    this.setState({ loading: true, errorMessage: '' });
    AuthService.SignUp(this.state.login, this.state.password)
      .catch(error => {
        this.setState({ errorMessage: error.response.data, loading: false, });
        return Promise.reject(AuthState.Fail);
      })
      .then(() => this.tryAuthorize())
      .catch(reason => this.setState({ authState: reason || AuthState.Fail }));
  }

  tryAuthorize = () => {
    if (!this.state.loading)
      this.setState({ loading: true, errorMessage: '' });

    AuthService.Auth(this.state.login, this.state.password)
      .then(authState => this.setState({ authState, loading: false }))
      .catch(() => this.setState({
          errorMessage: 'Не удалось авторизоваться ;(',
          authState: AuthState.Fail,
          loading: false
        }));
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
        {
          !this.state.loading
          &&
          <Fragment>
            <Button onClick={this.signUp} color='primary'>
              Зарегистрироваться
              </Button>
            <Button onClick={this.tryAuthorize} color='primary'>
              Войти
            </Button>
          </Fragment>
          ||
          <CircularProgress className={this.props.classes.progress} size={30}  />
        }

      </DialogActions>
    </Dialog>
  }
}

const styles: StyleRules = {
  root: {
    height: 'inherit !important'
  },
  progress: {
    minWidth: 'initial',
    marginRight: 40,
  }
}

export default withStyles(styles)(Auth as any);