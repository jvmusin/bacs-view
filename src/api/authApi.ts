import axios, { AxiosPromise } from 'axios';

const clearAxios = axios.create();

class AuthApi {
  static SignUp(username, password): AxiosPromise<any> {
    return axios.post('/auth', { username, password });
  }

  static Auth(username, password): AxiosPromise<any> {
    return axios.post('/auth/login', { username, password });
  }

  static SetJWT(headerName, headerValue): void {
    axios.defaults.headers[headerName] = headerValue;
  }
}

export default AuthApi;