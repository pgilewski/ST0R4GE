/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext } from 'react';
import { Auth, Hub } from 'aws-amplify';
import { useAuthContext } from '../context/authContext';
import NotyfContext from '../context/NotyfContext';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const { setCurrentUser } = useAuthContext();

  const notyf = useContext(NotyfContext);

  useEffect(() => {
    setAuthListener();
  }, []);

  async function setAuthListener() {
    Hub.listen('auth', (data) => {
      switch (data.payload.event) {
        case 'signIn':
          checkUser();
          break;
        case 'signOut':
          checkUser();
          break;
        default:
          break;
      }
    });
  }

  // sprawdzanie aktualnego uzytkownika
  const checkUser = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const creds = await Auth.currentCredentials();
      const profile = {
        username: user.username,
        identityId: creds.identityId,
        email: user.attributes.email,
      };
      setCurrentUser(profile);
      localStorage.setItem('user', profile);
    } catch (err) {
      setCurrentUser(null);
      localStorage.removeItem('user');
    }
  };

  // ma zapisywać do localstorage usera za każdym razem gdy wartość się zmieni
  /*   useEffect(() => {
      localStorage.setItem('user', currentUser);
  }, [ currentUser ]) */

  const navigate = useNavigate();

  const signIn = async (formState) => {
    const { username, password } = formState;
    if (username === '') {
      notyf.error("Email can't be empty.");
    } else if (password === '') {
      notyf.error("Password can't be empty.");
    } else {
      try {
        const user = await Auth.signIn({
          username,
          password,
        });
        if (user) {
          notyf.success('You sucessfully logged in.');
          navigate('/');
        } else {
          notyf.error(
            `Couldn't log in. Check your username or password.`
          );
        }
      } catch (error) {
        notyf.error(
          `Couldn't log in. Check your username or password.`
        );
      }
    }
  };

  const signInSocial = async ({ provider }) => {
    const user = await Auth.federatedSignIn({ provider });
    if (user) {
      notyf.success('You sucessfully logged in.');
    }
  };

  const signOut = async () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
    await Auth.signOut();
    navigate('/');
    notyf.success('You logged out.');
  };

  return {
    /*    ...state, */
    signIn,
    signInSocial,
    signOut,
    checkUser,
  };
};

export default useAuth;
