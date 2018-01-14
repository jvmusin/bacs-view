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
  contest: ContestMeta;
}

interface IProblemTableState {
  problems: ProblemInfo[];
}

const toMB = (byte) => byte / (1024 * 1024) | 0;

const styles: StyleRules = {
  'textFieldMargin': {
    marginRight: '10px',
  }
};


class ProblemTable extends React.Component<IProblemTableProps, IProblemTableState> {
  constructor(props) {
    super(props);
    this.state = {
      problems: [],
    };
  }

  componentDidMount() {
    ContestApi.GetContestInfo(this.props.contest.id)
      .then(info => this.setState({ problems: info.problems }));
  }

  render() {
    const { problems } = this.state;
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell> index </TableCell>
            <TableCell> name </TableCell>
            <TableCell> statement url </TableCell>
            <TableCell> Tests count </TableCell>
            <TableCell> Time limit (s) </TableCell>
            <TableCell> Memory Limit (MB) </TableCell>
          </TableRow>
        </TableHead>
        <TableBody style={{ cursor: 'pointer' }} >
          {
            problems &&
            problems
              .map((problem, index) => (
                <TableRow>
                  <TableCell>{problem.index}</TableCell>
                  <TableCell>{problem.name}</TableCell>
                  <TableCell>
                    <a href={problem.statementUrl} onClick={(e) => e.stopPropagation()} target='_blank'>
                      {problem.statementUrl ? 'Условие задачи' : ''}
                    </a>
                  </TableCell>
                  <TableCell>{problem.timeLimitMillis}</TableCell>
                  <TableCell>{toMB(problem.memoryLimitBytes)}</TableCell>
                </TableRow>
              ))
          }
        </TableBody>
      </Table>
    );
  }
}

export default ProblemTable;