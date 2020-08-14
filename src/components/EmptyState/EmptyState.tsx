import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import noContentIcon from '../../assets/noContent.svg';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  img: {
    margin: theme.spacing(2),
    width: theme.spacing(24)
  }

}));

const EmptyState: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img src={noContentIcon} className={classes.img} alt="No content" />
      <Typography variant="h5">
        No content
      </Typography>
    </div>
  );
};

export default EmptyState;
