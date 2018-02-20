import * as React from 'react';
import Table, { TableFooter, TablePagination } from 'material-ui/Table';
import TableRow from 'material-ui/Table/TableRow';
import TableCell from 'material-ui/Table/TableCell';
import TableBody from 'material-ui/Table/TableBody';
import TableHead from 'material-ui/Table/TableHead';
import TextField from 'material-ui/TextField';
import { Submission, ContestProblem, SubmissionResult, Enhance } from '../typings';
import { Verdict } from './verdict';
import Paper from 'material-ui/Paper';
import { formatProblemName } from '../problem/problemTable';

interface ISubmitProps {
  submissions: Submission[];
  enhance?: Enhance<Submission>[];
  withSorting?: boolean;
}

const toMB = (byte) => Math.floor(byte / (1024 * 1024));
const toSeconds = (ms) => Math.floor(ms / 1000);

const buildVerdictRow = (result: SubmissionResult) => {
  const { verdict, testsPassed } = result;
  const isAcc = verdict === Verdict.ACCEPTED;
  const short = Verdict.short(verdict);
  const rus = Verdict.rus(verdict);
  const testsPassedStr = testsPassed || testsPassed === 0
    ? ` тест ${testsPassed}`
    : '';

  return short + testsPassedStr;
}

const Submits = ({ submissions, enhance }: ISubmitProps) => {
  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            {
              enhance &&
              enhance.map(add => <TableCell>{add.title}</TableCell>)
            }
            <TableCell> Имя задачи </TableCell>
            <TableCell> Результат  </TableCell>
            <TableCell> Язык решения </TableCell>
            <TableCell> Потрачено </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            submissions &&
            submissions
              .map((submission, index) => (
                <TableRow key={submission.id}>
                  {
                    enhance &&
                    enhance.map(add => <TableCell>{add.renderCell(submission)}</TableCell>)
                  }
                  <TableCell>{formatProblemName(submission.problem)}</TableCell>
                  <TableCell>
                    {
                      buildVerdictRow(submission.result)
                    }
                  </TableCell>
                  <TableCell>{submission.language}</TableCell>
                  <TableCell>
                    {toMB(submission.result.memoryUsed)} из {toMB(submission.problem.memoryLimitBytes)} MB
                      <br />
                    {submission.result.timeUsed} мс из {toSeconds(submission.problem.timeLimitMillis)} сек.
                  </TableCell>
                </TableRow>
              ))
          }
        </TableBody>
      </Table>
    </Paper>
  );
}

export default Submits;

