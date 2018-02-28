import axios from 'axios';
import { ArchiveProblem } from '../typings';

class ProblemsApi {
  static GetProblems(_?: boolean): Promise<ArchiveProblem[]> {
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