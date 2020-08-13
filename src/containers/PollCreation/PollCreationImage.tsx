import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  CardActionArea,
  CardMedia,
  Typography,
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/CancelOutlined';

import AttachLink from '../../components/AttachLink/AttachLink';
import FileUpload from '../../components/FileUpload/FileUpload';

interface PropTypes {
  callback: (file?: File | string) => void;
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
  }
});


const PollCreationImage: React.FC<PropTypes> = ({ callback }) => {
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
    <CardActionArea onClick={handleClear} className={classes.root}>
      <CardMedia image={url} className={classes.media}>
        <ClearIcon className={classes.clearIcon} />
      </CardMedia>
    </CardActionArea>
  );

  return url ? Media : Upload;
};

export default PollCreationImage;
