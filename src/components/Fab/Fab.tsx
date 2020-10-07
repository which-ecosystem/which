import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Fab as FabBase, Slide, useScrollTrigger } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import PlusIcon from '@material-ui/icons/Add';

interface PropTypes {
  hideOnScroll?: boolean;
}

const useStyles = makeStyles(theme => ({
  root: {
    zIndex: 1000,
    position: 'fixed',

    [theme.breakpoints.down('sm')]: {
      right: theme.spacing(2),
      bottom: theme.spacing(8)
    },
    [theme.breakpoints.up('md')]: {
      right: theme.spacing(5),
      bottom: theme.spacing(5)
    }
  }
}));

const Fab: React.FC<PropTypes> = ({ hideOnScroll = false }) => {
  const classes = useStyles();
  const location = useLocation();
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="up" in={(!hideOnScroll) || !trigger}>
      <Link to={{ pathname: '/new', state: { background: location } }}>
        <FabBase
          className={classes.root}
          color="secondary"
        >
          <PlusIcon />
        </FabBase>
      </Link>
    </Slide>
  );
};

export default Fab;

