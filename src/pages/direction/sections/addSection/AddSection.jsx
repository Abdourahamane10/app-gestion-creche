import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import addSectionStyle from './AddSection.module.css';
import { employesReducer } from '../../../../features/employeSlice';
import { getSectionReducer } from '../../../../features/sectionSlice';
import indexStyle from '../../../../index.module.css';

export default function AddSection() {

  const employes = useSelector(state => state.employes.employes);

  const [codeSection, setCodeSection] = useState(0);

  const [nomSection, setNomSection] = useState("");

  const [optionSelected, setOptionSelected] = useState("");

  const token = useSelector(state => state.auth.token);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [APIState, setAPIState] = useState({
    loading: false,
    error: false,
    data: undefined
  });

  const [successMessage, setSuccessMessage] = useState(false);

  const [messageAPI, setMessageAPI] = useState("");

  const [erreurAPIEmploye, setErreurAPIEmploye] = useState(false);

  const [isLoadingEmployes, setIsLoadingEmployes] = useState(true);


  function handleInputCodeSectionOnChange(event) 
  {
    const numeroSection = event.target.value;
    setCodeSection(numeroSection);
  }

  function handleInputNameSectionOnChange(event)
  {
    const sectionName = event.target.value;
    setNomSection(sectionName);
  }

  function handleOptionOnchange(event) 
  {
    const idReferentSectionSelected = event.target.value;
    setOptionSelected(idReferentSectionSelected);
  }

  useEffect(() => {
    setIsLoadingEmployes(true);
    fetch(`${import.meta.env.VITE_API_SERV}/api/employe`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      if(!response.ok) {
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
      const listeEmployes = responseData.data;
      dispatch(employesReducer(listeEmployes));
    })
    .catch(() => {
      setErreurAPIEmploye(true);
      setMessageAPI("Aucun employés trouvé pour le référent de section, veuillez vérifier votre connexion internet ou bien créer un employé s'il n'en existe pas encore un !");
      setTimeout(() => {
        setMessageAPI("");
      }, 7000);
    })
    .finally(() => {
      setIsLoadingEmployes(false);
    }); 
  }, [navigate, dispatch, token]);

  function handleSubmit(event) 
  {
    event.preventDefault();
    setAPIState({...APIState, loading: true});
    fetch(`${import.meta.env.VITE_API_SERV}/api/section`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        codeSection: codeSection,
        nomSection: nomSection,
        referentSection: optionSelected
      })
    })
    .then(response => {
      if(!response.ok) {
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
      const sectionCreated = responseData.data;
      dispatch(getSectionReducer(sectionCreated));
      setAPIState({loading: false, error: false, data: responseData});
      setSuccessMessage(true);
      setMessageAPI(responseData.message);
      setTimeout(() => {
        setMessageAPI("");
      }, 7000);
      navigate('/sections');
    })
    .catch((erreur) => {
      setMessageAPI(erreur.message);
      setTimeout(() => {
        setMessageAPI("");
      }, 7000);
      setAPIState({loading: false, error: true, data: undefined});
    }); 
  }

  return (
    <div>
        {(!isLoadingEmployes && !erreurAPIEmploye && employes.length == 0) && (
          <div className={addSectionStyle.alertMessageContainer}>
            <h2 className={addSectionStyle.messageAlert}>Attention : Il doit avoir au moins 1 employé pour pouvoir créer une section !</h2>
            <p className={addSectionStyle.messageAlert}>Veuillez d&apos;abord cliquer dans la section employés dans le menu de droite pour aller créer au moins un employé s&apos;il n&apos;en existe pas encore un !</p>
          </div>
        )}
        <h3 className={addSectionStyle.titleForm}>Ajout d&apos;une section</h3>
        <form onSubmit={handleSubmit}>
            <label htmlFor="codeSection">Numéro de la section</label>
            <input id="codeSection" type="number" min={1} value={codeSection} onChange={handleInputCodeSectionOnChange} />
            <label htmlFor="nomSection">Nom de la section</label>
            <input id="nomSection" type="text" value={nomSection} onChange={handleInputNameSectionOnChange} />
            <label htmlFor="referentSection">Référent de la section</label>
            <select id="referentSection" value={optionSelected} onChange={handleOptionOnchange}>
              <option value="" disabled>Séléctionnez un référent de section</option>
              {employes.map(employe => (
                <option key={employe.id} value={employe.id}>{employe.nom}</option>
              ))}
            </select>
            <button className={addSectionStyle.btnAjouter} disabled={!isLoadingEmployes && !erreurAPIEmploye && employes.length == 0}>
              {APIState.loading && (<img className={indexStyle.spinner} style={{ color: 'green' }} src="/icones/spinner.svg" />)}
              Ajouter
            </button>
        </form>
        {messageAPI != "" && (<p style={{ color: `${successMessage ? "green" : "red"}`, padding: 10 }}>{messageAPI}</p>)}
    </div>
  )
}