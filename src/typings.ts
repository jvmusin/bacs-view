
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