import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { User } from '../../../types';
import { get } from '../../../requests';

interface PropTypes {
  setUser: (newUser: User) => void;
}

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch'
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center'
  }
}));

const SignInForm: React.FC<PropTypes> = ({ setUser }) => {
  const classes = useStyles();
  const inputRef = useRef<HTMLInputElement>();

  const onClick = () => {
    const username = inputRef.current?.value;
    if (username) {
      get(`/users?name=${username}`).then(response => {
        const user = response.data[0];
        setUser(user);
        localStorage.setItem('userId', user._id);
      });
    }
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <h1>Sign In</h1>
      <TextField inputRef={inputRef} id="standard-basic" label="Login" />
      <TextField
        id="standard-password-input"
        label="Password"
        type="password"
      />
      <Button variant="contained" onClick={onClick}>submit</Button>
    </form>
  );
};

export default SignInForm;
