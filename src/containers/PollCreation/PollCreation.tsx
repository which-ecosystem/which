import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Card,
  Divider,
  Container
} from '@material-ui/core';
import { useSnackbar } from 'notistack';

import PollCreationImage from './PollCreationImage';
import UserStrip from '../../components/UserStrip/UserStrip';
import { post } from '../../requests';
import { useAuth } from '../../hooks/useAuth';
import { useFeed } from '../../hooks/APIClient';
import useS3Preupload from '../../hooks/useS3Preupload';


const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(4)
  },
  images: {
    height: theme.spacing(50),
    display: 'flex'
  }
}));


const PollCreation: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();
  const { mutate: updateFeed } = useFeed();
  const {
    setValue: setLeft,
    progress: progressLeft,
    resolve: resolveLeft,
    isReady: isLeftReady
  } = useS3Preupload();
  const {
    setValue: setRight,
    progress: progressRight,
    resolve: resolveRight,
    isReady: isRightReady
  } = useS3Preupload();

  const handleClick = async () => {
    if (isLeftReady && isRightReady) {
      const [leftUrl, rightUrl] = await Promise.all([resolveLeft(), resolveRight()]);

      const contents = {
        left: { url: leftUrl },
        right: { url: rightUrl }
      };

      post('/polls/', { contents }).then(() => {
        updateFeed();
        enqueueSnackbar('Your poll has been successfully created!', {
          variant: 'success'
        });
      });

      history.push('/feed');
    }
  };

  return (
    <Container maxWidth="sm" disableGutters>
      <Card className={classes.root}>
        {user && <UserStrip user={user} info="" />}
        <Divider />
        <div className={classes.images}>
          <PollCreationImage callback={setLeft} />
          <PollCreationImage callback={setRight} />
        </div>
        <Button
          color="primary"
          disabled={!(isLeftReady && isRightReady)}
          variant="contained"
          onClick={handleClick}
          fullWidth
        >
          Submit
        </Button>
      </Card>
    </Container>
  );
};

export default PollCreation;
