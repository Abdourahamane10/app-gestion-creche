import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux"

import indexStyle from "../../../index.module.css";
import { reglementReducer } from "../../../features/textesAdminSlice"; 
import textesAdminStyle from "../textesAdmin.module.css"; 

export default function UpdateReglement() {

  const reglementTexte = useSelector(state => state.textesAdmin.reglementTexte);

  const [APIState, setAPIState] = useState({
    loading: false,
    error: false,
    data: undefined
  });

  const reglementInterieurTexteareaRef = useRef();

  const [messageToDisplay, setMessageToDisplay] = useState("");

  const [successMessage, setSuccessMessage] = useState(false);

  const dispatch = useDispatch();

  const token = useSelector(state => state.auth.token);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/parametresGeneraux/1", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      if(!response.ok){
        return response.json().then(messageError => {
          throw Error(messageError.message || messageError.error || "Erreur inattendu");
        });
      }
      return response.json();
    })
    .then(responseData => {
      const text_reglementInterieur = responseData.data.texte_reglement_interieur;
      dispatch(reglementReducer(text_reglementInterieur));
    })
    .catch(erreur => {
      setMessageToDisplay(erreur.message);
      setTimeout(() => {
        setMessageToDisplay("");
      }, 7000);
    })
  });

  function handleSubmit(e) {
    setAPIState({...APIState, loading: true})
    e.preventDefault();
    fetch("http://127.0.0.1:8000/api/parametresGeneraux/1", {
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
        return response.json().then(messageError => {
          throw Error(messageError.message || messageError.error || "Erreur inattendu");
        });
      }
      return response.json();
    })
    .then(responseData => {
      const text_reglementInterieur = responseData.data.texte_reglement_interieur;
      dispatch(reglementReducer(text_reglementInterieur));
      setMessageToDisplay(responseData.message);
      setSuccessMessage(true);
      setTimeout(() => {
        setMessageToDisplay("");
      }, 7000);
      setAPIState({loading: false, error: false, data: responseData});
    })
    .catch(erreur => {
      setMessageToDisplay(erreur.message);
      setTimeout(() => {
        setMessageToDisplay("");
      }, 7000);
      setAPIState({loading: false, error: true, data: undefined});
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="reglementInterieur">Modifier le règlement intérieur</label>
          <textarea id="reglementInterieur" ref={reglementInterieurTexteareaRef} defaultValue={reglementTexte}></textarea>
        </div>
        <button className={textesAdminStyle.btnEnregistrer}>
          {APIState.loading && (<img className={indexStyle.spinner} src="/icones/spinner.svg" />)}
          Enregistrer
        </button>
      </form>
      {messageToDisplay != "" && (<p style={{ color: `${successMessage ? "green" : "red"}`, padding: 10 }}>{messageToDisplay}</p>)}
    </div>
  )
}