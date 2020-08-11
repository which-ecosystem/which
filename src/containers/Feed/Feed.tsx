import React from 'react';
import { useHistory } from 'react-router-dom'
import { Poll } from 'which-types';
import { Container } from '@material-ui/core/';

import PollsList from '../../components/PollsList/PollsList';
import Fab from '../../components/Fab/Fab';
import { useAuth } from '../../hooks/useAuth';
import { useFeed } from '../../hooks/APIClient';


const Feed: React.FC = () => {
  const classes = useStyles();
  const { data: polls, mutate } = useFeed();
  const { isAuthenticated } = useAuth();

  return (
    <Container maxWidth="sm" disableGutters>
      {isAuthenticated && <Fab hideOnScroll />}
      <PollsList polls={polls} mutate={mutate} />
    </Container>
  );
};

export default Feed;

