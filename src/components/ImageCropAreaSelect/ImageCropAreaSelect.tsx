import React, { useCallback, useState } from 'react';
import Cropper from 'react-easy-crop';
import { makeStyles } from '@material-ui/core/styles';
import { Slider } from '@material-ui/core';

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
  cropperArea: {
    position: 'relative',
    width: '100%',
    height: 'calc(100vh - 130px)',
    background: '#333',
    [theme.breakpoints.up('sm')]: {
      height: 400
    }
  },
  sliderContainer: {
    padding: 20
  }
}));

const ImageCropAreaSelect: React.FC<PropTypes> = ({ image, setArea }) => {
  const classes = useStyles();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  // eslint-disable-next-line
  const [zoom, setZoom] = useState<any>(1);

  const onCropComplete = useCallback((areaPercentage: Area, areaPixels: Area): void => {
    setArea(areaPixels);
  }, [setArea]);


  return (
    <div>
      <div className={classes.cropperArea}>
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
      <div className={classes.sliderContainer}>
        <Slider
          value={zoom}
          min={1}
          max={3}
          step={0.01}
          aria-labelledby="Zoom"
          onChange={() => setZoom(zoom)}
        />
      </div>
    </div>
  );
};

export default ImageCropAreaSelect;
