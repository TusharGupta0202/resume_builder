import { useContext } from 'react'
import { UserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';


const ProfileInfoCard = () => {

    const {user,clearUser} = useContext(UserContext); 
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        clearUser();
        navigate("/");
    }
  return (
    user && (
    <div className='flex items-center'>
        <img src={user.profileImageUrl} alt="Profile pic"  className='mr-3 bg-gray-300 rounded-full w-11 h-11'/>
        <div>
            <div className='text-[15px] font-bold leading-3'>{user.name || ""}</div>
            <button 
                 className='text-sm font-semibold text-purple-500 cursor-pointer hover:underline'
                onClick={handleLogout}
            >
                Logout
            </button>        
        </div>
    </div>
    )
  )
}

export default ProfileInfoCard