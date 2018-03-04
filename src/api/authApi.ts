import axios, { AxiosPromise } from 'axios';
import { RegisterUserinfo } from '../typings';

function getErrorsFromResponse(response) {
  const data: string | string[] = response && response.response && response.response.data;
  return Array.isArray(data)
    ? Array.from(new Set(data).values())
    : data
      ? [data]
      : ['Неизвестная ошибка, пожалуйста, попробуйте повторить позже'];
}

const authApi = {

  SignUp(userData: RegisterUserinfo): AxiosPromise<any> {
    return axios.post('/auth/register', { ...userData })
      .catch(response => Promise.reject(getErrorsFromResponse(response)));
  },

  Auth(username, password): AxiosPromise<any> {
    return axios.post('/auth/login', { username, password })
      .catch(response => Promise.reject(getErrorsFromResponse(response)));
  },

  SetJWT(headerName, headerValue): void {
    axios.defaults.headers[headerName] = headerValue;
  }
}

export default authApi;