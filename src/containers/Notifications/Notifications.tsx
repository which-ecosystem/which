import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import EmptyState from '../../components/EmptyState/EmptyState';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(25)
  }
}));

const Notifications: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <EmptyState variant="construction" message="We are building this page. Stay tuned." />
    </div>
  );
};

export default Notifications;

