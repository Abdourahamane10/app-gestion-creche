import { useDispatch, useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react";

import textesAdminStyle from "../textesAdmin.module.css";
import { presentationReducer } from "../../../features/textesAdminSlice";
import indexStyle from "../../../index.module.css";
import { useNavigate } from "react-router-dom";

export default function UpdatePresentation() {
  const presentationTexte = useSelector(state => state.textesAdmin.presentationTexte);

  const presentationTextareaRef = useRef();

  const dispatch = useDispatch();

  const [messageToDisplay, setMessageToDisplay] = useState("");

  const [PATCHAPIState, setPATCHAPIState] = useState({
    loading: false,
    error: false,
    data: undefined
  });

  const token = useSelector(state => state.auth.token);

  const navigate = useNavigate();

  const [successMessage, setSuccessMessage] = useState(false);

  //Mise à jour du state presentationTexte après le chargement du composant
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/parametresGeneraux/1",{
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      if(!response.ok){
        if(response.status === 401) {
          navigate('/');
        }
        return response.json().then(messageError => {
          throw Error(messageError.message || messageError.error || "Erreur inattendu");
        });
      }
      return response.json();
    })
    .then(responseData => {
      const text_presentation = responseData.data.texte_presentation;
      dispatch(presentationReducer(text_presentation));
    })
    .catch(erreur => {
      setMessageToDisplay(erreur.message);
      setTimeout(() => {
        setMessageToDisplay("");
      }, 5000);
    })
  });


  function handleSubmit(event) {
    event.preventDefault();
    setPATCHAPIState({...PATCHAPIState, loading: true})
    fetch("http://127.0.0.1:8000/api/parametresGeneraux/1",{
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        texte_presentation: presentationTextareaRef.current.value
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
      const text_presentation = responseData.data.texte_presentation;
      dispatch(presentationReducer(text_presentation));
      setMessageToDisplay(responseData.message);
      setSuccessMessage(true);
      setTimeout(() => {
        setMessageToDisplay("");
      }, 5000);
      setPATCHAPIState({loading: false, error: false, data: responseData});
    })
    .catch(erreur => {
      setMessageToDisplay(erreur.message);
      setTimeout(() => {
        setMessageToDisplay("");
      }, 5000);
      setPATCHAPIState({loading: false, error: true, data: undefined});
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
        <label htmlFor="presentation">Modifier le texte de présentation de la crèche</label>
        <textarea id="presentation" ref={presentationTextareaRef} defaultValue={presentationTexte}></textarea>
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