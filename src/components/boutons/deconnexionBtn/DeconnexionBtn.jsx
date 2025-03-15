import { useState } from "react"
import deconnexionBtnStyle from "./DeconnexionBtn.module.css"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import indexStyle from "../../../index.module.css"
import { setIdSectionSelectedReducer } from "../../../features/sectionSlice";

export default function DeconnexionBtn() {
  const [apiDeconnexionState, setApiDeconnexionState] = useState({
    loading: false,
    error: false,
    data: undefined
  });

  const navigate = useNavigate();

  const [messageErrorApi, setMessageErrorApi] = useState("");
 
  const token = useSelector(state => state.auth.token);

  const dispatch = useDispatch();

  function handleClickBtnDeconnexion(){

    setApiDeconnexionState({...apiDeconnexionState, loading: true});

    fetch(`${import.meta.env.VITE_APP_SERV}/api/logout`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      if(!response.ok){
        if(response.status == 401){
          //Token non valide
          navigate('/');
        }
        else {
          throw Error("Erreur de déconnexion !");
        }
      }
      return response.json();
    })
    .then(responseData => {
      setApiDeconnexionState({loading: false, error: false, data: responseData});
      //On remet l'id de la section courante à 0 car pour le moment on ne navigue dans aucune section
      dispatch(setIdSectionSelectedReducer(0));
      navigate('/');
    })
    .catch(erreur => {
      setApiDeconnexionState({loading: false, error: true, data: undefined});
      setMessageErrorApi(erreur.message)
    })
  }

  return (
    <div className={deconnexionBtnStyle.deconnexionContainer}>
    <button onClick={handleClickBtnDeconnexion} className={deconnexionBtnStyle.deconnexionBtn}>
      {apiDeconnexionState.loading && (<img className={indexStyle.spinner} style={{ backgroundColor: '#333' }} src="/icones/spinner.svg" />)}
      Déconnexion
    </button>
    {apiDeconnexionState.error && (<p className={deconnexionBtnStyle.message_error_api}>{messageErrorApi}</p>)}
    </div>
  )
}