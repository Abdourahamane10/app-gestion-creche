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
    setAPIState({loading: true, error: false, data: undefined});
    fetch("http://127.0.0.1:8000/api/parametresGeneraux",{
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
      const text_presentation = responseData.data[0].presentation
      const text_projetPedagogique = responseData.data[0].projet_pedagogique;
      const text_reglementInterieur = responseData.data[0].reglement_interieur;
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

  function handleClickBtnAjouterPresentation() {
    navigate('/addPresentation');
  }

  function handleClickBtnModifierProjetPedagogique(){
    navigate('/updateProjetPedagogique');
  }

  function handleClickBtnAjouterProjetPedagogique() {
    navigate('/addProjetPedagogique');
  }

  function handleClickBtnModifierReglement(){
    navigate('/updateReglement');
  }

  function handleClickBtnAjouterReglement() {
    navigate('/addReglement');
  }

  return (
     <>
      {(APIState.loading && (<div className={mainProfessionnnelStyle.loadingContainer}><img className={indexStyle.spinner} style={{ backgroundColor: 'gray' }} src="/icones/spinner.svg" /></div>))
      ||
      (
        <div>
          {messageToDisplay != "" && (<p style={{ color: `${successMessage ? "green" : "red"}`, padding: 10 }}>{messageToDisplay}</p>)}
            {presentationTexte != "" && (
              <div className={mainProfessionnnelStyle.presentation_container}>
                <h2>Présentation de la crèche</h2>
                <p>{presentationTexte ? presentationTexte : "Pas de texte de présentation de la crèche"}</p>
                {((codeUser == "DR") || (codeUser == "DA")) && (
                  <div className={mainProfessionnnelStyle.btnModifierContainer}>
                    {presentationTexte 
                    ? <div className={mainProfessionnnelStyle.btnModifier_and_btnSupprimer_container}>
                        <button className={mainProfessionnnelStyle.btnModifier} onClick={handleClickBtnModifierPresentation}>Modifier</button>
                        {/* <button className={mainProfessionnnelStyle.btnSupprimer}>Supprimer</button> */}
                      </div>
                    : <button className={mainProfessionnnelStyle.Ajouter} onClick={handleClickBtnAjouterPresentation}>Ajouter Un texte</button>
                    }
                  </div>
                  )}
              </div>)
            }
            {projetPedagogiqueTexte != "" && (
              <div className={mainProfessionnnelStyle.pedagogique_container}>
                <h2>Projet pédagogique de la crèche</h2>
                <p>{projetPedagogiqueTexte ? projetPedagogiqueTexte : "Pas de texte pour le projet pédagogique de la crèche"}</p>
                {((codeUser == "DR") || (codeUser == "DA")) && (
                  <div className={mainProfessionnnelStyle.btnModifierContainer}>
                    {projetPedagogiqueTexte 
                    ? <div className={mainProfessionnnelStyle.btnModifier_and_btnSupprimer_container}>
                        <button className={mainProfessionnnelStyle.btnModifier} onClick={handleClickBtnModifierProjetPedagogique}>Modifier</button>
                        {/* <button className={mainProfessionnnelStyle.btnSupprimer}>Supprimer</button> */}
                      </div>
                    : <button className={mainProfessionnnelStyle.Ajouter} onClick={handleClickBtnAjouterProjetPedagogique}>Ajouter Un texte</button>
                    }
                  </div>
                )}
              </div>)
            }
            {reglementTexte != "" && (
              <div className={mainProfessionnnelStyle.reglement_container}>
                <h2>Réglement intérieur</h2>
                <p>{reglementTexte ? reglementTexte : "Pas de texte pour le règlement intérieur"}</p>
                {((codeUser == "DR") || (codeUser == "DA")) && (
                  <div className={mainProfessionnnelStyle.btnModifierContainer}>
                    {reglementTexte 
                    ? <div className={mainProfessionnnelStyle.btnModifier_and_btnSupprimer_container}>
                        <button className={mainProfessionnnelStyle.btnModifier} onClick={handleClickBtnModifierReglement}>Modifier</button>
                        {/* <button className={mainProfessionnnelStyle.btnSupprimer}>Supprimer</button> */}
                      </div>
                    : <button className={mainProfessionnnelStyle.btnAjouter} onClick={handleClickBtnAjouterReglement}>Ajouter Un texte</button>
                    }
                  </div>
                  )}
              </div>)
            }
      </div>
      )}
    </>
  )
}