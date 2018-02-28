import axios, { AxiosPromise } from 'axios';

class AuthApi {
  static SignUp(username, password): AxiosPromise<any> {
    return axios.post('/auth/register', { username, password });
  }

  static Auth(username, password): AxiosPromise<any> {
    return axios.post('/auth/login', { username, password });
  }

  static SetJWT(headerName, headerValue): void {
    axios.defaults.headers[headerName] = headerValue;
  }
}

export default AuthApi;