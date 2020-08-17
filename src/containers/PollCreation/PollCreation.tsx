import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Button,
  Card,
  Divider,
  Container,
  LinearProgress, Dialog, useMediaQuery, IconButton
} from '@material-ui/core';

import { useSnackbar } from 'notistack';
import CloseIcon from '@material-ui/icons/Close';
import ImageInput from './ImageInput';
import UserStrip from '../../components/UserStrip/UserStrip';
import { post } from '../../requests';
import { useAuth } from '../../hooks/useAuth';
import { useFeed } from '../../hooks/APIClient';
import useS3Preupload from '../../hooks/useS3Preupload';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(4),
    position: 'relative'
  },
  images: {
    height: theme.spacing(50),
    display: 'flex'
  },
  closeButton: {
    fontSize: 48,
    position: 'absolute',
    right: 0,
    margin: '12px 0'
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

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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

  const handleClose = () => {
    history.push('/feed');
  };

  let modalWidth;
  if (!isMobile) {
    modalWidth = { width: 600 };
  }

  return (
    <Dialog fullScreen={isMobile} open={true}>
      <Container maxWidth="sm" disableGutters>
        <Card className={classes.root} style={modalWidth}>
          <IconButton onClick={handleClose} className={classes.closeButton}>
            <CloseIcon />
          </IconButton>
          {user && <UserStrip user={user} info="" />}
          <Divider />
          <div className={classes.images}>
            <ImageInput callback={setLeft} progress={progressLeft} />
            <ImageInput callback={setRight} progress={progressRight} />
          </div>
          {
            progressLeft || progressRight
              ? <LinearProgress color="primary" />
              : (
                <Button
                  color="primary"
                  disabled={!(isLeftReady && isRightReady)}
                  variant="contained"
                  onClick={handleClick}
                  fullWidth
                >
                  Submit
                </Button>
              )
          }
        </Card>
      </Container>
    </Dialog>
  );
};

export default PollCreation;
