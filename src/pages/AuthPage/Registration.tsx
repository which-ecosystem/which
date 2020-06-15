import React, {useRef} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {User} from '../../types';
import {get, post} from '../../requests';

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

const Registration: React.FC<PropTypes> = ({logIn}) => {
  const classes = useStyles();
  const inputRef = useRef<HTMLInputElement>();
  const inputRefPassword = useRef<HTMLInputElement>();


  const onClick = () => {
    const name = inputRef.current?.value;
    const password = inputRefPassword.current?.value;
    const newUser = {
      name: name,
      password: password,
      avatarUrl: '',
    };
    if (name && password) {
      post(`/users`,newUser).then(response => {
        logIn(name, password);
      });
    }
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField inputRef={inputRef} id="standard-basic" label="Name"/>
      <TextField id="standard-basic" label="Email"/>
      <TextField inputRef={inputRefPassword}
        id="standard-password-input"
        label="Password"
        type="password"
      />
      <Button variant="contained" onClick={onClick}>submit</Button>
    </form>
  );
};

export default Registration;
