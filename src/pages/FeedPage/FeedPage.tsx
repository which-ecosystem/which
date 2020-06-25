import React, { useState, useEffect } from 'react';
import { Poll } from 'which-types';

import Feed from '../../components/Feed/Feed';
import { get } from '../../requests';

interface PropTypes {
  navigate: (prefix: string, id: string) => void;
}

const FeedPage: React.FC<PropTypes> = ({ navigate }) => {
  const [polls, setPolls] = useState<Poll[]>([]);

  useEffect(() => {
    get('/polls').then(response => {
      setPolls(response.data);
    });
  }, []);

  return <Feed polls={polls} navigate={navigate} />;
};

export default FeedPage;

