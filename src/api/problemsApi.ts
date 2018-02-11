import axios, { AxiosPromise } from 'axios';
import { ContestInfo, ProblemInfo, Submission, Standings } from '../typings';

class ProblemsApi {
  static GetProblems(external?: boolean) {
    return axios.get(`problems`, {
      params: {
        external,
      }
    }).then(response => response.data);
  }
}

export default ProblemsApi;