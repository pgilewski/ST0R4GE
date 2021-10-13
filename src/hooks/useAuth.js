/* eslint-disable react-hooks/exhaustive-deps */
import {  useEffect } from 'react'
import { Auth, Hub } from 'aws-amplify';
import { useAuthContext } from '../context/authContext'
import { useHistory } from 'react-router-dom';



const useAuth = () => {
    
  const { setCurrentUser } = useAuthContext();

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
        const user = await Auth.currentAuthenticatedUser()
        const creds = await Auth.currentCredentials()
        const profile = {
            username: user.username,
            identityId: creds.identityId,
            email: user.attributes.email,
        }
        setCurrentUser(profile)
        localStorage.setItem('user', profile)
    } catch (err) {
        setCurrentUser(null)
        localStorage.removeItem('user')
    }
  }
  
  // ma zapisywać do localstorage usera za każdym razem gdy wartość się zmieni
/*   useEffect(() => {
      localStorage.setItem('user', currentUser);
  }, [ currentUser ]) */

 
  const history = useHistory();

  const signIn = async (formState) => {

    const {username, password} = formState
    try {
        const user = await Auth.signIn({
          username,   
          password,
        });

        checkUser();

        if(user) {
          history.push("/profile");
        }

    } catch (err) {
        console.error(err)
      }
  }

  const signInSocial = async ({provider}) => {
      await Auth.federatedSignIn({ provider })
  }


  const signOut = async () => {
      setCurrentUser(null)
      localStorage.removeItem('user')
      await Auth.signOut();
  }

  return {
 /*    ...state, */
    signIn,
    signInSocial,
    signOut,
    checkUser
  }
}

export default useAuth;