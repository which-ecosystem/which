import React from 'react';
import { useHistory } from 'react-router-dom';
import { Avatar as AvatarBase } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { User } from 'which-types';

interface PropTypes {
  user: User;
  className?: string;
}

const Avatar: React.FC<PropTypes> = ({ user, className }) => {
  const history = useHistory();
  const { username, avatarUrl } = user;

  const handleClick = () => {
    history.push(`/profile/${username}`);
  };

  return avatarUrl ? (
    <AvatarBase
      src={avatarUrl}
      alt={username[0].toUpperCase()}
      onClick={handleClick}
      className={className}
      style={{ cursor: 'pointer' }}
    />
  ) : (
    <AccountCircle
      className={className}
      onClick={handleClick}
    />
  );
};

export default Avatar;
