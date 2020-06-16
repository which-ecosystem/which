import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { post } from '../../requests';

interface PropTypes {
  logIn: (name: string, password: string) => Promise<boolean>;
  setAuthorization: (authorization: { authorize: string }) => void ;
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
  },
  formTransfer: {
    display: 'flex',
    justifyContent: 'center'
  },
  transferButton: {
    marginLeft: 10,
    color: 'green'
  },
  formHeader: {
    textAlign: 'center',
    fontSize: 25
  }
}));

const SignUpForm: React.FC<PropTypes> = ({ logIn, setAuthorization }) => {
  const classes = useStyles();
  const inputRef = useRef<HTMLInputElement>();
  const inputRefPassword = useRef<HTMLInputElement>();


  const onClick = () => {
    const name = inputRef.current?.value;
    const password = inputRefPassword.current?.value;
    const newUser = { name: name, password: password, avatarUrl: '' };
    if (name && password) {
      post('/users', newUser).then(() => {
        logIn(name, password);
      });
    }
  };

  const handleSignIn = () => {
    setAuthorization({ authorize: 'signIn' });
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
      <div className={classes.formTransfer}>
        <div>Already have an account?</div>
        <div className={classes.transferButton} onClick={handleSignIn}>Sign In</div>
      </div>
    </>
  );
};

export default SignUpForm;
