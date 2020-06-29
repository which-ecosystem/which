import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { CardActionArea, CardMedia, Typography } from '@material-ui/core';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import _ from 'lodash';

import UploadImage from '../../components/UploadImage/UploadImage';
import { Contents } from './types';

interface PropTypes {
  contents: Contents;
  setContents: (newContents: Contents) => void;
  which: 'left' | 'right';
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


const PollSubmissionImage: React.FC<PropTypes> = ({ setContents, which, contents }) => {
  const classes = useStyles();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image, setImage] = useState('');
  const [clearIconDisplay, setClearIconDisplay] = useState(false);

  const patchUrl = (url: string): void => {
    setImage(url);
    const newContents = _.set(contents, which, { url });
    setContents({ ...newContents });
  };

  const handleClick = (): void => {
    if (image) patchUrl('');
    else setIsModalOpen(!isModalOpen);
  };

  const handleMouseEnter = (): void => {
    setClearIconDisplay(true);
  };

  const handleMouseLeave = (): void => {
    setClearIconDisplay(false);
  };


  const Upload = (
    <>
      <CloudUploadIcon fontSize="large" color="primary" />
      <Typography variant="h5"> Upload an image </Typography>
      <UploadImage isOpen={isModalOpen} setIsOpen={setIsModalOpen} callback={patchUrl} />
    </>
  );

  const Media = (
    <CardMedia
      image={image}
      className={classes.media}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {clearIconDisplay && <CancelOutlinedIcon className={classes.clearIcon} />}
    </CardMedia>
  );

  return (
    <CardActionArea onClick={handleClick} className={classes.root}>
      {image ? Media : Upload}
    </CardActionArea>
  );
};

export default PollSubmissionImage;
