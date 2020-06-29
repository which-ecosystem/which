import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { CardActionArea, CardMedia } from '@material-ui/core';
import UploadImage from '../../components/UploadImage/UploadImage';
import { Contents } from './types';
import ClearIcon from '@material-ui/icons/Clear';

interface PropTypes {
  contents: Contents;
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
    cursor: 'pointer',
    boxShadow: 'inset 0 0 10px;'
  },
  clearIcon: {
    opacity: '.4',
    fontSize: 130
  }
}));

const PollSubmissionImage: React.FC<PropTypes> = ({ setContents, which, contents }) => {
  const classes = useStyles();
  const [display, setDisplay] = useState(false);
  const [image, setImage] = useState('');
  const [clearIconDisplay, setClearIconDisplay] = useState(false);

  const handleClick = () => {
    image === ''
      ? setDisplay(!display)
      : patchUrl('');

  };

  const patchUrl = (url: string) => {
    setImage(url);
    contents[which] = {url};
    setContents({...contents});
  };

  const handleMouseEnter = () => {
    setClearIconDisplay(true);
  };

  const handleMouseLeave = () => {
    setClearIconDisplay(false);
  };

  return (
    <>
      <CardActionArea onClick={handleClick} >
        <CardMedia className={classes.images} image={image} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {
            image === ''
              ? <CloudUploadIcon fontSize='large' color='primary' />
              : clearIconDisplay
              ?  <ClearIcon className={classes.clearIcon} color='primary'/>
              : null
          }
        </CardMedia>
      </CardActionArea>
      <UploadImage displayD={display} setDisplayD={setDisplay} callback={patchUrl} />
    </>
  );
};

export default PollSubmissionImage;
