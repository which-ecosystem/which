import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { CardActionArea, CardMedia } from '@material-ui/core';
import UploadImage from '../../components/UploadImage/UploadImage';
import { Contents } from './types';

interface PropTypes {
  setContents: (a: Contents) => void;
  which: 'left' | 'right';
}

const useStyles = makeStyles(theme => ({
  images: {
    height: theme.spacing(50),
    width: 300,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer'
  }
}));

const PollSubmissionImage: React.FC<PropTypes> = ({ setContents, which }) => {
  const classes = useStyles();
  const [display, setDisplay] = useState(false);
  const [image, setImage] = useState('');

  const handleClick = () => {
    setDisplay(!display);
  };

  const patchUrl = (url: string) => {
    setImage(url);
    let nextImage;
    which === 'left' ? nextImage = 'right' : nextImage = 'left';
    setContents({
      [which]: {
        url
      },
      [nextImage]: {
        url
      }
    });
  };


  return (
    <>
      <CardActionArea onClick={handleClick}>
        <CardMedia className={classes.images} image={image}>
          <CloudUploadIcon />
        </CardMedia>
      </CardActionArea>
      <UploadImage displayD={display} setDisplayD={setDisplay} callback={patchUrl} />
    </>
  );
};

export default PollSubmissionImage;
