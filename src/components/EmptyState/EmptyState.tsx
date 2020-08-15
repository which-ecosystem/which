import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Image from '../Image/Image';
import Message from '../Message/Message';
import noContentIcon from '../../assets/noContent.svg';
import constructionIcon from '../../assets/construction.svg';
import serverIcon from '../../assets/server.svg';


interface PropTypes {
  variant?: 'default' | 'construction' | 'waiting';
  message?: string;
  smart?: boolean;
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
  },
  waiting: {
    icon: serverIcon,
    tagline: 'Waiting for server'
  }
};

const EmptyState: React.FC<PropTypes> = ({ variant = 'default', smart = false, message }) => {
  const classes = useStyles();
  const { icon, tagline } = CONTEXT[variant];

  const Component = smart ? Image : 'img';

  return (
    <Message tagline={tagline} message={message}>
      <Component src={icon} className={classes.img} alt="No content" />
    </Message>
  );
};

export default EmptyState;
