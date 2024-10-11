import {useState} from 'react'
import {Link, useNavigate } from 'react-router-dom'
import {  Input, Button } from '../index'
import {useDispatch} from 'react-redux'
import {login} from '../../store/authSlice'
import {useForm} from 'react-hook-form'
import authServiceInstance from '../../appwrite/auth'

function Login() {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [error,setError]=useState("");
    const {register,handleSubmit}=useForm();
  let session=null;
  let userData = null;
   const loginHandler=async(userEmailAndPassword)=>{
    console.log("user email and password",userEmailAndPassword);
    
       setError("");
       try{
        // get the session
    await authServiceInstance.login(userEmailAndPassword).then((res)=>{
        session=res;
        console.log("res is ",res);
     })  ;
     console.log("session is started",session);
     
        // if session is available
     if(session){
        // get the current user data
        await authServiceInstance.getCurruntUser().then((res)=>{
            userData=res;
        });
      console.log("getting user data after login. credential are checked",userData.$id);
            if(userData){
                // dispatch the login action with the user data
              console.log("dispatching the login action with user data",userData);
              
                dispatch(login(userData));
              console.log("navigating to the home page");
              
                navigate("/");
            }
        }
    }catch(error){
        console.log("error occured during login",error);
              setError(error.message);
       }
    }

    return (
        <div className="flex items-center justify-center min-h-screen ">
          <div className="bg-slate-200 p-8 rounded-lg shadow-lg w-full max-w-sm">
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
            
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <form onSubmit={handleSubmit(loginHandler)}>
              <div className="mb-4">
                <Input
                  type="email"
                  placeholder="Enter Your Email"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("email",{required:true})}
                />
              </div>
              <div className="mb-6">
                <Input
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("password",{required:true,minLength:6,maxLength:20})}
                />
              </div>
              <div className="mb-4 flex justify-center">
                <small>Don't have an account? <Link to="/signup">Sign up now</Link></small>
              </div>

              <Button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Sign In
              </Button>
            </form>
          </div>
        </div>
       
  )
}

export default Login