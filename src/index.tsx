import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {
  createMuiTheme,
  ThemeProvider,
  makeStyles
} from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import teal from '@material-ui/core/colors/teal';
import 'typeface-roboto';

import Header from './Header/Header';
import Feed from './Feed/Feed';
import ProfileInfo from './ProfileInfo/ProfileInfo';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: teal[700]
    }
  }
});

const polls = [{
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
}, {
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
}];

const useStyles = makeStyles({
  root: {
    width: theme.spacing(75),
    marginTop: theme.spacing(15),
    margin: '0 auto'
  }
});

const App: React.FC = () => {
  const [page, setPage] = useState('feed');
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header setPage={setPage} />
      <div className={classes.root}>
        {
          page === 'profile' && <ProfileInfo profile={polls[0]} />
        }
        <Feed polls={polls} />
      </div>
    </ThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

