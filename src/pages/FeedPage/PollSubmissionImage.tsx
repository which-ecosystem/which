import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { CardActionArea, CardMedia, Typography } from '@material-ui/core';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';

import UploadImage from '../../components/UploadImage/UploadImage';

interface PropTypes {
  url: string;
  setUrl: (url: string) => void;
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center'
  },
  clearIcon: {
    opacity: '.5',
    fontSize: 50
  },
  media: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});


const PollSubmissionImage: React.FC<PropTypes> = ({ url, setUrl }) => {
  const classes = useStyles();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMediaHover, setIsMediaHover] = useState(false);

  const handleClick = (): void => {
    if (!isModalOpen) {
      if (url) setUrl('');
      else setIsModalOpen(!isModalOpen);
    }
  };

  const handleMouseEnter = (): void => {
    setIsMediaHover(true);
  };

  const handleMouseLeave = (): void => {
    setIsMediaHover(false);
  };


  const Upload = (
    <>
      <CloudUploadIcon fontSize="large" color="primary" />
      <Typography variant="h5"> Upload an image </Typography>
      <UploadImage isOpen={isModalOpen} setIsOpen={setIsModalOpen} callback={setUrl} />
    </>
  );

  const Media = (
    <CardMedia
      image={url}
      className={classes.media}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isMediaHover && <CancelOutlinedIcon className={classes.clearIcon} />}
    </CardMedia>
  );

  return (
    <CardActionArea onClick={handleClick} className={classes.root}>
      {url ? Media : Upload}
    </CardActionArea>
  );
};

export default PollSubmissionImage;
