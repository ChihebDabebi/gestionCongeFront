
import axios from "../api/axios";



    const register = (nom,
        prenom,
        email,
        password,
        dateEmbauche,
        cin,
        age) => {
        return axios.post("auth/signup", {
          nom,
          prenom,
          email,
          password,
          dateEmbauche,
          cin,
          age
        });
      };

    const login=(email,password)=>{
        return axios.post("auth/login",{
          email,password
        }, {
          withCredentials: true
        })
      }





const AuthService = {
    register,
    login
  }
export default AuthService