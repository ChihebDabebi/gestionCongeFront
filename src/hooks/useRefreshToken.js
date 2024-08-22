import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken=()=>{

    const {auth ,setAuth} = useAuth();
    

    const refresh = async ()=>{
        const response = await axios.post('auth/refresh-token', {}
           ,
            {withCredentials: true // Ensure cookies are sent
    });
        setAuth(prev=>{
            console.log(response.data.access_token);
            return{...prev,accessToken:response.data.access_token}
        });
        localStorage.clear();
        localStorage.setItem('accessToken', response.data.access_token);
        return response.data.access_token
    
    }
    return refresh;
}

export default useRefreshToken