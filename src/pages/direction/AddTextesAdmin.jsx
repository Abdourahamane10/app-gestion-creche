import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';

import textesAdminStyle from './textesAdmin.module.css';
import indexStyle from '../../index.module.css';
import { idReducer, presentationReducer, projetPedagogiqueReducer, reglementReducer } from '../../features/textesAdminSlice';

export default function AddTextesAdmin() {

  const token = useSelector(state => state.auth.token);

  const navigate = useNavigate();

  const [APIState, setAPIState] = useState({
    loading: false,
    error: false,
    data: undefined
  });

  const dispatch = useDispatch();

  const [messageToDisplay, setMessageToDisplay] = useState("");

  const [successMessage, setSuccessMessage] = useState(true);

  const texteareaPresentationRef = useRef();

  const texteareaProjetPedagogiqueRef = useRef();

  const texteareaReglementRef = useRef();

  
  function handleSubmitAddTextesAdmin(event) {
    event.preventDefault();
    setAPIState({...APIState, loading: true});
    fetch(`${import.meta.env.VITE_API_SERV}/api/parametresGeneraux`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        texte_presentation: texteareaPresentationRef.current.value,
        texte_projet_pedagogique: texteareaProjetPedagogiqueRef.current.value,
        texte_reglement_interieur: texteareaReglementRef.current.value
      }) 
    })
    .then(response => {
      if(!response.ok) {
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
      setAPIState({loading: false, error: false, data: responseData});
      const idParametreGeneral = responseData.data.id;
      const textePresentation = responseData.data.presentation;
      const texteProjetPedagogique = responseData.data.projet_pedagogique;
      const texteReglement = responseData.data.reglement_interieur;
      dispatch(idReducer(idParametreGeneral));
      dispatch(presentationReducer(textePresentation));
      dispatch(projetPedagogiqueReducer(texteProjetPedagogique));
      dispatch(reglementReducer(texteReglement));
      setMessageToDisplay(responseData.data.message);
      setTimeout(() => {
        setMessageToDisplay("");
      }, 7000);
      navigate('/accueil');
    })
    .catch((error) => {
      setAPIState({loading: false, error: true, data: undefined});
      setSuccessMessage(false);
      setMessageToDisplay(error.message);
      setTimeout(() => {
        setMessageToDisplay("");
      }, 7000);
    })
  }

  return (
    <div>
      <h3 className={textesAdminStyle.titleFormTextesAdmin}>Ajout des textes administratifs</h3>
      {messageToDisplay != "" && <p style={{ color: `${successMessage ? "green" : "red"}`, bottom: 20 }}>{messageToDisplay}</p>}
      <form onSubmit={handleSubmitAddTextesAdmin}>
        <div className={textesAdminStyle.formTextesAdmin_item}>
          <label htmlFor="presentation">Ajouter le texte de présentation de la crèche</label>
          <textarea id="presentation" ref={texteareaPresentationRef}></textarea>
        </div>
        <div className={textesAdminStyle.formTextesAdmin_item}>
          <label htmlFor="projetPedagogique">Ajouter le texte du projet pédagogique de la crèche</label>
          <textarea id="projetPedagogique" ref={texteareaProjetPedagogiqueRef}></textarea>
        </div>
        <div className={textesAdminStyle.formTextesAdmin_item}>
          <label htmlFor="reglement">Ajouter le règlement intérieur de la crèche</label>
          <textarea id="reglement" ref={texteareaReglementRef}></textarea>
        </div>
        <button className={textesAdminStyle.btnAjouterTextes}>
            {APIState.loading && (<img className={indexStyle.spinner} style={{ color: 'blue' }} src="/icones/spinner.svg" />)}
            Ajouter
          </button>
      </form>
    </div>
  )
}