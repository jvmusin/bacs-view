
export type ContestMeta = {
  id: number;
  name: string;
  startTime: string;
  finishTime: string;
};

export type FullContestInfo = {
  meta: ContestMeta;
  problems: ProblemInfo[]
};

export type ProblemInfo = {
  name: string;
  index: string;
  statementUrl: string;
  timeLimitMillis: number;
  memoryLimitBytes: number
};

export enum AuthState {
  Success,
  Fail,
  None,
};

export enum UserRole {
  Admin = 'ROLE_ADMIN',
  User = 'ROLE_USER',
}

export type SessionInfo = {
  userid: number,
  authorities: UserRole[],
  sub: string,
  exp?: number,
}

export type User = {
  id: number;
  username: string;
};

export type Language =
  'C' |
  'CPP' |
  'Delphi' |
  'FPC' |
  'Python2' |
  'Python3' |
  'Mono'
  ;

export type Submission = {
  id: number;
  contest: ContestMeta;
  problem: ProblemInfo;
  author: User;
  created: string;
  language: Language;
  verdict: string;
  testsPassed: number;
  timeUsedMillis: number;
  memoryUsedBytes: number;
}


