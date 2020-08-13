import React, { useState, useEffect } from 'react';
import { useFilePicker, utils } from 'react-sage';
import { makeStyles } from '@material-ui/core/styles';
import {
  CardActionArea,
  CardMedia,
  Typography,
  Button
} from '@material-ui/core';
import { CloudUpload, CancelOutlined, Link, Publish } from '@material-ui/icons/';
import UploadImage from '../../components/UploadImage/UploadImage';

interface PropTypes {
  file?: File | string;
  setFile: (file?: File | string) => void;
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
  text: {
    textAlign: 'center'
  }
});


const PollCreationImage: React.FC<PropTypes> = ({ file, setFile }) => {
  const classes = useStyles();
  const { files, onClick, HiddenFileInput } = useFilePicker();
  const [url, setUrl] = useState<string>();
  const [isMediaHover, setIsMediaHover] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const callback = (result: string) => {
    setUrl(result);
    setFile(result);
  };

  const Upload = (
    <>
      <HiddenFileInput accept=".jpg, .jpeg, .png, .gif" multiple={false} />
      <Button 
        onClick={onClick}
        variant="contained"
        color="primary"
        size="large"
        startIcon={<CloudUpload />}
      > 
        Upload
      </Button>
      <Typography variant="h6"> or </Typography>
      <Button 
        onClick={handleOpenModal}
        variant="outlined"
        color="primary"
        startIcon={<Link />}
      >
        Attach a link
      </Button>
      <UploadImage callback={callback} isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </>
  );

  const Media = (
    <CardMedia
      image={url}
      className={classes.media}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isMediaHover && <CancelOutlined className={classes.clearIcon} />}
    </CardMedia>
  );

  return (
    <div className={classes.root}>
      {file ? (url && Media) : Upload}
    </div>
  );
};

export default PollCreationImage;
