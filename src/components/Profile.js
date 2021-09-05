
import Login from './Login';
import { useAuthContext } from '../context/authContext'
import UserInfo from './UserInfo';
import Container from './Container';
function Profile (props) {

    const { currentUser } = useAuthContext();

    return (
      <div>
        <Container>
          {currentUser ? <UserInfo user={currentUser} /> : <Login />}
        </Container>
      </div>
    )
} 

export default Profile;