import React, { useState } from 'react';
import { FaArrowCircleUp } from 'react-icons/fa';
import { makeStyles } from '@material-ui/core';
import teal from '@material-ui/core/colors/teal';

const useStyles = makeStyles(() => ({
  scrollTop: {
    position: 'fixed',
    width: 50,
    bottom: 50,
    left: 50,
    zIndex: 1000,
    cursor: 'pointer',
    opacity: 0.5,
    '&:hover': {
      opacity: '1'
    }
  }
}));

const ScrollTopArrow:React.FC = () => {
  const [showScroll, setShowScroll] = useState(false);
  const classes = useStyles();

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
    <FaArrowCircleUp
      className={classes.scrollTop}
      onClick={scrollTop}
      style={{ height: 50, display: showScroll ? 'block' : 'none', color: teal[700] }}
    />
  );
};

export default ScrollTopArrow;
