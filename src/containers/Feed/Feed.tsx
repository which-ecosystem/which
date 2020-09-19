import React from 'react';
import { Container } from '@material-ui/core/';

import PollsList from '../../components/PollsList/PollsList';
import Fab from '../../components/Fab/Fab';
import Loading from '../../components/Loading/Loading';
import EmptyState from '../../components/EmptyState/EmptyState';
import { useAuth } from '../../hooks/useAuth';
import { useFeed } from '../../hooks/APIClient';

const Feed: React.FC = () => {
  const { data: polls, isValidating, mutate } = useFeed();
  const { isAuthenticated } = useAuth();

  return (
    <Container maxWidth="sm" disableGutters>
      {isAuthenticated && <Fab hideOnScroll />}
      {
        polls
          ? polls.length
            ? <PollsList polls={polls} mutate={mutate} />
            : <EmptyState />
          : isValidating && <Loading />
      }
    </Container>
  );
};

export default Feed;

