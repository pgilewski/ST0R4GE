/* eslint-disable react-hooks/exhaustive-deps */
import {  useEffect } from 'react'
import { Auth, Hub } from 'aws-amplify';
import { useAuthContext } from '../context/authContext'
import { useHistory } from 'react-router-dom';



const useAuth = () => {

/*   const initialState = {
    user: {},
    isSignedIn: false,
    error: null
  }

  const [state, setState] = useState(initialState) */


  const { setCurrentUser } = useAuthContext();


  useEffect(() => {
    setAuthListener();
  }, []);

  // bug fix: po niektórych logowaniach nie udpatuje się użytkownik
  async function setAuthListener() {
    Hub.listen('auth', (data) => {
      switch (data.payload.event) {
        case 'signIn':
            checkUser();
            break;
        case 'signOut':
            checkUser();
            console.log("wylogowane")
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
        /* setState({ user, isSignedIn: true }) */
        setCurrentUser(user.attributes.email)
        localStorage.setItem('user', user.attributes.email)
        /* history.push('/') */
    } catch (err) {
        console.log(err)
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
        console.log("zalogowano")
        if(user) {
          history.push("/profile");
        }
        setCurrentUser(user.attributes.email)
        localStorage.setItem('user', user.attributes.email)
        /* setState({ user: user, isSignedIn: true, error: null }); */

    } catch (err) {
        /* setState({ isSignedIn: false, error: error.message});  */
        console.log(err)
      }
  }

  //to do: save user to localstorage
  const signInSocial =  ({provider}) => {
     Auth.federatedSignIn({ provider }).then((user) => {console.log(user)})
  }
  const signOut = async () => { 
    await Auth.signOut()
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