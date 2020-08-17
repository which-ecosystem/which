import React, { useState, useCallback, useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import ErrorIcon from '@material-ui/icons/BrokenImage';
import grey from '@material-ui/core/colors/grey';

interface PropTypes {
  src?: string;
  alt?: string;
  className?: string;
  animationDuration?: number;
  disableLoading?: boolean;
}

type Status = 'success' | 'loading' | 'error';

const useStyles = makeStyles(theme => ({
  image: {
    imageOrientation: 'from-image'
  },
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  success: {
    opacity: '100%',
    filterBrightness: '100%',
    filterSaturate: '100%'
  },
  loading: {
    opacity: 0,
    filterBrightness: 0,
    filterSaturate: '20%',
    position: 'absolute'
  },
  error: {
    display: 'none'
  },
  errorIcon: {
    color: grey[300],
    width: theme.spacing(6),
    height: theme.spacing(6)
  }
}));

const Image: React.FC<PropTypes> = React.memo(({
  src,
  alt,
  className,
  animationDuration = 1000,
  disableLoading = false
}) => {
  const classes = useStyles();
  const [status, setStatus] = useState<Status>('loading');

  const handleLoad = useCallback((): void => {
    setStatus('success');
  }, [setStatus]);

  const handleError = useCallback((): void => {
    setStatus('error');
  }, [setStatus]);

  const transition = useMemo(() => `
    filterBrightness ${animationDuration * 0.75}ms cubic-bezier(0.4, 0.0, 0.2, 1),
    filterSaturate ${animationDuration}ms cubic-bezier(0.4, 0.0, 0.2, 1),
    opacity ${animationDuration / 2}ms cubic-bezier(0.4, 0.0, 0.2, 1)
  `, [animationDuration]);

  const image = (
    <img
      src={src}
      alt={alt}
      className={`${classes.image} ${classes[status]} ${className}`}
      style={{ transition }}
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
                ? <ErrorIcon className={classes.errorIcon} />
                : (!disableLoading && <CircularProgress color="primary" />)
            }
          </div>
        )
      }
    </>
  );
});

export default Image;

