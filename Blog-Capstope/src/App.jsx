import{useDispatch} from 'react-redux'
import { useState,useEffect } from 'react'
import './App.css'
import  authServiceInstance  from './appwrite/auth';
import { login, logout } from './store/authSlice';
import ClipLoader from "react-spinners/ClipLoader";
import {Header,Footer} from './components/index.js';
import { Outlet } from 'react-router-dom';

function App() {
  const [loading,setLoading]=useState(true);
  const dispatch=useDispatch();

useEffect(()=>{
  authServiceInstance.getCurruntUser()
  .then((userData)=>{
    if(userData){
      //if there is a user logged in then login
      //dispatch the login action and userData as payload
      dispatch(login({userData}));
      // set loading to false beacuse we have got the user data
      
    }
    else{
      //if there is no user logged in then logout
      dispatch(logout()
    );
    }
  })
  // .catch((error)=>{
  //   console.log("error occured while getting current user",error);
  // })
  .finally(()=>{
    //set loading to false
    setLoading(false);
  }
)}
,[])


  if(!loading){
   return(
    <div className=" bg-slate-50 content-between">
    <div className="">
      <Header></Header>
    </div>
    <main>
    <Outlet/>
    </main>
    <div className="App">
      <Footer></Footer>
    </div>
    </div>
   )
  }else{
    return(
      <div className="flex justify-center items-center min-h-screen">
        <ClipLoader color={"#000"} loading={loading} size={150} />
      </div>
    )
  }
}

export default App
