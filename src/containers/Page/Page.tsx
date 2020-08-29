import React, { Suspense, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import { ErrorBoundary } from 'react-error-boundary';
import { useHistory } from 'react-router-dom';

import Router from './Router';
import DynoWaiter from './DynoWaiter';
import Loading from '../../components/Loading/Loading';
import EmptyState from '../../components/EmptyState/EmptyState';


const useStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(10, 0, 12, 0)
    },
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(15, 5, 8, 5)
    }
  }
}));

const ErrorFallback: React.FC = () => (
  <EmptyState variant="error" message="Try reloading the page." />
);

const Page: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    return history.listen(() => {
      window.scrollTo(0, 0);
    });
  }, [history]);

  return (
    <SnackbarProvider
      preventDuplicate
      maxSnack={isMobile ? 1 : 3}
      anchorOrigin={
        isMobile
          ? { vertical: 'top', horizontal: 'right' }
          : { vertical: 'bottom', horizontal: 'left'}
      }
    >
      <div className={classes.root}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<Loading />}>
            <DynoWaiter>
              <Router />
            </DynoWaiter>
          </Suspense>
        </ErrorBoundary>
      </div>
    </SnackbarProvider>
  );
};


export default Page;

