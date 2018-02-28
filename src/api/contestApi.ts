import axios from 'axios';
import {
  ContestInfo,
  ContestProblem,
  Standings,
  Submission
  } from '../typings';

const defaultHeaders = {
  'Content-Type': 'application/json',
};

axios.defaults.baseURL = 'https://bacs007.herokuapp.com/';
axios.defaults.headers = defaultHeaders;

class ContestApi {
  static GetContests(): Promise<ContestInfo[]> {
    return axios.get('contests')
      .then(response => response.data);
  }

  static GetContestInfo(id: ContestInfo['id']): Promise<ContestInfo> {
    return axios.get(`contests/${id}`)
      .then(response => response.data);
  }

  static SubmitSolution(problemIndex: ContestProblem['index'], solution: string, language: string, contestId: ContestInfo['id']) {
    return axios.post(`/submissions`, {
      language,
      solution,
      problemIndex,
      contestId
    })
  }

  static GetStandings(contestId): Promise<Standings> {
    return axios.get(`contests/${contestId}/standings`)
      .then(response => response.data);
  }

  static GetUserSubmissions(contestId, author): Promise<Submission[]> {
    return axios.get(`submissions/${contestId}`, {
      params: {
        author,
      }
    })
      .then(response => response.data);
  }

  static GetAllSubmissions(contestId): Promise<Submission[]> {
    return axios.get(`contests/${contestId}/submissions/`)
      .then(response => response.data);
  }

  static EditContest(contest: ContestInfo): Promise<any> {
    return axios.put(`contests/${contest.id}`, contest).then(r => r.data);
  }
  static CreateContest(contest: ContestInfo): Promise<any> {
    return axios.post(`contests/`, contest).then(r => r.data);
  }
}

export default ContestApi;