import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useState, useEffect } from "react";

const useDemandeService = () => {
    const axiosPrivate = useAxiosPrivate();
    const [demandes, setDemandes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getAllDemandes = async () => {
            try {
                const response = await axiosPrivate.get("demande/all");
                setDemandes(response.data);
                console.log(demandes);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        getAllDemandes();
    }, [axiosPrivate]);

    return { demandes, loading, error };
};

export default useDemandeService;
