import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { CssBaseline } from '@material-ui/core';
import 'typeface-roboto';

import Header from './Header/Header';

const App: React.FC = () => {
  const [page, setPage] = useState('feed');

  return (
    <>
      <CssBaseline />
      <Header page={page} setPage={setPage} />
      <h1> Hello, world! </h1>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

