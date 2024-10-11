import {useDispatch} from 'react-redux';
import authServiceInstance from '../../appwrite/auth';
import {logout} from "../../store/authSlice"


function LogoutBtn() {
    const dispatch=useDispatch();
    const handleLogout=()=>{
        authServiceInstance.logout()
        .then(()=>{
            dispatch(logout())
        })
        .catch((error)=>{
            console.log("error occured during logout",error)
    }
    )}


return (
<button onClick={handleLogout} className="bg-violet-500 text-white font-bold py-2 px-4 rounded hover:bg-violet-700">
  Logout
</button>
  )
}

export default LogoutBtn;   