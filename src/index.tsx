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
  }
});

const pollProps = {
  author: {
    name: 'John Doe',
    avatarUrl: ''
  },
  contents: {
    left: {
      // eslint-disable-next-line max-len
      url: 'https://images.pexels.com/photos/556666/pexels-photo-556666.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      votes: 15
    },
    right: {
      // eslint-disable-next-line max-len
      url: 'https://cdn.psychologytoday.com/sites/default/files/field_blog_entry_images/2019-06/pexels-photo-556667.jpeg',
      votes: 17
    }
  }
};


const App: React.FC = () => {
  const [page, setPage] = useState('feed');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <PollCard author={pollProps.author} contents={pollProps.contents} />
    </ThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

