import { Typography } from 'material-ui';
import Button from 'material-ui/Button';
import { CircularProgress } from 'material-ui/Progress';
import { StyleRules } from 'material-ui/styles';
import withStyles from 'material-ui/styles/withStyles';
import TextField from 'material-ui/TextField';
import * as React from 'react';
import { Fragment } from 'react';
import { AuthStatus, RegisterUserinfo } from '../typings';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';


interface IRegisterProps {
  onBack: () => void;
  onRegister: (userData: RegisterUserinfo) => void;
  authStatus: AuthStatus;
  errors?: string[];
  classes?: any;
}

interface IRegisterState extends RegisterUserinfo {

}

class Register extends React.Component<IRegisterProps, IRegisterState> {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      birthDate: "1997-01-01",
      email: '',
      firstname: '',
      lastname: '',
      middlename: '',
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleRegister = () => {
    this.props.onRegister({
      ...this.state,
    })
  }

  render() {
    const { password, username, email, birthDate, firstname, middlename, lastname } = this.state;
    const { authStatus, errors } = this.props;
    const loading = authStatus === AuthStatus.Pending;
    return <Dialog
      className={this.props.classes.root}
      disableBackdropClick
      disableEscapeKeyDown
      open
    >
      <DialogTitle>Регистрация</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          fullWidth
          placeholder='Имя пользователя'
          value={username}
          name='username'
          onChange={this.handleChange}
          required
        />
        <TextField
          fullWidth
          placeholder='Пароль'
          value={password}
          name='password'
          type='password'
          onChange={this.handleChange}
          required
        />
        <TextField
          fullWidth
          placeholder='Имя'
          value={firstname}
          name='firstname'
          onChange={this.handleChange}
        />
        <TextField
          fullWidth
          placeholder='Фамилия'
          value={lastname}
          name='lastname'
          onChange={this.handleChange}
        />
        <TextField
          fullWidth
          placeholder='Отчество'
          value={middlename}
          name='middlename'
          onChange={this.handleChange}
        />
        <TextField
          fullWidth
          placeholder='Email'
          value={email}
          onChange={this.handleChange}
          name='email'
        />
        <TextField
          type='date'
          onChange={this.handleChange}
          value={birthDate}
          name='birthDate'
          label='Дата рождения'
        />
        <span>
          {
            errors &&
            errors.map((error, index) => <Typography variant='subheading' color='error' key={index}> {error}</Typography>)
          }
        </span>
      </DialogContent>
      <DialogActions>
        {
          !loading
          &&
          <Fragment>
            <Button variant="raised" onClick={this.handleRegister} color='primary'>
              Зарегистрироваться
            </Button>
            <Button onClick={this.props.onBack}>
              Отмена
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

export default withStyles(styles)<IRegisterProps>(Register as any);