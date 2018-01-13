
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
  name: '';
  indexInContest: number;
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
  Admin =  'ROLE_ADMIN',
  User = 'ROLE_USER',
}

export type SessionInfo = {
  userid: number,
  authorities: UserRole[],
  sub: string,
  exp?: number,
}