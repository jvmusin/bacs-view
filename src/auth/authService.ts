import axios, { AxiosResponse } from 'axios';

type credentials = {
  username: string;
  password: string;
};

const defaultCredentials = {
	'username': 'Marat',
	'password': 'test'
};

export default class AuthService {
  static Auth(credentials: credentials = defaultCredentials) {
    return axios.post('login', credentials)
      .then(response => {
        axios.defaults.headers.Authorization = response.headers.authorization;
      });
  }
};