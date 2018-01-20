import * as React from 'react';
import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';
import { Tab as TabType } from './contestController';

interface IContestMenuProps {
  handleTabChange: (_, value) => void;
  tabs: TabType[];
  currentTab: TabType['pathTo'];
}

const ContestMenu = (props: IContestMenuProps) => {
  const { currentTab, handleTabChange, tabs } = props;
  return (
    <Paper>
      <Tabs
        value={currentTab}
        onChange={handleTabChange}
        indicatorColor='primary'
        textColor='primary'
      >
        {
          tabs.map(linkInfo => <Tab
            key={linkInfo.pathTo}
            label={linkInfo.name}
            value={linkInfo.pathTo}
          />)
        }
      </Tabs>
    </Paper>
  )
}

export default ContestMenu;