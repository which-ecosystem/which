import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Image from './Image';

interface PropTypes {
  src?: string;
  alt?: string;
}

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    overflow: 'hidden'
  },
  image: {
    objectFit: 'cover',
    pointerEvents: 'none',
    width: '100%',
    minHeight: '100%'
  }
});

const BackgroundImage: React.FC<PropTypes> = ({ src, alt }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Image src={src} alt={alt} className={classes.image} />
    </div>
  );
};

export default BackgroundImage;

