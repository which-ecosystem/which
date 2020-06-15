import React, {useState} from 'react';
import { Authorization} from '../../types';
import SignInForm from './SignInForm';
import {makeStyles} from "@material-ui/core";
import Registration from "./Registration";

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
  const[authorization,setAuthorization] = useState<Authorization>({authorize: 'signUp'});

  const handleSignUp = () => {
    setAuthorization({authorize: 'signUp'});
    console.log(authorization.authorize);
  };

  const handleRegistration = () => {
    setAuthorization({authorize: 'registration'});
    console.log(authorization.authorize);
  };

  return (
    <>
      <div className={classes.authorize}>
        <div onClick={handleSignUp}>SignUp</div>
        <div>or</div>
        <div onClick={handleRegistration}>Registrate</div>
      </div>
      { authorization.authorize === 'signUp' && <SignInForm logIn={logIn} /> }
      { authorization.authorize === 'registration' && <Registration logIn={logIn} /> }
      </>
  );
};

export default AuthPage;

