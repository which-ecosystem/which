import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  CardActionArea,
  Typography,
  CircularProgress
} from '@material-ui/core';
import { Check, CancelOutlined } from '@material-ui/icons';

import AttachLink from '../../components/AttachLink/AttachLink';
import FileUpload from '../../components/FileUpload/FileUpload';
import BackgroundImage from '../../components/Image/BackgroundImage';
import getLocalFileUrl from '../../utils/getLocalFileUrl';

interface PropTypes {
  callback: (file?: File | string) => void;
  progress?: number;
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '50%',
    display: 'flex'
  },
  mediaRoot: {
    display: 'flex'
  },
  uploadRoot: {
    flex: 1,
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(4)
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(8, 1)
    }
  },
  outline: {
    padding: theme.spacing(2),
    flex: 1,
    border: '2px dashed gray',
    borderRadius: theme.spacing(1),
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center'
  },
  clearIcon: {
    opacity: '.5',
    fontSize: 50
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    color: 'white',
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transitionDuration: '0.5s'
  },
  invisible: {
    backgroundColor: 'rgba(0, 0, 0, 0)'
  },
  icon: {
    color: 'white'
  }
}));


const ImageInput: React.FC<PropTypes> = ({ callback, progress }) => {
  const classes = useStyles();
  const [url, setUrl] = useState<string>();

  const handleClear = (): void => {
    setUrl(undefined);
    callback(undefined);
  };

  const childrenCallback = (value: File | string) => {
    if (value instanceof File) {
      getLocalFileUrl(value).then(localUrl => setUrl(localUrl));
    } else setUrl(value);

    callback(value);
  };

  const Upload = (
    <div className={classes.uploadRoot}>
      <div className={classes.outline}>
        <FileUpload callback={childrenCallback} />
        <Typography variant="h6"> or </Typography>
        <AttachLink callback={childrenCallback} />
      </div>
    </div>
  );

  const Media = (
    <CardActionArea onClick={handleClear} className={classes.mediaRoot} disabled={Boolean(progress)}>
      <BackgroundImage src={url} />
      <div className={`${classes.overlay} ${progress === 100 && classes.invisible}`}>
        {
          progress
            ? progress < 100
              ? <CircularProgress variant="static" value={progress} className={classes.icon} />
              : <Check className={classes.icon} fontSize="large" />
            : <CancelOutlined className={classes.icon} fontSize="large" />
        }
      </div>
    </CardActionArea>
  );

  return (
    <div className={classes.root}>
      {url ? Media : Upload}
    </div>
  );
};

export default ImageInput;
