import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Message from '../Message/Message';
import noContentIcon from '../../assets/noContent.svg';
import constructionIcon from '../../assets/construction.svg';


interface PropTypes {
  variant?: 'default' | 'construction';
  message?: string;
}

const useStyles = makeStyles(theme => ({
  img: {
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
    <Message tagline={tagline} message={message}>
      <img src={icon} className={classes.img} alt="No content" />
    </Message>
  );
};

export default EmptyState;
