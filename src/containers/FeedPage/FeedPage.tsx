import React from 'react';
import { Poll } from 'which-types';
import { Container } from '@material-ui/core/';

import PollsList from '../../components/PollsList/PollsList';
import PollSubmission from './PollSubmission';
import { useAuth } from '../../hooks/useAuth';
import { useFeed } from '../../hooks/APIClient';

const FeedPage: React.FC = () => {
  const { data: polls, mutate } = useFeed();
  const { isAuthenticated } = useAuth();

  const addPoll = (poll: Poll): void => {
    mutate([poll, ...polls], true);
  };

  return (
    <Container maxWidth="sm" disableGutters>
      {isAuthenticated && <PollSubmission addPoll={addPoll} />}
      <PollsList polls={polls} mutate={mutate} />
    </Container>
  );
};

export default FeedPage;

