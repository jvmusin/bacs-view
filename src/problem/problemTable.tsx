import * as React from 'react';
import Table, { TableFooter, TablePagination } from 'material-ui/Table';
import TableRow from 'material-ui/Table/TableRow';
import TableCell from 'material-ui/Table/TableCell';
import TableBody from 'material-ui/Table/TableBody';
import TableHead from 'material-ui/Table/TableHead';
import TextField from 'material-ui/TextField';
import { ProblemInfo, ContestMeta } from '../typings';

import { withStyles, StyleRules } from 'material-ui/styles';
import ContestApi from '../api/contestApi';

interface IProblemTableProps {
  contestId: ContestMeta['id'];
}

interface IProblemTableState {
  problems: ProblemInfo[];
}

const toMB = (byte) => byte / (1024 * 1024) | 0;

class ProblemTable extends React.Component<IProblemTableProps, IProblemTableState> {
  constructor(props) {
    super(props);
    this.state = {
      problems: [],
    };
  }

  componentDidMount() {
    ContestApi.GetContestInfo(this.props.contestId)
      .then(info => this.setState({ problems: info.problems }));
  }

  render() {
    const { problems } = this.state;
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell> Название </TableCell>
            <TableCell> Условие </TableCell>
            <TableCell> Ограничения </TableCell>
          </TableRow>
        </TableHead>
        <TableBody style={{ cursor: 'pointer' }} >
          {
            problems &&
            problems
              .map((problem, index) => (
                <TableRow key={problem.index}>
                  <TableCell>{problem.index}</TableCell>
                  <TableCell>{problem.name}</TableCell>
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
}

export default ProblemTable;