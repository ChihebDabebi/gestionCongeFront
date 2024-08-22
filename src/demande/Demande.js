import useDemandeService from "../hooks/useDemandeService";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useState, useEffect } from "react";
const Demande = ()=>{
    const axiosPrivate = useAxiosPrivate();
    const [demandes, setDemandes] = useState([]);
    useEffect(() => {
        const getAllDemandes = async () => {
            try {
                const response = await axiosPrivate.get("demande/all");
                console.log("Request headers:", response.config.headers);

                console.log(response.data);
            } catch (err) {
                console.log(err.mess);
            } finally {
                console.log("bloc finally");
            }
        };

        getAllDemandes();
    }, [axiosPrivate]);
 
    return(
        <div>
        <p>hello getAllDemandes</p>
        <button>click me </button>
        </div>
    );
}
export default Demande