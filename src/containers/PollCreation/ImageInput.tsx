import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  CardActionArea,
  CardMedia,
  Typography,
  CircularProgress
} from '@material-ui/core';
import { Check, CancelOutlined } from '@material-ui/icons';

import AttachLink from '../../components/AttachLink/AttachLink';
import FileUpload from '../../components/FileUpload/FileUpload';

interface PropTypes {
  callback: (file?: File | string) => void;
  progress?: number;
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    width: '50%'
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
  darkOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    color: 'white',
    position: 'absolute',
    top: 0,
    left: 0,
    transitionDuration: '0.5s'
  },
  invisible: {
    backgroundColor: 'rgba(0, 0, 0, 0)'
  },
  icon: {
    color: 'white'
  }
});


const ImageInput: React.FC<PropTypes> = ({ callback, progress }) => {
  const classes = useStyles();
  const [url, setUrl] = useState<string>();

  const handleClear = (): void => {
    setUrl(undefined);
    callback(undefined);
  };

  const childrenCallback = (fileUrl: string, file?: File) => {
    setUrl(fileUrl);
    callback(file || fileUrl);
  };

  const Upload = (
    <div className={classes.root}>
      <FileUpload callback={childrenCallback} />
      <Typography variant="h6"> or </Typography>
      <AttachLink callback={childrenCallback} />
    </div>
  );

  const Media = (
    <CardActionArea onClick={handleClear} className={classes.root} disabled={Boolean(progress)}>
      <CardMedia image={url} className={classes.media}>
        <div className={`${classes.media} ${classes.darkOverlay} ${progress === 100 && classes.invisible}`}>
          {
            progress
              ? progress < 100
                ? <CircularProgress variant="static" value={progress} className={classes.icon} />
                : <Check className={classes.icon} fontSize="large" />
              : <CancelOutlined className={classes.icon} fontSize="large" />
          }
        </div>
      </CardMedia>
    </CardActionArea>
  );

  return url ? Media : Upload;
};

export default ImageInput;
