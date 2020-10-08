import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import {
  AppBar,
  Dialog,
  Toolbar,
  Typography,
  IconButton,
  Divider,
  Slide,
  useMediaQuery,
  useTheme
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { TransitionProps } from '@material-ui/core/transitions';
import CloseIcon from '@material-ui/icons/Close';

interface PropTypes {
  title: string;
  rightIcon?: JSX.Element;
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
    justifyContent: 'space-between'
  }
}));

const Transition = React.forwardRef((
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) => <Slide direction="left" ref={ref} {...props} />);

const ModalScreen: React.FC<PropTypes> = ({ title, rightIcon, children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const history = useHistory();

  const handleClose = useCallback(() => setIsOpen(false), [setIsOpen]);
  const onExited = useCallback(() => history.goBack(), [history]);

  return (
    <Dialog
      open={isOpen}
      onExited={onExited}
      TransitionComponent={Transition}
      PaperProps={{ className: classes.root }}
      fullScreen={isMobile}
      fullWidth
    >
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h6">
            { title }
          </Typography>
          { rightIcon || (
            <IconButton style={{ visibility: 'hidden' }}>
              <CloseIcon />
            </IconButton>
          )}
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
