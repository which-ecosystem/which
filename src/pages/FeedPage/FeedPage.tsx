import React, { useState, useEffect } from 'react';
import { Poll, User } from 'which-types';

import Feed from '../../components/Feed/Feed';
import { get } from '../../requests';
import PollSubmission from './PollSubmission';
import { useAuth } from '../../hooks/useAuth';


interface PropTypes {
  navigate: (prefix: string, id: string) => void;
}

const FeedPage: React.FC<PropTypes> = ({ navigate }) => {
  const [polls, setPolls] = useState<Poll[]>([]);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    get('/feed').then(response => {
      setPolls(response.data);
    });
  }, []);

  const addPoll = (poll: Poll): void => {
    polls.unshift(poll);
    setPolls([...polls]);
  };


  return (
    <>
      {isAuthenticated() && <PollSubmission addPoll={addPoll} />}
      <Feed polls={polls} navigate={navigate} />
    </>
  );
};

export default FeedPage;

