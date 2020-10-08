import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import {
  AppBar,
  Dialog,
  Toolbar,
  Typography,
  IconButton,
  Divider,
  useMediaQuery,
  useTheme
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

interface PropTypes {
  title: string;
}

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default
  },
  content: {
    padding: theme.spacing(3, 0, 0, 0)
  },
  toolbar: {
    display: 'flex',
  }
}));

const ModalScreen: React.FC<PropTypes> = ({ title, children }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const history = useHistory();

  const handleClose = useCallback(() => history.goBack(), [history]);

  return (
    <Dialog
      open
      PaperProps={{ className: classes.root }}
      fullScreen={isMobile}
      fullWidth
    >
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <IconButton edge="start" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h6">
            { title }
          </Typography>
        </Toolbar>
      </AppBar>
      <Divider />
      <div className={classes.content}>
        { children }
      </div>
    </Dialog>
  );
};

export default ModalScreen;
