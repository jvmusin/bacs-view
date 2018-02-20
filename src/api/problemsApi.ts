import axios, { AxiosPromise } from 'axios';
import { ContestInfo, ContestProblem, Submission, Standings, ArchiveProblem } from '../typings';

class ProblemsApi {
  static GetProblems(external?: boolean): Promise<ArchiveProblem[]> {
    const externalPostfix = external ? '?external' : '';
    return axios.get('problems?take=100')
      .then(response => response.data);
  }

  static GetArchiveProblem(contestId, problemIndex): Promise<ArchiveProblem> {
    return axios.get('problems', {
      params: {
        contestId,
        problemIndex
      }
    }).then(r => r.data);
  }
}

export default ProblemsApi;