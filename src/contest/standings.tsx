import * as React from 'react';
import Table, { TableFooter, TablePagination } from 'material-ui/Table';
import TableRow from 'material-ui/Table/TableRow';
import TableCell from 'material-ui/Table/TableCell';
import TableBody from 'material-ui/Table/TableBody';
import TableHead from 'material-ui/Table/TableHead';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import { Standings, ProblemInfo } from '../typings';
import { StyleRules } from 'material-ui/styles';
import withStyles from 'material-ui/styles/withStyles';
import { StandardProps } from 'material-ui';


interface IStandingsProps {
  standing: Standings;
  problems: ProblemInfo[];
  classes?: any;
}

const formatMinutes = (mins) => {
  const minutes = mins / 60 | 0;
  const hour = mins % 60;
  return hour ? hour+':' : '' + minutes;
}

const Standings = (props: IStandingsProps) => {
  const { standing, problems, classes } = props;
  const rows = standing && standing.rows || [];
  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell> Место </TableCell>
            <TableCell> Участник </TableCell>
            {
              problems.map(problem => <TableCell key={problem.index}> {problem.index} </TableCell>)
            }
            <TableCell> Решено задач </TableCell>
            <TableCell> Время </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            rows &&
            rows
              .map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.place}</TableCell>
                  <TableCell>{row.author.username}</TableCell>
                  {
                    problems.map(problem => {
                      const result = row.results.find(r => r.problemIndex === problem.index);
                      // tslint:disable-next-line:triple-equals
                      const isNotTouched = !result || (!result.solved && result.failTries == 0);
                      const className = isNotTouched ? '' : result.solved ? classes.success : classes.fail;
                      return <TableCell className={className} key={problem.index}>
                        {
                          result
                          &&
                          <>
                          <div>{result.failTries}</div>
                          <div>{formatMinutes(result.solvedAt)}</div>
                          </>
                        }
                      </TableCell>
                    })
                  }
                  <TableCell>{row.solvedCount}</TableCell>
                  <TableCell>{formatMinutes(row.penalty)}</TableCell>
                </TableRow>
              ))
          }
        </TableBody>
      </Table>
    </Paper>
  );
}

const styles: StyleRules = {
  success: {
    backgroundColor: '#aeffae',
  },
  fail: {
    backgroundColor: '#ffc9c9',
  }
}

export default withStyles(styles)(Standings);