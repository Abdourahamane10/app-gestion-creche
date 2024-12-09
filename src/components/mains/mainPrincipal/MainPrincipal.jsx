import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import mainProfessionnnelStyle from "./MainPrincipal.module.css";
import { presentationReducer, projetPedagogiqueReducer, reglementReducer } from "../../../features/textesAdminSlice";
import indexStyle from "../../../index.module.css";

export default function MainPrincipal() {

  const {presentationTexte, projetPedagogiqueTexte, reglementTexte} = useSelector(state => state.textesAdmin);

  const dispatch = useDispatch();

  const token = useSelector(state => state.auth.token);

  const [messageToDisplay, setMessageToDisplay] = useState("");

  const [successMessage, setSuccessMessage] = useState(false);

  const [APIState, setAPIState] = useState({
    loading: false,
    error: false,
    data: undefined
  });

  const navigate = useNavigate();

  useEffect(() => {
    setAPIState(prevState => ({ ...prevState, loading: true }));
    fetch("http://127.0.0.1:8000/api/parametresGeneraux/1",{
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      if(!response.ok) {
        if(response.status === 401){
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
      const text_presentation = responseData.data.texte_presentation
      const text_projetPedagogique = responseData.data.texte_projet_pedagogique;
      const text_reglementInterieur = responseData.data.texte_reglement_interieur;
      dispatch(presentationReducer(text_presentation));
      dispatch(projetPedagogiqueReducer(text_projetPedagogique));
      dispatch(reglementReducer(text_reglementInterieur));
      setSuccessMessage(true);
    })
    .catch(erreur => {
      setAPIState({loading: false, error: true, data: undefined});
      setMessageToDisplay(erreur.message);
      setTimeout(() => {
        setMessageToDisplay("");
      }, 7000);
    })
  }, [dispatch, token, navigate]);

  const codeUser = useSelector(state => state.auth.codeUser);

  function handleClickBtnModifierPresentation(){
    navigate('/updatePresentation');
  }

  function handleClickBtnModifierProjetPedagogique(){
    navigate('/updateProjetPedagogique');
  }

  function handleClickBtnModifierReglement(){
    navigate('/updateReglement');
  }

  return (
    <>
        {messageToDisplay != "" && (<p style={{ color: `${successMessage ? "green" : "red"}`, padding: 10 }}>{messageToDisplay}</p>)}
        {presentationTexte != "" && (
          <div className={mainProfessionnnelStyle.presentation_container}>
          <h2>Présentation de la crèche</h2>
          {APIState.loading && (<img className={indexStyle.spinner} style={{ color: 'blue' }} src="/icones/spinner.svg" />)}
          <p>{presentationTexte}</p>
          {((codeUser == "DR") || (codeUser == "DA")) && (
            <div className={mainProfessionnnelStyle.btnModifierContainer}>
              <button className={mainProfessionnnelStyle.btnModifier} onClick={handleClickBtnModifierPresentation}>Modifier</button>
            </div>
            )}
        </div>)}
        {projetPedagogiqueTexte != "" && (
          <div className={mainProfessionnnelStyle.pedagogique_container}>
          <h2>Projet pédagogique de la crèche</h2>
          {APIState.loading && (<img className={indexStyle.spinner} style={{ color: 'blue' }} src="/icones/spinner.svg" />)}
          <p>{projetPedagogiqueTexte}</p>
          {((codeUser == "DR") || (codeUser == "DA")) && (
            <div className={mainProfessionnnelStyle.btnModifierContainer}>
              <button className={mainProfessionnnelStyle.btnModifier} onClick={handleClickBtnModifierProjetPedagogique}>Modifier</button>
            </div>
            )}
        </div>)}
        {reglementTexte != "" && (
          <div className={mainProfessionnnelStyle.reglement_container}>
          <h2>Réglement intérieur</h2>
          {APIState.loading && (<img className={indexStyle.spinner} style={{ color: 'blue' }} src="/icones/spinner.svg" />)}
          <p>{reglementTexte}</p>
          {((codeUser == "DR") || (codeUser == "DA")) && (
            <div className={mainProfessionnnelStyle.btnModifierContainer}>
              <button className={mainProfessionnnelStyle.btnModifier} onClick={handleClickBtnModifierReglement}>Modifier</button>
            </div>
            )}
        </div>)}
    </>
  )
}