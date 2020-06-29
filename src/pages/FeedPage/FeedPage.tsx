import React, { useState, useEffect } from 'react';
import { Poll, User } from 'which-types';

import Feed from '../../components/Feed/Feed';
import { get } from '../../requests';
import PollSubmission from './PollSubmission';


interface PropTypes {
  navigate: (prefix: string, id: string) => void;
  user: User | undefined;
}

const FeedPage: React.FC<PropTypes> = ({ navigate, user }) => {
  const [polls, setPolls] = useState<Poll[]>([]);

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
      {user && <PollSubmission user={user} addPoll={addPoll} />}
      <Feed polls={polls} navigate={navigate} />
    </>
  );
};

export default FeedPage;

