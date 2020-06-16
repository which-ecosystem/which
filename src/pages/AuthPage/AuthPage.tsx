import React, {useState} from 'react';
import {Authorization} from '../../types';
import SignInForm from './SignInForm';
import {makeStyles} from "@material-ui/core";
import SignUpForm from "./SignUpForm";

interface PropTypes {
  logIn: (name: string, password: string) => Promise<boolean>;
}

const useStyles = makeStyles(theme => ({
  authorize: {
    display: 'flex',
    width: 200,
    justifyContent: 'space-around',
    margin: '0 auto'
  }
}));

const AuthPage: React.FC<PropTypes> = ({logIn}) => {
  const classes = useStyles();
  const [authorization, setAuthorization] = useState<Authorization>({authorize: 'signIn'});

  return (
    <>
      {authorization.authorize === 'signIn' && <SignInForm logIn={logIn} setAuthorization={setAuthorization}/>}
      {authorization.authorize === 'signUp' && <SignUpForm logIn={logIn} setAuthorization={setAuthorization} />}
    </>
  );
};

export default AuthPage;

