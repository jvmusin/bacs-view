import axios, { AxiosPromise } from 'axios';
import { ContestMeta, FullContestInfo, ProblemInfo, Submission, Standings } from '../typings';

const defaultHeaders = {
  'Content-Type': 'application/json',
};

axios.defaults.baseURL = 'https://bacs007.herokuapp.com/';
axios.defaults.headers = defaultHeaders;

class ContestApi {
  static GetContests(): Promise<ContestMeta[]> {
    return axios.get('contests')
      .then(response => response.data);
  }

  static GetContestInfo(id: ContestMeta['id']): Promise<FullContestInfo> {
    return axios.get(`contests/${id}`)
      .then(response => response.data);
  }

  static SubmitSolution(problemIndex: ProblemInfo['index'], solution: string, language: string, contestId: ContestMeta['id']) {
    return axios.post(`contests/${contestId}/problems/${problemIndex}`, {
      language,
      solution,
    })
  }

  static GetStandings(contestId): Promise<Standings> {
    return axios.get(`contests/${contestId}/standings`)
      .then(response => response.data);
  }

  static GetSubmissions(contestId): Promise<Submission[]> {
    return axios.get(`contests/${contestId}/submissions/my`)
      .then(response => response.data);
  }
}

export default ContestApi;