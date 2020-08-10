import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(10),
    left: theme.spacing(10),
    zIndex: 1000,
    cursor: 'pointer',
    opacity: 0.4,
    '&:hover': {
      opacity: 1
    },
    background: theme.palette.primary.main,
    borderRadius: '50%'
  },
  icon: {
    fontSize: 80,
    color: 'white'
  }
}));

const ScrollTopArrow: React.FC = React.memo(() => {
  const [showScroll, setShowScroll] = useState(false);
  const theme = useTheme();
  const classes = useStyles();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0 });
  };

  window.addEventListener('scroll', checkScrollTop);

  return (
    <div className={classes.root}>
      {
        showScroll
        && !isMobile
        && <ArrowUpwardIcon className={classes.icon} color="primary" onClick={scrollTop} />
      }
    </div>
  );
});

export default ScrollTopArrow;
