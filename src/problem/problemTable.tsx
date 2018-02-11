import * as React from 'react';
import Table, { TableFooter, TablePagination } from 'material-ui/Table';
import TableRow from 'material-ui/Table/TableRow';
import TableCell from 'material-ui/Table/TableCell';
import TableBody from 'material-ui/Table/TableBody';
import TableHead from 'material-ui/Table/TableHead';
import { ProblemInfo, Enhance } from '../typings';
import { StyleRules } from 'material-ui/styles';

interface IProblemTableProps {
  problems: ProblemInfo[];
  enhance?: Enhance<ProblemInfo>[];
}

const toMB = (byte) => byte / (1024 * 1024) | 0;
export const formatProblemName = (problem: ProblemInfo) => (problem.index ? problem.index + '. ' : '') + problem.name;

const inlineStyleByEnhance = (enhance: Enhance<any>) => (
  enhance.width && {
    width: enhance.width,
    padding: 0
  }
);

const ProblemTable = (props: IProblemTableProps) => {
  const { enhance, problems } = props;
  return (
    <Table>
      <TableHead>
        <TableRow>
          {
            enhance &&
            enhance.map(en => (
              <TableCell
                key={en.title}
                style={inlineStyleByEnhance(en)}>
                {en.title}
              </TableCell>
            ))
          }
          <TableCell> Название </TableCell>
          <TableCell> Условие </TableCell>
          <TableCell> Ограничения </TableCell>
        </TableRow>
      </TableHead>
      <TableBody style={{ cursor: 'pointer' }} >
        {
          props.problems &&
          props.problems
            .map((problem, index) => (
              <TableRow key={problem.index}>
                {
                  enhance &&
                  enhance.map(en => <TableCell key={en.title} style={inlineStyleByEnhance(en)}> {en.renderCell(problem)} </TableCell>)
                }
                <TableCell>{formatProblemName(problem)}</TableCell>
                <TableCell>
                  <a href={problem.statementUrl} onClick={(e) => e.stopPropagation()} target='_blank'>
                    {problem.statementUrl ? 'Условие задачи' : ''}
                  </a>
                </TableCell>
                <TableCell>
                  {toMB(problem.memoryLimitBytes)} MB
                    <br />
                  {Math.floor(problem.timeLimitMillis / 1000)} сек.
                  </TableCell>
              </TableRow>
            ))
        }
      </TableBody>
    </Table>
  );
}

export default ProblemTable;