import React, { useState, useEffect } from 'react';
import { useFilePicker, utils } from 'react-sage';
import { makeStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { CardActionArea, CardMedia, Typography } from '@material-ui/core';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';

interface PropTypes {
  file: File | undefined;
  setFile: (file: File | undefined) => void;
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
  },
  text: {
    textAlign: 'center'
  }
});


const PollSubmissionImage: React.FC<PropTypes> = ({ file, setFile }) => {
  const classes = useStyles();
  const { files, onClick, HiddenFileInput } = useFilePicker();
  const [url, setUrl] = useState<string>();
  const [isMediaHover, setIsMediaHover] = useState(false);

  const handleMouseEnter = (): void => {
    setIsMediaHover(true);
  };

  const handleMouseLeave = (): void => {
    setIsMediaHover(false);
  };

  useEffect(() => {
    if (files?.length) {
      const chosenFile = files[0];
      setFile(chosenFile);
      utils.loadFile(chosenFile).then(result => setUrl(result));
    }
  }, [files, setFile]);


  const handleClick = () => {
    if (file) {
      setFile(undefined);
    } else onClick();
  };


  const Upload = (
    <>
      <CloudUploadIcon fontSize="large" color="primary" />
      <Typography variant="h5" className={classes.text}> Upload an image </Typography>
      <HiddenFileInput accept=".jpg, .jpeg, .png, .gif" multiple={false} />
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
    <>
      <CardActionArea onClick={handleClick} className={classes.root}>
        {file ? (url && Media) : Upload}
      </CardActionArea>
    </>
  );
};

export default PollSubmissionImage;
