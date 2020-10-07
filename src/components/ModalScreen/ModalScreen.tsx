import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Dialog,
  Toolbar,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

interface PropTypes {
  title: string;
}

const ModalScreen: React.FC<PropTypes> = ({ title, children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const history = useHistory();

  const handleClose = useCallback(() => history.goBack(), [history]);

  return (
    <Dialog fullScreen={isMobile} fullWidth open>
      <Toolbar color="primary">
        <IconButton edge="start" onClick={handleClose}>
          <CloseIcon />
        </IconButton>
        <Typography variant="h6">
          { title }
        </Typography>
      </Toolbar>
      { children }
    </Dialog>
  );
};

export default ModalScreen;
