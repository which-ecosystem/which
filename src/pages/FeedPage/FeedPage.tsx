import React, { useState, useEffect } from 'react';
import { Poll } from 'which-types';
import { Container } from '@material-ui/core/';

import Feed from '../../components/Feed/Feed';
import { get } from '../../requests';
import PollSubmission from './PollSubmission';
import { useAuth } from '../../hooks/useAuth';

const FeedPage: React.FC = () => {
  const [polls, setPolls] = useState<Poll[]>([]);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    get('/feed').then(response => {
      setPolls(response.data);
    });
  }, []);

  const addPoll = (poll: Poll): void => {
    polls.unshift(poll);
    setPolls([]);
    setPolls(polls);
  };

  return (
    <Container maxWidth="sm" disableGutters>
      {isAuthenticated() && <PollSubmission addPoll={addPoll} />}
      <Feed polls={polls} />
    </Container>
  );
};

export default FeedPage;

