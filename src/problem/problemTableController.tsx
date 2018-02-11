import * as React from 'react';
import { ProblemInfo, ContestInfo } from '../typings';
import ContestApi from '../api/contestApi';
import ProblemTable from './problemTable';

interface IProblemTableControllerProps {
  contestId: ContestInfo['id'];
}

interface IProblemTableControllerState {
  problems: ProblemInfo[];
}

class ProblemTableController extends React.Component<IProblemTableControllerProps, IProblemTableControllerState> {
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
    return <ProblemTable problems={this.state.problems} />
  }
}

export default ProblemTableController;