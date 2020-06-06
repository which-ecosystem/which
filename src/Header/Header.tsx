import React from 'react';
import { 
  AppBar,
  Toolbar,
  Tabs,
  Tab
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

interface PropTypes {
  page: string;
  setPage: (newPage: string) => void;
}

const useStyles = makeStyles(theme => ({
  tab: {
    '& .MuiTab-wrapper': {
        padding: theme.spacing(2),
        flexDirection: 'row',
        fontSize: '0.8125rem'
    }
  }
}));

const tabs = ["Profile", "Feed"];

const Header: React.FC<PropTypes> = ({ page, setPage }) => {
  const classes = useStyles();

  const handleChange = () => {}

  return (
    <AppBar position="static">
      <Toolbar> 
        <Tabs onChange={handleChange} value={page}>
          {tabs.map((tab: string) => (
            <Tab
              label={tab}
              key={tab}
              className={classes.tab}
            />
          ))}
        </Tabs>
      </Toolbar>
    </AppBar>
  )
};

export default Header;

