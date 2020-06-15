import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { User } from '../../types';
import { get } from '../../requests';

interface PropTypes {
  logIn: (name: string, password: string) => void;
  navigate: (prefix: string, id: string) => void;
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

const SignInForm: React.FC<PropTypes> = ({ logIn, navigate }) => {
  const classes = useStyles();
  const nameRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();

  const onClick = () => {
    const name = nameRef.current?.value;
    const password = passwordRef.current?.value;
    if (name && password) logIn(name, password);
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <h1>Sign In</h1>
      <TextField inputRef={nameRef} id="standard-basic" label="Login" />
      <TextField
        inputRef={passwordRef}
        id="standard-password-input"
        label="Password"
        type="password"
      />
      <Button variant="contained" onClick={onClick}>submit</Button>
    </form>
  );
};

export default SignInForm;
