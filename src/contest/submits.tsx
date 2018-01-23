import * as React from 'react';
import Table, { TableFooter, TablePagination } from 'material-ui/Table';
import TableRow from 'material-ui/Table/TableRow';
import TableCell from 'material-ui/Table/TableCell';
import TableBody from 'material-ui/Table/TableBody';
import TableHead from 'material-ui/Table/TableHead';
import TextField from 'material-ui/TextField';
import { Submission } from '../typings';
import Paper from 'material-ui/Paper';

interface ISubmitProps {
  submissions: Submission[];
}


const toMB = (byte) => Math.floor(byte / (1024 * 1024));
const toSeconds = (ms) => Math.floor(ms / 1000);

const Submits = ({ submissions }: ISubmitProps) => {
  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell> Имя задачи </TableCell>
            <TableCell> Результат  </TableCell>
            <TableCell> Язык решения </TableCell>
            <TableCell> Кол-во прошедших тестов </TableCell>
            <TableCell> Потрачено </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            submissions &&
            submissions
              .map((submission, index) => (
                <TableRow key={submission.id}>
                  <TableCell>{submission.problem.name}</TableCell>
                  <TableCell>{submission.verdict}</TableCell>
                  <TableCell>{submission.language}</TableCell>
                  <TableCell>{submission.testsPassed}</TableCell>
                  <TableCell>
                    {toMB(submission.memoryUsedBytes)} из {toMB(submission.problem.memoryLimitBytes)} MB
                      <br />
                    {toSeconds(submission.timeUsedMillis)} из {toSeconds(submission.problem.timeLimitMillis)} сек.
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

