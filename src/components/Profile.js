
import Login from './Login';
import { useAuthContext } from '../context/authContext'
import UserInfo from './UserInfo';

function Profile () {

    const { currentUser } = useAuthContext();

    return (
      <div className="flex-col align-middle">
        {currentUser ? <UserInfo user={currentUser} /> : <Login />}
      </div>
    )
} 

export default Profile;