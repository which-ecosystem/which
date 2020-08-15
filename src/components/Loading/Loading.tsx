import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Message from '../Message/Message';

interface PropTypes {
  tagline?: string;
  message?: string;
}

const Loading: React.FC<PropTypes> = React.memo(({ tagline, message }) => {
  return (
    <Message tagline={tagline} message={message}>
      <CircularProgress color="primary" />
    </Message>
  );
});

export default Loading;

