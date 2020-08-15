import React, {
  useEffect,
  useState,
  useCallback,
  useMemo
} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { get } from '../../requests';
import Loading from '../../components/Loading/Loading';
import Image from '../../components/Image/Image';
import Message from '../../components/Message/Message';
import coffeIcon from '../../assets/coffeeBreak.svg';

const DYNO_WAKEUP_TIME = 30;

const messages = [
  '',
  'It looks like our server is sleeping.',
  `We need about ${DYNO_WAKEUP_TIME} seconds to wake it up.`,
  'Please, stay with us.',
  'We love you <3',
  'Almost done.'
];

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center'
  },
  hidden: {
    visibility: 'hidden',
    position: 'absolute',
    width: 0,
    height: 0,
    overflow: 'hidden'
  },
  img: {
    width: theme.spacing(24)
  }
}));

// TODO: if Dyno is sleeping, use this time to pre-load pages

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

  return (
    <>
      {!isReady && (
        <>
          <Loading message={message} tagline={message && 'Waiting for the server'} />
          {message && <Message><Image src={coffeIcon} className={classes.img} /></Message>}
        </>
      )}
      <div className={isReady ? '' : classes.hidden}>
        {children}
      </div>
    </>
  );
};


export default DynoWaiter;

