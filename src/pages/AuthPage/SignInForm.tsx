import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

interface PropTypes {
  logIn: (name: string, password: string) => Promise<boolean>;
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

const SignInForm: React.FC<PropTypes> = ({ logIn }) => {
  const [error, setError] = useState<boolean>(false);
  const classes = useStyles();
  const nameRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();

  const onClick = async () => {
    const name = nameRef.current?.value;
    const password = passwordRef.current?.value;
    if (name && password) {
      logIn(name, password).then(success => {
        if (!success) setError(true);
      });
    }
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <h1>Sign In</h1>
      <TextField
        inputRef={nameRef}
        error={error}
        label="Login"
      />
      <TextField
        inputRef={passwordRef}
        error={error}
        helperText={error && 'Invalid credentials'}
        label="Password"
        type="password"
      />
      <Button variant="contained" onClick={onClick}>submit</Button>
    </form>
  );
};

export default SignInForm;
