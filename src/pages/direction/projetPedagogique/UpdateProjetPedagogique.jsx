import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import textesAdminStyle from "../textesAdmin.module.css";
import indexStyle from "../../../index.module.css";
import { projetPedagogiqueReducer } from "../../../features/textesAdminSlice";
import { useNavigate } from "react-router-dom";

export default function UpdateProjetPedagogique() {

  const projetPedagogiqueTexte = useSelector(state => state.textesAdmin.projetPedagogiqueTexte);

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

  const token = useSelector(state => state.auth.token);

  const [messageToDisplay, setMessageToDisplay] = useState("");

  const [successMessage, setSuccessMessage] = useState(false);

  const projetPedagogiqueTexteareaRef = useRef();

  const dispatch = useDispatch();

 const navigate = useNavigate();

 const [parametresGenerauxId, setParametresGenerauxId] = useState(0);

  useEffect(() => {
    setGETAPIState({loading: true, error: false, data: undefined});
    fetch("http://127.0.0.1:8000/api/parametresGeneraux",{
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      if(!response.ok) {
        if(response.status == 401){
          navigate('/');
        }
        return response.json().then(messageError => {
          throw Error(messageError.message || messageError.error || "Erreur inattendu");
        });
      }
      return response.json();
    })
    .then(responseData => {
      const text_projetPedagogique = responseData.data[0].projet_pedagogique;
      setParametresGenerauxId(responseData.data[0].id)
      dispatch(projetPedagogiqueReducer(text_projetPedagogique));
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
    setPATCHAPIState({loading: true, error: false, data: undefined})
    fetch(`http://127.0.0.1:8000/api/parametresGeneraux/${parametresGenerauxId}`,{
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
        if(response.status == 401) {
          navigate('/');
        }
        return response.json().then(messageError => {
          throw Error(messageError.message || messageError.error || "Erreur inattendu");
        });
      }
      return response.json();
    })
    .then(responseData => {
      const text_projetPedagogique = responseData.data.projet_pedagogique;
      dispatch(projetPedagogiqueReducer(text_projetPedagogique));
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
        <label htmlFor="projetPedagogique">Modifier le projet pédagogique</label>
        {GETAPIState.loading ? (<img className={indexStyle.spinner} src="/icones/spinner.svg" />) : 
        (<textarea id="projetPedagogique" ref={projetPedagogiqueTexteareaRef} defaultValue={projetPedagogiqueTexte}></textarea>)
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