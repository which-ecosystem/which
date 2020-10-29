import React, { useCallback, useState } from 'react';
import Cropper from 'react-easy-crop';
import { makeStyles } from '@material-ui/core/styles';

interface Area {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface PropTypes {
  image: string;
  setArea: (area: Area) => void;
}

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    width: '100%',
    height: '100vh',
    background: '#333',
    [theme.breakpoints.up('sm')]: {
      height: 400,
    }
  }
}));

const ImageCropAreaSelect: React.FC<PropTypes> = ({ image, setArea }) => {
  const classes = useStyles();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onCropComplete = useCallback((areaPercentage: Area, areaPixels: Area): void => {
    setArea(areaPixels);
  }, [setArea]);

  return (
    <div className={classes.root}>
      <Cropper
        image={image}
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
  )
};

export default ImageCropAreaSelect;
