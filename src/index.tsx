import React from 'react';
import ReactDOM from 'react-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter } from 'react-router-dom';
import teal from '@material-ui/core/colors/teal';
import 'typeface-roboto';

import Header from './components/Header/Header';
import Page from './containers/Page/Page';
import { AuthProvider } from './hooks/useAuth';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: teal[700],
      light: teal[100]
    },
    secondary: {
      main: teal[900]
    }
  }
});

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header />
          <Page />
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

