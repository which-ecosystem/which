import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';


interface PropTypes {
  tagline?: string;
  message?: string;
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(6)
  },
  content: {
    margin: theme.spacing(2)
  }
}));

const Message: React.FC<PropTypes> = React.memo(({ tagline, message, children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        {children}
      </div>
      <Typography variant="h5">
        {tagline}
      </Typography>
      <Typography color="textSecondary">
        {message}
      </Typography>
    </div>
  );
});

export default Message;
