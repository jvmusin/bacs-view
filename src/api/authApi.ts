import axios, { AxiosPromise } from 'axios';

const authApi = {
  SignUp(username, password): AxiosPromise<any> {
    return axios.post('/auth/register', { username, password });
  },

  Auth(username, password): AxiosPromise<any> {
    return axios.post('/auth/login', { username, password });
  },

  SetJWT(headerName, headerValue): void {
    axios.defaults.headers[headerName] = headerValue;
  }
}

export default authApi;