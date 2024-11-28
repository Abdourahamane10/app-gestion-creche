import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import textesAdminStyle from "../textesAdmin.module.css";
import indexStyle from "../../../index.module.css";
import { projetPedagogiqueReducer } from "../../../features/textesAdminSlice";

export default function UpdateProjetPedagogique() {

  const projetPedagogiqueTexte = useSelector(state => state.textesAdmin.projetPedagogiqueTexte);

  const [APIState, setAPIState] = useState({
    loading: false,
    error: false,
    data: undefined
  });

  const token = useSelector(state => state.auth.token);

  const [messageToDisplay, setMessageToDisplay] = useState("");

  const [successMessage, setSuccessMessage] = useState(false);

  const projetPedagogiqueTexteareaRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/parametresGeneraux/1",{
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      if(!response.ok) {
        return response.json().then(messageError => {
          throw Error(messageError.message || messageError.error || "Erreur inattendu");
        });
      }
      return response.json();
    })
    .then(responseData => {
      const text_projetPedagogique = responseData.data.texte_projet_pedagogique;
      dispatch(projetPedagogiqueReducer(text_projetPedagogique));
    })
    .catch(erreur => {
      setMessageToDisplay(erreur.message);
      setTimeout(() => {
        setMessageToDisplay("");
      }, 7000);
    })
  });

  function handleSubmit(e) {
    e.preventDefault();
    setAPIState({...APIState, loading: true})
    fetch("http://127.0.0.1:8000/api/parametresGeneraux/1",{
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        texte_projet_pedagogique: projetPedagogiqueTexteareaRef.current.value
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
      const text_projetPedagogique = responseData.data.texte_projet_pedagogique;
      dispatch(projetPedagogiqueReducer(text_projetPedagogique));
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
        <label htmlFor="projetPedagogique">Modifier le projet pédagogique</label>
        <textarea id="projetPedagogique" ref={projetPedagogiqueTexteareaRef} defaultValue={projetPedagogiqueTexte}></textarea>
        </div>
        <button className={textesAdminStyle.btnModifier}>
          {APIState.loading && (<img className={indexStyle.spinner} src="/icones/spinner.svg" />)}
          Modifier
        </button>
      </form>
      {messageToDisplay != "" && (<p style={{ color: `${successMessage ? "green" : "red"}`, padding: 10 }}>{messageToDisplay}</p>)}
    </div>
  )
}