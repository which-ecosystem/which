import React, {useCallback, useContext, useState} from 'react';
import Cropper from 'react-easy-crop';
import {makeStyles} from '@material-ui/core/styles';
import SendIcon from "@material-ui/icons/Send";
import ModalScreen from "../ModalScreen/ModalScreen";
import { getCroppedImg } from './canvasUtils'

interface PropTypes {
  location?: any;
  avatarToCrop: string;
  callback: (file: File) => void;
}

const useStyles = makeStyles(theme => ({
  cropContainer: {
    position: 'relative',
    width: '100%',
    height: '100vh',
    background: '#333',
    [theme.breakpoints.up('sm')]: {
      height: 400,
    },
  }
}));

const AvatarCrop: React.FC<PropTypes> = ({location, avatarToCrop, callback}) => {
  const classes = useStyles();
  const [crop, setCrop] = useState({x: 0, y: 0});
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, []);

  const handleLoadCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(avatarToCrop, croppedAreaPixels);
      callback(croppedImage);
    } catch (e) {
      console.error(e)
    }
  }, [avatarToCrop, croppedAreaPixels]);

  return (
    <ModalScreen
      title="Choose area"
      actionIcon={<SendIcon />}
      handleAction={handleLoadCroppedImage}
      isActionDisabled={false}
    >
      <div className={classes.cropContainer}>
        <Cropper
          image={avatarToCrop}
          crop={crop}
          zoom={zoom}
          aspect={1}
          cropShape="round"
          showGrid={false}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
    </ModalScreen>
  )
};

export default AvatarCrop;
