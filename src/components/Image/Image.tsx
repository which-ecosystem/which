import React, { useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import ErrorIcon from '@material-ui/icons/BrokenImage';

interface PropTypes {
  src?: string;
  alt?: string;
  className?: string;
}

const useStyles = makeStyles(theme => ({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

type Status = 'success' |'loading' | 'error';

const Image: React.FC<PropTypes> = ({ src, alt, className }) => {
  const classes = useStyles();
  const [status, setStatus] = useState<Status>('loading');

  const handleLoad = useCallback((): void => {
    setStatus('success');
  }, [setStatus]);

  const handleError = useCallback((): void => {
    setStatus('error');
  }, [setStatus]);

  const image = (
    <img
      src={src}
      alt={alt}
      className={className}
      style={{ display: status === 'success' ? 'inline' : 'none' }}
      onLoad={handleLoad}
      onError={handleError}
    />
  );

  return (
    <>
      {src && image}
      {
        status !== 'success' && (
          <div className={classes.container}>
            {
              (status === 'error' || !src)
              ? <ErrorIcon fontSize="large" />
              : <CircularProgress color="primary" />
            }
          </div>
      )}
    </>
  );
};

export default Image;

