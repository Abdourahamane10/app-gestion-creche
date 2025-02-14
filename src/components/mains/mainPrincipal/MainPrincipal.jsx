import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import mainPrincipalStyle from "./MainPrincipal.module.css";
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

  const [existeParametreGeneral, setExisteParametreGeneral] = useState(true);

  const navigate = useNavigate();

  const [isloadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    setIsLoadingData(true);
    setAPIState({loading: true, error: false, data: undefined});
    fetch(`${import.meta.env.VITE_APP_SERV}/api/parametresGeneraux`,{
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
      if(responseData.data.length == 0) {
        setExisteParametreGeneral(false);
      }
    
      const text_presentation = responseData.data[0]?.presentation
      const text_projetPedagogique = responseData.data[0]?.projet_pedagogique;
      const text_reglementInterieur = responseData.data[0]?.reglement_interieur;
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
    .finally(() => {
      setIsLoadingData(false);
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

  function handleClickBtnAjouterTextesAdmin() {
    navigate('/addTextesAdmin');
  }

  return (
     <>
      {(APIState.loading && (<div className={mainPrincipalStyle.loadingContainer}><img className={indexStyle.spinner} style={{ backgroundColor: 'gray' }} src="/icones/spinner.svg" /></div>))
      ||
      (
        <div>
          {messageToDisplay != "" && (<p style={{ color: `${successMessage ? "green" : "red"}`, padding: 10 }}>{messageToDisplay}</p>)}
          {(!isloadingData && !existeParametreGeneral) 
          ? <div>
              <div className={mainPrincipalStyle.presentation_container}>
                <h2>Présentation de la crèche</h2>
                <p className={mainPrincipalStyle.messageToDisplayIfNoTexte}>Pas de texte de présentation de la crèche</p>
              </div>
              <div className={mainPrincipalStyle.pedagogique_container}>
                <h2>Projet pédagogique de la crèche</h2>
                <p className={mainPrincipalStyle.messageToDisplayIfNoTexte}>Pas de texte pour le projet pédagogique de la crèche</p>
              </div>
              <div className={mainPrincipalStyle.reglement_container}>
                <h2>Réglement intérieur</h2>
                <p className={mainPrincipalStyle.messageToDisplayIfNoTexte}>Pas de texte pour le règlement intérieur</p>
              </div>
              {((codeUser == "DR") || (codeUser == "DA")) && (
                  <div className={mainPrincipalStyle.btnAjouterContainer}>
                    <button className={mainPrincipalStyle.btnAjouter} onClick={handleClickBtnAjouterTextesAdmin}>Ajouter les textes</button>
                  </div>
                )}
            </div>
          : <div>
              <div className={mainPrincipalStyle.presentation_container}>
                <h2>Présentation de la crèche</h2>
                <p>{presentationTexte ? presentationTexte : <span className={mainPrincipalStyle.messageToDisplayIfNoTexte}>Pas de texte de présentation de la crèche</span>}</p>
                {((codeUser == "DR") || (codeUser == "DA")) && (
                  <div className={mainPrincipalStyle.btnModifierContainer}>
                    <div className={mainPrincipalStyle.btnModifier_and_btnSupprimer_container}>
                        <button className={mainPrincipalStyle.btnModifier} onClick={handleClickBtnModifierPresentation}>Modifier</button>
                    </div>
                  </div>
                )}
              </div>
              <div className={mainPrincipalStyle.pedagogique_container}>
                <h2>Projet pédagogique de la crèche</h2>
                <p>{projetPedagogiqueTexte ? projetPedagogiqueTexte : <span className={mainPrincipalStyle.messageToDisplayIfNoTexte}>Pas de texte pour le projet pédagogique de la crèche</span>}</p>
                {((codeUser == "DR") || (codeUser == "DA")) && (
                  <div className={mainPrincipalStyle.btnModifierContainer}>
                    <div className={mainPrincipalStyle.btnModifier_and_btnSupprimer_container}>
                      <button className={mainPrincipalStyle.btnModifier} onClick={handleClickBtnModifierProjetPedagogique}>Modifier</button>
                    </div>
                  </div>
                )}
              </div>
              <div className={mainPrincipalStyle.reglement_container}>
                <h2>Réglement intérieur</h2>
                <p>{reglementTexte ? reglementTexte : <span className={mainPrincipalStyle.messageToDisplayIfNoTexte}>Pas de texte pour le règlement intérieur</span>}</p>
                {((codeUser == "DR") || (codeUser == "DA")) && (
                  <div className={mainPrincipalStyle.btnModifierContainer}>
                    <div className={mainPrincipalStyle.btnModifier_and_btnSupprimer_container}>
                      <button className={mainPrincipalStyle.btnModifier} onClick={handleClickBtnModifierReglement}>Modifier</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          }
        </div>
      )}
    </>
  )
}