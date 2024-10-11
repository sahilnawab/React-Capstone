import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

function AuthenticationLayout({ children, authentication=true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    //TODO: make it more easy to understand

    // if (authStatus ===true){
    //     navigate("/")
    // } else if (authStatus === false) {
    //     navigate("/login")
    // }
    
    //let authValue = authStatus === true ? true : false

    if(authentication && authStatus !== authentication){
        navigate("/login")
    } else if(!authentication && authStatus !== authentication){
        navigate("/")
    }
    setLoader(false)
}, [authStatus, navigate, authentication])

  // if loader is true then show the loader else show the children
  return loader ? (
    <div className="loader">
      <ClipLoader color={"#000"} loading={loader} size={150} />
    </div>
  ) : (
    <>{children}</>
  );
}

export default AuthenticationLayout;
