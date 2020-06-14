import React, { useState, useEffect } from 'react';
import { Poll } from '../../types';
import Feed from '../../components/Feed/Feed';
import { get } from '../../requests';

const FeedPage: React.FC = () => {
  const [polls, setPolls] = useState<Poll[]>([]);

  useEffect(() => {
    get('/polls').then(response => {
      setPolls(response.data);
    });
  }, []);

  return <Feed polls={polls} />;
};

export default FeedPage;

