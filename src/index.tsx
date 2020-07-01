import React from 'react';
import ReactDOM from 'react-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import teal from '@material-ui/core/colors/teal';
import 'typeface-roboto';

import { SnackbarProvider } from 'notistack';
import Header from './components/Header/Header';
import ScrollTopArrow from './components/ScrollTopArrow/ScrollTopArrow';
import Page from './pages/Page';
import { AuthProvider } from './hooks/useAuth';
import { NavigationProvider } from './hooks/useNavigate';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: teal[700],
      light: teal[100]
    }
  }
});


const App: React.FC = () => {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}
    >
      <NavigationProvider>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header />
            <Page />
            <ScrollTopArrow />
          </ThemeProvider>
        </AuthProvider>
      </NavigationProvider>
    </SnackbarProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

