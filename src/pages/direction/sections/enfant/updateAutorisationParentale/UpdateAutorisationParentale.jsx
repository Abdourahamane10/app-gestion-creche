import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";

import useGetEnfant from "../../../../../utils/appelsAPI/APIsEnfant";
import indexStyle from '../../../../../index.module.css';
import transmissionStyleCommun from '../TransmissionStyleCommun.module.css';
import getServeurAPI from "../../../../../utils/appelsAPI/ServeurAPI";
import { useSelector } from "react-redux";

export default function UpdateAutorisationParentale() {
  const location = useLocation();
  const enfantLocal = location?.state?.enfant;
  const queryParams = new URLSearchParams(location.search);
  const idEnfant = queryParams.get('idEnfant');
  const resultAPIGetEnfant = useGetEnfant(enfantLocal, idEnfant);
  let enfant = enfantLocal || resultAPIGetEnfant.data;
  let parentsOfEnfant = enfant?.parents;
  const autorisationParentales = enfant?.autorisations_parentales;
  const token = useSelector(state => state.auth.token);
  const navigate = useNavigate();

  const [valuesToSave, setValueToSave] = useState({
    idParentSelected: autorisationParentales?.id_Parent,
    soins: autorisationParentales?.administration_soin != null ? String(autorisationParentales?.administration_soin) : "",
    sorties: autorisationParentales?.autorisation_sortie != null ? String(autorisationParentales?.autorisation_sortie) : "",
    images: autorisationParentales?.autorisation_photo_video != null ? String(autorisationParentales?.autorisation_photo_video) : "",
    administrationAntipyretique: autorisationParentales?.administration_antipyretique != null ? String(autorisationParentales?.administration_antipyretique) : "",
    maquillages: autorisationParentales?.autorisation_maquillage != null ? String(autorisationParentales?.autorisation_maquillage) : ""
  });

  const [APIState, setAPIState] = useState({
    loading: false,
    error: false,
    data: undefined
  });
  const serveurAPI = getServeurAPI();
  const [messageToDisplay, setMessageToDisplay] = useState("");
  const [messageSuccess, setMessageSuccess] = useState(false);

  function handleChangeParentSelected(event) {
    const {name, value, type, checked} = event.target;
    setValueToSave({...valuesToSave, [name]: type === "checkbox" ? checked : value});
  }

  function handleSubmit(e) {
    e.preventDefault();
    const test = JSON.stringify({
        idParent: valuesToSave.idParentSelected ? Number(valuesToSave.idParentSelected) : null,
        idEnfant: enfant?.id,
        administrationSoin: valuesToSave.soins ? 1 : 0,
        autorisationSortie: valuesToSave.sorties ? 1 : 0,
        autorisationPhoto_video: valuesToSave.images ? 1 : 0,
        administrationAntipyretique: valuesToSave.administrationAntipyretique ? 1 : 0,
        autorisationMaquillage: valuesToSave.maquillages ? 1 : 0
      })
    console.log(test)
    setAPIState({loading: true, error: false, data: undefined});
    fetch(`${serveurAPI}/api/autorisationParentale/${autorisationParentales?.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        idParent: valuesToSave.idParentSelected ? Number(valuesToSave.idParentSelected) : null,
        idEnfant: enfant?.id,
        administrationSoin: valuesToSave.soins ? 1 : 0,
        autorisationSortie: valuesToSave.sorties ? 1 : 0,
        autorisationPhoto_video: valuesToSave.images ? 1 : 0,
        administrationAntipyretique: valuesToSave.administrationAntipyretique ? 1 : 0,
        autorisationMaquillage: valuesToSave.maquillages ? 1 : 0
      })
    })
    .then(response => {
      return response.json().then(data => {
        if(!response.ok) {
          if(response.status == 401) {
            // Sauvegarder la dernière route visitée avant déconnexion automatique (si déconnexion automatique)
            localStorage.setItem("lastVisitedPage", window.location.pathname);
            navigate('/');
          }
          throw new Error(data.message || JSON.stringify(data.errors) || "Une erreur est survenue lors de la modification de la transmission");
        }
        return data;
      })
      .then(responseData => {
        const message = responseData.message;
          setAPIState({loading: false, error: false, data: responseData.data});
          setMessageToDisplay(message);
          setTimeout(() => {
              setMessageToDisplay("");
          }, 7000);
          setMessageSuccess(true);
          const id = enfant?.id;
          navigate(`/enfant/${id}?indexOngletSelected=2`);
      })
      .catch((erreur) => {
        setAPIState({loading: false, error: true, data: undefined});
        setMessageToDisplay(erreur.message);
        setTimeout(() => {
            setMessageToDisplay("");
        }, 7000);
      });
    })
  }

  return (
    <div>
        <h3>Modification des autorisations parentales</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="parent">Parent qui a donné les autorisations parentales</label>
            <select name="idParentSelected" id="parent" value={valuesToSave.idParentSelected} onChange={handleChangeParentSelected}>
              {parentsOfEnfant?.map(parent => (
                <option key={parent.id} value={parent.id}>{parent.nom} {parent.prenom}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="soins">Soins</label>
            <input id="soins" type="checkbox" name="soins" checked={valuesToSave.soins == "1"} onChange={handleChangeParentSelected} />
          </div>
          <div>
            <label htmlFor="sorties">Sorties</label>
            <input id="sorties" type="checkbox" name="sorties" checked={valuesToSave.sorties == "1"} onChange={handleChangeParentSelected} />
          </div>
          <div>
            <label htmlFor="images">Vidéos/Photos</label>
            <input id="images" type="checkbox" name="images" checked={valuesToSave.images == "1"} onChange={handleChangeParentSelected} />
          </div>
          <div>
            <label htmlFor="antipyretique">Antipyretique</label>
            <input id="antipyretique" type="checkbox" name="administrationAntipyretique" checked={valuesToSave.administrationAntipyretique == "1"} onChange={handleChangeParentSelected} />
          </div>
          <div>
            <label htmlFor="maquillages">Maquillages</label>
            <input id="maquillages" type="checkbox" name="maquillages" checked={valuesToSave.maquillages == "1"} onChange={handleChangeParentSelected} />
          </div>
          <div className={transmissionStyleCommun.btnContainer}>
            <button type="submit" disabled={parentsOfEnfant === null || parentsOfEnfant?.length == 0} 
                style={{
                    cursor: `${parentsOfEnfant === null || parentsOfEnfant?.length == 0 ? "not-allowed" : "pointer"}`
                }}>
                {APIState.loading && (<img className={indexStyle.spinner} style={{ color: "gray", width: '15px', height: '15px' }} src="/icones/spinner.svg" />)}
                Valider
            </button>
          </div>
        </form>
        {messageToDisplay != "" && (<p style={{ color: `${messageSuccess ? "green" : "red"}`, padding: 10 }}>{messageToDisplay}</p>)}
    </div>
  )
}