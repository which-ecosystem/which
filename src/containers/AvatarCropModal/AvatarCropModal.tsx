import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';
import { getCroppedImg } from './canvasUtils';

import ImageCropAreaSelect from '../../components/ImageCropAreaSelect/ImageCropAreaSelect';
import ModalScreen from '../../components/ModalScreen/ModalScreen';

interface Area {
  x: number;
  y: number;
  width?: number;
  height?: number;
}

interface PropTypes {
  avatar: string;
  callback: (file: File) => void;
}

const useStyles = makeStyles(theme => ({
  cropContainer: {
    position: 'relative',
    width: '100%',
    // height: '100vh',
    // background: '#333',
    [theme.breakpoints.up('sm')]: {
      // height: 400,
    }
  }
}));

const AvatarCropModal: React.FC<PropTypes> = ({ avatar, callback }) => {
  const classes = useStyles();
  const [area, setArea] = useState<Area>({ x: 0, y: 0 });

  const handleAction = async () => getCroppedImg(avatar, area)
    .then(croppedImage => callback(croppedImage));

  return (
    <ModalScreen
      title="Choose area"
      actionIcon={<SendIcon />}
      handleAction={handleAction}
      isActionDisabled={false}
    >
      <div className={classes.cropContainer}>
        <ImageCropAreaSelect
          image={avatar}
          setArea={setArea}
        />
      </div>
    </ModalScreen>
  );
};

export default AvatarCropModal;
