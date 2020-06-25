import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { post } from '../../requests';

interface PropTypes {
  logIn: (name: string, password: string) => Promise<boolean>;
}

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(35)
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center'
  },
  formHeader: {
    textAlign: 'center',
    fontSize: 25
  }
}));

const SignUpForm: React.FC<PropTypes> = ({ logIn }) => {
  const classes = useStyles();
  const inputRef = useRef<HTMLInputElement>();
  const inputRefPassword = useRef<HTMLInputElement>();

  const onClick = () => {
    const username = inputRef.current?.value;
    const password = inputRefPassword.current?.value;
    if (username && password) {
      post('/users', { username, password }).then(() => {
        logIn(username, password);
      });
    }
  };

  return (
    <>
      <div className={classes.formHeader}>Sign Up</div>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField inputRef={inputRef} id="standard-basic" label="Name" />
        <TextField id="standard-basic" label="Email" />
        <TextField
          inputRef={inputRefPassword}
          id="standard-password-input"
          label="Password"
          type="password"
        />
        <Button variant="contained" onClick={onClick}>submit</Button>
      </form>
    </>
  );
};

export default SignUpForm;
