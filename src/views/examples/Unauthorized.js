import { useNavigate } from "react-router-dom";
const Unauthorized = ()=>{
const navigate = useNavigate();

const handleClick = () =>{
    navigate("/auth/login");
}
return( 
    <div>

        <p> unAuthorized</p>
        <button onClick={handleClick}>go to login</button>
    </div>
);
}
export default  Unauthorized 