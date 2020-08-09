import React from 'react';
import { Poll } from 'which-types';
import { Container } from '@material-ui/core/';

import Feed from '../../components/Feed/Feed';
import PollSubmission from './PollSubmission';
import { useAuth } from '../../hooks/useAuth';
import { useFeed } from '../../hooks/APIClient';

const FeedPage: React.FC = () => {
  const { data, mutate } = useFeed();
  const { isAuthenticated } = useAuth();

  const addPoll = (poll: Poll): void => {
    mutate([poll, ...data], true);
  };

  return (
    <Container maxWidth="sm" disableGutters>
      {isAuthenticated() && <PollSubmission addPoll={addPoll} />}
      <Feed polls={data} />
    </Container>
  );
};

export default FeedPage;

