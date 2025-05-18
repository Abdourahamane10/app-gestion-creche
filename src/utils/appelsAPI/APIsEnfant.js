import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import getServeurAPI from "./ServeurAPI";
import { useEffect, useMemo, useState } from "react";

export default function useGetEnfant(enfantLocal, idEnfant) {
    const token = useSelector(state => state.auth.token);
    const serveurAPI = useMemo(() => getServeurAPI(), []);
    const navigate = useNavigate();
    const [APIState, setAPIState] = useState({
        loading: false,
        error: false,
        data: undefined
    });
    const [messageError, setMessageError] = useState("");

    useEffect(() => {
        if(enfantLocal == null && idEnfant) {
            setAPIState({loading: true, error: false, data: undefined});
            fetch(`${serveurAPI}/api/enfant/${idEnfant}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                return response.json().then(data => {
                    if(!response.ok) {
                    if(response.status == 401) {
                        // Sauvegarder la dernière route visitée avant déconnexion automatique (si déconnexion automatique)
                        localStorage.setItem("lastVisitedPage", window.location.pathname);
                        navigate('/');
                    }
                    throw new Error(JSON.stringify(data.errors) || data.message || "Erreur du serveur");
                    }
                    return data;
            })
            })
            .then(responseData => {
                setAPIState({loading: false, error: false, data: responseData.data});
            })
            .catch((erreur) => {
                setAPIState({loading: false, error: true, data: undefined});
                setMessageError(erreur.message);
            });
        }
    }, [enfantLocal, idEnfant, serveurAPI, token, navigate]);

    //Réinitialisation propre si enfantLocal devient dispo
    useEffect(() => {
        if (enfantLocal != null) {
            setAPIState({
            loading: false,
            error: false,
            data: enfantLocal,
            });
        }
    }, [enfantLocal]);

    return {APIState, messageError};
}
