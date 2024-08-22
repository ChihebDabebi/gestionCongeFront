import { useLocation,Navigate,Outlet } from "react-router-dom";
import useAuth from "hooks/useAuth";
import getDecodedToken from 'services/getDecodedToken';
import { useState,useEffect } from "react";

const RequireAuth=({allowedRoles})=>{
const {auth,setAuth} = useAuth();
const isLoggedIn = localStorage.getItem("accessToken");
const location = useLocation();
const [roles, setRoles] = useState([]);
const [username2, setUsername2] = useState("");
const [loading, setLoading] = useState(true);
const [redirectToLogin,setRedirectToLogin] = useState(false);

 useEffect(() => {
  const decodedToken = getDecodedToken();

  if (decodedToken) {
    console.log(decodedToken.username);  
    console.log(decodedToken.authorities);  

    setRoles(decodedToken.authorities);
    setUsername2(decodedToken.username);

    

  } else {
    console.log('Error decoding token');
  }
  setLoading(false); 

}, []);
useEffect(() => {
  if (!loading && !roles?.find(role => allowedRoles?.includes(role))) {
    localStorage.removeItem('accessToken'); 
  }
}, [loading, roles, allowedRoles]);

if (loading) {
  return <div>Loading...</div>; 
}


return(
    roles?.find(role=>allowedRoles?.includes(role))
      ? <Outlet/>
      :username2
       ?<Navigate to="/unauthorized" state={{from:location}} replace />
       :<Navigate to="/auth/login" state={{from:location}} replace />
);
}
export default RequireAuth