import React from 'react';
import { useHistory } from 'react-router-dom';
import { Avatar as AvatarBase } from '@material-ui/core';
import { User } from 'which-types';

interface PropTypes {
  user?: User;
  className?: string;
}

const Avatar: React.FC<PropTypes> = ({ user, className }) => {
  const history = useHistory();

  const handleClick = () => {
    if (user) history.push(`/profile/${user.username}`);
  };

  return (
    <AvatarBase
      src={user?.avatarUrl}
      onClick={handleClick}
      className={className}
      style={{ cursor: 'pointer' }}
    />
  );
};

export default Avatar;
