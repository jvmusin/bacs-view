import axios, { AxiosPromise } from 'axios';
import {
  ArchiveProblem,
  ContestInfo,
  ContestProblem,
  Standings,
  Submission
  } from '../typings';

class ProblemsApi {
  static GetProblems(external?: boolean): Promise<ArchiveProblem[]> {
    const externalPostfix = external ? '?external' : '';
    return axios.get('problems')
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