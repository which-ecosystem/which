import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { get } from '../../requests';
import Loading from '../../components/Loading/Loading';

const DYNO_WAKEUP_TIME = 30;

const messages = [
  '',
  'It looks like our server is sleeping.',
  `We need about ${DYNO_WAKEUP_TIME} seconds to wake it up.`,
  'Please, stay with us.',
  'You are doing good.',
  'Almost done.'
];

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center'
  },
  hidden: {
    visibility: 'hidden',
    position: 'absolute'
  }
}));

const DynoWaiter: React.FC = ({ children }) => {
  const classes = useStyles();
  const [isReady, setIsReady] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);

  const tick = useCallback((): void => setTime(value => value + 1), [setTime]);

  useEffect(() => {
    const interval = setInterval(tick, 1000);
    get('/ping').then(() => {
      setIsReady(true);
      clearInterval(interval);
    });
    return () => clearInterval(interval);
  }, [setIsReady, tick]);

  const message = useMemo(() => {
    const interval = DYNO_WAKEUP_TIME / messages.length;
    const index = Math.floor(time / interval);
    const lastIndex = messages.length - 1;
    return messages[index > lastIndex ? lastIndex : index];
  }, [time]);

  const tagline = useMemo(() => time > 3 ? 'Waiting for the server' : '', [time]);

  return (
    <>
      {!isReady && <Loading tagline={tagline} message={message} />}
      <div className={isReady ? '' : classes.hidden}>
        {children}
      </div>
    </>
  );
};


export default DynoWaiter;

