import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import addAutorisationParentaleStyle from './AddAutorisationParentale.module.css';
import indexStyle from '../../../../../index.module.css';

export default function AddAutorisationParentale() {
  const token = useSelector(state => state.auth.token);
  const location = useLocation();
  let enfant = location?.state?.enfant;
  const queryParams = new URLSearchParams(location.search);
  const idEnfant = queryParams.get('idEnfant');
  console.log("idEnfant :", idEnfant);
  if(enfant == null) {
    fetch(`${import.meta.env.VITE_APP_SERV}/api/enfant/${idEnfant}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      return response.json().then(data => {
        if(!response.ok) {
          if(response.status == 401) {
            // Sauvegarder la dernière route visitée avant déconnexion automatique (si déconnexion automatique)
            localStorage.setItem("lastVisitedPage", window.location.pathname);
            navigate('/');
          }
          throw new Error(JSON.stringify(data.errors) || data.message || "Erreur du serveur");
        }
        return data;
      })
    })
    .then(responseData => {
      enfant = responseData.data;
    })
    .catch((error) => {
      console.log("erreur :", error);
      navigate('/');
    })
  }
  let parentsOfEnfant = enfant?.parents;
  const [idParentSelected, setIdParentSelected] = useState("");
  const [autorisations, setAutorisations] = useState({
    soins: false,
    sorties: false,
    image: false,
    antipyretique: false,
    maquillages: false
  });
  const [APIState, setAPIState] = useState({
    loading: false,
    error: false,
    data: undefined
  });
  const navigate = useNavigate();
  const [messageError, setMessageError] = useState("");

  function handleChangeParentSelected(event) {
    const id_parentSelected = event.target.value;
    setIdParentSelected(id_parentSelected);
  }

  function handleChangeAutorisations(event) {
    const {name, checked} = event.target;
    setAutorisations({...autorisations, [name]: checked});
  }

  function handleSubmit(event) {
    event.preventDefault();
    setAPIState({...APIState, loading: true});
    fetch(`${import.meta.env.VITE_APP_SERV}/api/autorisationParentale`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        idParent: idParentSelected,
        idEnfant: enfant?.id,
        administrationSoin: autorisations.soins ? 1 : 0,
        autorisationSortie: autorisations.sorties ? 1 : 0,
        autorisationPhoto_video: autorisations.image ? 1 : 0,
        administrationAntipyretique: autorisations.antipyretique ? 1 : 0,
        autorisationMaquillage: autorisations.maquillages ? 1 : 0
      })
    })
    .then(response => {
      return response.json().then(data => {
        if(!response.ok) {
          if (response.status === 401) {
            // Sauvegarder la dernière route visitée avant déconnexion automatique (si déconnexion automatique)
            localStorage.setItem("lastVisitedPage", window.location.pathname);
            navigate('/');
          }
          throw new Error(JSON.stringify(data.errors) || data.message || "Une erreur est survenue lors de la création");
        }
        return data;
      });
    })
    .then(responseData => {
      setAPIState({loading: false, error: false, data: responseData});
      navigate(`/enfant/${enfant?.id}`);
    })
    .catch(error => {
      setAPIState({loading: false, error: true, data: undefined});
      setMessageError(error.message);
      setTimeout(() => {
        setMessageError("");
    }, 7000);
    })
  }

  return (
    <div>
      <h3 className={addAutorisationParentaleStyle.title}>Ajout d&apos;autorisations parentales</h3>
      <form onSubmit={handleSubmit}>
        <div className={addAutorisationParentaleStyle.parentContainer}>
          <label htmlFor="idParent">Parent qui a donné les autorisations :</label>
          <select id="idParent" value={idParentSelected} onChange={handleChangeParentSelected}>
            <option value="" disabled>Séléctionnez un parent</option>
            {parentsOfEnfant?.map(parent => (
              <option key={parent.id} value={parent.id}>{parent.nom} {parent.prenom}</option>
            ))}
          </select>
        </div>
        {(parentsOfEnfant == null || parentsOfEnfant.length === 0) && (
          <div className={addAutorisationParentaleStyle.messageErrorContainer}>
            <p className={addAutorisationParentaleStyle.messageError}>Veuillez d&apos;abord créer le(s) parent(s)</p>
          </div>
        )}
        <div className={addAutorisationParentaleStyle.soinsContainer}>
          <label htmlFor="soins">Soins</label>
          <input id="soins" type="checkbox" name="soins" checked={autorisations.soins} onChange={handleChangeAutorisations} />
        </div>
        <div className={addAutorisationParentaleStyle.sortiesContainer}>
          <label htmlFor="sorties">Sorties</label>
          <input id="sorties" type="checkbox" name="sorties" checked={autorisations.sorties} onChange={handleChangeAutorisations} />
        </div>
        <div className={addAutorisationParentaleStyle.imageContainer}>
          <label htmlFor="image">Vidéos/Photos</label>
          <input id="image" type="checkbox" name="image" checked={autorisations.image} onChange={handleChangeAutorisations} />
        </div>
        <div className={addAutorisationParentaleStyle.antipyretiqueContainer}>
          <label htmlFor="antipyretique">Antipyretique</label>
          <input id="antipyretique" type="checkbox" name="antipyretique" checked={autorisations.antipyretique} onChange={handleChangeAutorisations} />
        </div>
        <div className={addAutorisationParentaleStyle.maquillageContainer}>
          <label htmlFor="maquillages">Maquillages</label>
          <input id="maquillages" type="checkbox" name="maquillages" checked={autorisations.maquillages} onChange={handleChangeAutorisations} />
        </div>
        <div className={addAutorisationParentaleStyle.btnAjouterContainer}>
          <button className={addAutorisationParentaleStyle.btnAjouter} 
          disabled={parentsOfEnfant == null || parentsOfEnfant.length === 0}
          style={{
            cursor: `${parentsOfEnfant == null || parentsOfEnfant === 0 ? "not-allowed" : "pointer"}`
            }}
          >
            {APIState.loading && (<img className={indexStyle.spinner} style={{ color: 'blue', width: '15px', height: '15px' }} src="/icones/spinner.svg" />)}
            Valider
          </button>
        </div>
      </form>
      {messageError != "" && (
        <div className={addAutorisationParentaleStyle.messageToDisplayContainer}>
           <p>{messageError}</p>
        </div>
      )}
    </div>
  )
}