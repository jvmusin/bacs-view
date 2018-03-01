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
      login: undefined,
      password: undefined,
      authState: AuthService.CheckAuth(),
      errorMessage: '',
      loading: false,
    };
  }

  signUp = () => {
    AuthService.SignUp(this.state.login, this.state.password)
      .catch(error => {
        this.setState({ errorMessage: error.response.data, loading: false, });
        return Promise.reject(AuthState.Fail);
      })
      .then(() => this.tryAuthorize())
      .catch(reason => this.setState({ authState: reason || AuthState.Fail }));
  }

  tryAuthorize = () => {
    if (this.state.loading)
      return;
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

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  render() {
    const { authState, password, login, errorMessage, loading } = this.state;
    if (authState === AuthState.Success)
      return this.props.children;
    const isFailed = authState === AuthState.Fail;
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
          value={login}
          error={isFailed || login === ''}
          onChange={this.handleInputChange}
          onKeyPress={this.handleInputKeyPressed}
          type='text'
          name='login'
        />
        <TextField
          fullWidth
          placeholder='Пароль'
          value={password}
          error={isFailed || password === ''}
          onChange={this.handleInputChange}
          onKeyPress={this.handleInputKeyPressed}
          name='password'
          type='password'
        />
        <span>
          {
            errorMessage
            &&
            errorMessage
          }
        </span>
      </DialogContent>
      <DialogActions>
        {
          !loading
          &&
          <Fragment>
            <Button disabled={!login || !password} onClick={this.signUp} color='primary'>
              Зарегистрироваться
              </Button>
            <Button onClick={this.tryAuthorize} color='primary'>
              Войти
            </Button>
          </Fragment>
          ||
          <CircularProgress className={this.props.classes.progress} size={30} />
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