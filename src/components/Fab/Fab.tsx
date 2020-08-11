import React from 'react';
import { useHistory } from 'react-router-dom'
import {
  Fab as FabBase,
  useMediaQuery,
  Slide,
  useScrollTrigger
} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import PlusIcon from '@material-ui/icons/Add';

interface PropTypes {
  hideOnScroll?: boolean;
}

const useStyles = makeStyles(theme => ({
  root: {
    zIndex: 1200,
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

const Fab: React.FC<PropTypes> = ({ hideOnScroll=false }) => {
  const classes = useStyles();
  const history = useHistory();
  const trigger = useScrollTrigger();

  const handleClick = () => {
    history.push('/new');
  };

  return (
    <Slide appear={false} direction="up" in={(!hideOnScroll) || !trigger}>
      <FabBase 
        onClick={handleClick}
        className={classes.root}
        color="secondary"
      >
        <PlusIcon />
      </FabBase>
    </Slide>
  );
};

export default Fab;

