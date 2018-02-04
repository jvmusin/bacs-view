export enum Verdict {
  ACCEPTED = 'ACCEPTED',
  WRONG_ANSWER = 'WRONG_ANSWER',
  PRESENTATION_ERROR = 'PRESENTATION_ERROR',
  QUERIES_LIMIT_EXCEEDED = 'QUERIES_LIMIT_EXCEEDED',
  INCORRECT_REQUEST = 'INCORRECT_REQUEST',
  INSUFFICIENT_DATA = 'INSUFFICIENT_DATA',
  EXCESS_DATA = 'EXCESS_DATA',
  OUTPUT_LIMIT_EXCEEDED = 'OUTPUT_LIMIT_EXCEEDED',
  TERMINATION_REAL_TIME_LIMIT_EXCEEDED = 'TERMINATION_REAL_TIME_LIMIT_EXCEEDED',
  ABNORMAL_EXIT = 'ABNORMAL_EXIT',
  MEMORY_LIMIT_EXCEEDED = 'MEMORY_LIMIT_EXCEEDED',
  TIME_LIMIT_EXCEEDED = 'TIME_LIMIT_EXCEEDED',
  REAL_TIME_LIMIT_EXCEEDED = 'REAL_TIME_LIMIT_EXCEEDED',
  TERMINATED_BY_SYSTEM = 'TERMINATED_BY_SYSTEM',
  CUSTOM_FAILURE = 'CUSTOM_FAILURE',
  FAIL_TEST = 'FAIL_TEST',
  FAILED = 'FAILED',
  SKIPPED = 'SKIPPED',
  COMPILE_ERROR = 'COMPILE_ERROR',
  PENDING = 'PENDING',
  SERVER_ERROR = 'SERVER_ERROR'
}

const map = {
  ACCEPTED: {
    short: 'accepted',
    rus: 'Полное решение',
  },
  WRONG_ANSWER: {
    short: 'WA',
    rus: 'Неверный ответ',
  },
  PRESENTATION_ERROR: {
    short: 'PE',
    rus: '',
  },
  QUERIES_LIMIT_EXCEEDED: {
    short: 'queries_limit_exceeded',
    rus: '',
  },
  INCORRECT_REQUEST: {
    short: 'incorrect_request',
    rus: '',
  },
  INSUFFICIENT_DATA: {
    short: 'insufficient_data',
    rus: '',
  },
  EXCESS_DATA: {
    short: 'excess_data',
    rus: '',
  },
  OUTPUT_LIMIT_EXCEEDED: {
    short: 'output_limit_exceeded',
    rus: '',
  },
  TERMINATION_REAL_TIME_LIMIT_EXCEEDED: {
    short: 'termination_real_time_limit_exceeded',
    rus: '',
  },
  ABNORMAL_EXIT: {
    short: 'abnormal_exit',
    rus: '',
  },
  MEMORY_LIMIT_EXCEEDED: {
    short: 'ML',
    rus: 'Превышено ограничение памяти',
  },
  TIME_LIMIT_EXCEEDED: {
    short: 'TL',
    rus: 'Превышено ограничение времени',
  },
  REAL_TIME_LIMIT_EXCEEDED: {
    short: 'real_time_limit_exceeded',
    rus: '',
  },
  TERMINATED_BY_SYSTEM: {
    short: 'terminated_by_system',
    rus: '',
  },
  CUSTOM_FAILURE: {
    short: 'custom_failure',
    rus: '',
  },
  FAIL_TEST: {
    short: 'fail_test',
    rus: '',
  },
  FAILED: {
    short: 'failed',
    rus: '',
  },
  SKIPPED: {
    short: 'skipped',
    rus: '',
  },
  COMPILE_ERROR: {
    short: 'compile error',
    rus: '',
  },
  PENDING: {
    short: 'pending',
    rus: '',
  },
  SERVER_ERROR: {
    short: 'server error',
    rus: '',
  },
}

export namespace Verdict {
  export function short(v: Verdict) {
    return map[v].short;
  }
  export function rus(v: Verdict) {
    return map[v].rus;
  }
}