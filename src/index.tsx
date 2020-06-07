import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import teal from '@material-ui/core/colors/teal';
import 'typeface-roboto';

import Header from './Header/Header';
import PollCard from './PollCard/PollCard';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: teal[700]
    },
    text: {
      primary: '#000000',
      secondary: 'rgba(255, 255, 255, 0.6)'
    }
  }
});

const App: React.FC = () => {
  const [page, setPage] = useState('feed');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header page={page} setPage={setPage} />
      <PollCard />
    </ThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

