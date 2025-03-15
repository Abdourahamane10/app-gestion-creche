import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux"

import indexStyle from "../../../index.module.css";
import { reglementReducer, idReducer } from "../../../features/textesAdminSlice"; 
import textesAdminStyle from "../textesAdmin.module.css"; 
import { useNavigate } from "react-router-dom";

export default function UpdateReglement() {

  const reglementTexte = useSelector(state => state.textesAdmin.reglementTexte);

  const [PATCHAPIState, setPATCHAPIState] = useState({
    loading: false,
    error: false,
    data: undefined
  });

  const [GETAPIState, setGETAPIState] = useState({
    loading: false,
    error: false,
    data: undefined
  });

  const reglementInterieurTexteareaRef = useRef();

  const [messageToDisplay, setMessageToDisplay] = useState("");

  const [successMessage, setSuccessMessage] = useState(false);

  const dispatch = useDispatch();

  const token = useSelector(state => state.auth.token);

  const navigate = useNavigate();

  const parametresGenerauxId = useSelector(state => state.textesAdmin.id);

  useEffect(() => {
    setGETAPIState({loading: true, error: false, data: undefined});
    fetch(`${import.meta.env.VITE_APP_SERV}/api/parametresGeneraux`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      if(!response.ok){
        if(response.status == 401){
          // Sauvegarder la dernière route visitée avant déconnexion automatique (si déconnexion automatique)
          localStorage.setItem("lastVisitedPage", window.location.pathname);
          navigate('/');
        }
        return response.json().then(messageError => {
          throw Error(messageError.message || messageError.error || "Erreur inattendu");
        });
      }
      return response.json();
    })
    .then(responseData => {
      const text_reglementInterieur = responseData.data[0].reglement_interieur;
      const id_parametres_generaux = responseData.data[0].id;
      dispatch(reglementReducer(text_reglementInterieur));
      dispatch(idReducer(id_parametres_generaux));
      setGETAPIState({loading: false, error: false, data: responseData});
    })
    .catch(erreur => {
      setMessageToDisplay(erreur.message);
      setTimeout(() => {
        setMessageToDisplay("");
      }, 7000);
      setGETAPIState({loading: false, error: true, data: undefined});
    })
  }, [token, dispatch, navigate]);

  function handleSubmit(e) {
    e.preventDefault();
    setPATCHAPIState({loading: true, error: false, data: undefined});
    fetch(`${import.meta.env.VITE_APP_SERV}/api/parametresGeneraux/${parametresGenerauxId}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        texte_reglement_interieur: reglementInterieurTexteareaRef.current.value
      })
    })
    .then(response => {
      if(!response.ok){
        if(response.status === 401) {
          // Sauvegarder la dernière route visitée avant déconnexion automatique (si déconnexion automatique)
          localStorage.setItem("lastVisitedPage", window.location.pathname);
          navigate('/');
        }
        return response.json().then(messageError => {
          throw Error(messageError.message || messageError.error || "Erreur inattendu");
        });
      }
      return response.json();
    })
    .then(responseData => {
      const text_reglementInterieur = responseData.data.reglement_interieur;
      dispatch(reglementReducer(text_reglementInterieur));
      setMessageToDisplay(responseData.message);
      setSuccessMessage(true);
      setTimeout(() => {
        setMessageToDisplay("");
      }, 7000);
      setPATCHAPIState({loading: false, error: false, data: responseData});
    })
    .catch(erreur => {
      setMessageToDisplay(erreur.message);
      setTimeout(() => {
        setMessageToDisplay("");
      }, 7000);
      setPATCHAPIState({loading: false, error: true, data: undefined});
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="reglementInterieur">Modifier le règlement intérieur</label>
          {GETAPIState.loading ? (<img className={indexStyle.spinner} src="/icones/spinner.svg" />) : 
        (<textarea id="reglementInterieur" ref={reglementInterieurTexteareaRef} defaultValue={reglementTexte}></textarea>)
        } 
        </div>
        <button className={textesAdminStyle.btnEnregistrer}>
          {PATCHAPIState.loading && (<img className={indexStyle.spinner} src="/icones/spinner.svg" />)}
          Enregistrer
        </button>
      </form>
      {messageToDisplay != "" && (<p style={{ color: `${successMessage ? "green" : "red"}`, padding: 10 }}>{messageToDisplay}</p>)}
    </div>
  )
}