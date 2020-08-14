import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import noContentIcon from '../../assets/noContent.svg';
import constructionIcon from '../../assets/construction.svg';


interface PropTypes {
  variant?: 'default' | 'construction';
  message?: string;
}

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

const CONTEXT = {
  default: {
    icon: noContentIcon,
    tagline: 'No content'
  },
  construction: {
    icon: constructionIcon,
    tagline: 'Coming soon'
  }
};

const EmptyState: React.FC<PropTypes> = ({ variant = 'default', message }) => {
  const classes = useStyles();

  const { icon, tagline } = CONTEXT[variant];

  return (
    <div className={classes.root}>
      <img src={icon} className={classes.img} alt="No content" />
      <Typography variant="h5">
        {tagline}
      </Typography>
      <Typography color="textSecondary">
        <p>
          {message}
        </p>
      </Typography>
    </div>
  );
};

export default EmptyState;
