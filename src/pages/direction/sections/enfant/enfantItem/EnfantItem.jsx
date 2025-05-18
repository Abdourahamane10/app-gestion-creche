import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import { parseISO, utcToZonedTime } from "date-fns-tz";

import enfantItemStyle from './EnfantItem.module.css';
import indexStyle from '../../../../../index.module.css';
import sectionStyleCommun from '../../SectionStyleCommun.module.css';

export default function EnfantItem() {
    const idEnfant = useParams().id;
    const token = useSelector(state => state.auth.token);
    const navigate = useNavigate();
    const [APIState, setAPIState] = useState({
        loading: false,
        error: false,
        data: undefined
    });
    const [messageToDisplay, setMessageToDisplay] = useState("");
    const codeUser = useSelector(state => state.auth.codeUser);
    const [searchParams, setSearchParams] = useSearchParams();
    const defaultIndexOnglet = Number(searchParams.get('indexOngletSelected'));
    const [indexOngletSelected, setIndexOngletSelected] = useState(defaultIndexOnglet || 0);

    function handleClickAjouterTransmissionBtn() {
        navigate(`/addTransmissionMatin?idEnfant=${APIState.data.id}`, {state: {enfant: APIState.data}});
    }

    function handleClickBtnAjouterAutorisationParentale() {
        navigate(`/addAutorisationParentale?idEnfant=${APIState.data.id}`, {state: {enfant: APIState.data}});
    }

    function handleClickBtnModifierTransmission() {
        navigate(`/updateTransmissionMatin?idEnfant=${APIState.data.id}`, {state: {enfant: APIState.data}});
    }

    function handleClickBtnModifierAutorisationParentale() {
        navigate(`/updateAutorisationParentale?idEnfant=${APIState.data.id}`, {state: {enfant: APIState.data}});
    }

    useEffect(() => {
        searchParams.set('indexOngletSelected', indexOngletSelected);
        setSearchParams(searchParams);
        setAPIState({loading: true, error: false, data: undefined});
        fetch(`${import.meta.env.VITE_APP_SERV}/api/enfant/${idEnfant}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if(!response.ok) {
                if(response.status === 401) {
                    // Sauvegarder la dernière route visitée avant déconnexion automatique (si déconnexion automatique)
                    searchParams.set('indexOngletSelected', indexOngletSelected);
                    ///On met à jour l'url
                    setSearchParams(searchParams);
                    localStorage.setItem("lastVisitedPage", `${location.pathname}${location.search}`);
                    navigate("/");
                }
                return response.json().then(messageError => {
                    throw Error(messageError.message || messageError.error || "Erreur inattendu");
                })
            }
            return response.json();
        })
        .then(responseData => {
            const enfant = responseData.data;
            setAPIState({loading: false, error: false, data: enfant});
        })
        .catch((erreur) => {
            setAPIState({loading: false, error: true, data: undefined});
            setMessageToDisplay(erreur.message);
            setTimeout(() => {
                setMessageToDisplay("");
            }, 7000);
        })
    }, [token, navigate, idEnfant, searchParams, setSearchParams, indexOngletSelected]);

  return (
    <>
    {messageToDisplay != "" && (<p style={{ color: "red", padding: 10 }}>{messageToDisplay}</p>)}
    {APIState.loading 
    ? 
    (
    <div className={enfantItemStyle.loadingContainer}>
    <img className={indexStyle.spinner} style={{ backgroundColor: "gray" }} src="/icones/spinner.svg" />
    </div>
    )
    :
    (
      <div className={enfantItemStyle.enfantContainer}>
        <div className={enfantItemStyle.photoContainer}>
           <img className={enfantItemStyle.img_enfant_employe} src={APIState?.data?.photo ? `${import.meta.env.VITE_APP_SERV}${APIState.data.photo}` : `${import.meta.env.VITE_APP_SERV}/storage/asset/images/enfants/Photo_defaut.jpg`} alt="photo" />
           <div className={enfantItemStyle.civiliteEnfantContainer}>
              <p>{APIState?.data?.nom?.toUpperCase()}</p>
              <p>{APIState?.data?.prenom}</p>
              {APIState?.data?.date_naissance && (
                <p>Date de naissance : {new Date(APIState.data.date_naissance).toLocaleDateString("fr-FR")}</p>
            )}
           </div>
        </div>
        <div className={enfantItemStyle.ongletsContainer}>
            <div className={`${sectionStyleCommun.ongletItem} ${indexOngletSelected === 0 ? sectionStyleCommun.hasFocus : ""}`} onClick={() => setIndexOngletSelected(0)}><p>Transmission du matin</p></div>
            <div className={`${sectionStyleCommun.ongletItem} ${indexOngletSelected === 1 ? sectionStyleCommun.hasFocus : ""}`} onClick={() => setIndexOngletSelected(1)}><p>Transmission du soir</p></div>
            <div className={`${sectionStyleCommun.ongletItem} ${indexOngletSelected === 2 ? sectionStyleCommun.hasFocus : ""}`} onClick={() => setIndexOngletSelected(2)}><p>Autorisation parentale</p></div>
        </div>
        <div className={enfantItemStyle.contentOngletContainer}>
            {indexOngletSelected === 0 && (
                <div>
                    <div className={enfantItemStyle.reveilContainer}>
                        <h3>Réveil</h3>
                        <p>⌚ : <span className={enfantItemStyle.data}>{APIState?.data?.transmissionMatin?.heure_reveil ? APIState.data.transmissionMatin.heure_reveil?.slice(0, 5) : "Non renseignée"}</span></p>
                    </div>
                    <div className={enfantItemStyle.repasContainer}>
                        <h3>Répas</h3>
                        <p>Prise de répas : <span className={enfantItemStyle.data}>{APIState?.data?.transmissionMatin?.prise_de_repas == 1 ? "Oui" : (APIState?.data?.transmissionMatin?.prise_de_repas == 0 ? "Non" : "Non renseigné")}</span></p>
                        <p>🍼 : <span className={enfantItemStyle.data}>{APIState?.data?.transmissionMatin?.quantite_biberon ? `${APIState?.data?.transmissionMatin?.quantite_biberon} ml` : "Non renseigné"}</span></p>
                    </div>
                    <div className={enfantItemStyle.santeContainer}>
                        <h3>Santé</h3>
                        <p>État de santé : <span className={enfantItemStyle.data}>{APIState?.data?.transmissionMatin?.bonne_sante == 1 ? "Bon" : (APIState?.data?.transmissionMatin?.bonne_sante == 0 ? "Mauvais" : "Non renseigné")}</span></p>
                        <p>Doliprane : <span className={enfantItemStyle.data}>{APIState?.data?.transmissionMatin?.doliprane ? "Oui" : "Non"}</span></p>
                        <p>⌚ : <span className={enfantItemStyle.data}>{APIState?.data?.transmissionMatin?.heure_prise_doliprane ? APIState.data.transmissionMatin.heure_prise_doliprane.slice(0, 5) : "Non renseignée"}</span></p>
                    </div>
                    <div className={enfantItemStyle.observationContainer}>
                        <h3>Observation</h3>
                        <p><span className={enfantItemStyle.data}>{APIState?.data?.transmissionMatin?.observation ? APIState?.data?.transmissionMatin?.observation : "Pas d'observation"}</span></p>
                    </div>
                    {(codeUser != "AP" || codeUser == "IN" || codeUser == "EJ" || codeUser == "AE") && (
                        <div className={enfantItemStyle.btnsContainer}>
                            {!APIState?.data?.transmissionMatin && (
                                <div className={enfantItemStyle.btnAjouterContainer}>
                                   <button className={enfantItemStyle.btnAjouter} onClick={handleClickAjouterTransmissionBtn}>Ajouter transmission</button>
                                </div>
                            )}
                            {APIState?.data?.transmissionMatin && (
                                <div className={enfantItemStyle.btnModifierContainer}>
                                    <button className={enfantItemStyle.btnModifier} onClick={handleClickBtnModifierTransmission}>Modifier transmission</button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
            {indexOngletSelected === 2 && (
                <div>
                    <div className={enfantItemStyle.parentsContainer}>
                        <h3>Parent ayant donné les autorisation :</h3>
                        {APIState?.data?.autorisations_parentales?.id_Parent 
                        ? 
                        (
                            <div className={enfantItemStyle.parentItem}>
                                <ul>
                                    <li>
                                        Nom : <span className={enfantItemStyle.data}>{APIState?.data?.parents?.find(parent => parent.id === APIState.data.autorisations_parentales.id_Parent)?.nom || "Non renseigné"}</span>
                                    </li>
                                    <li>
                                        Prénom : <span className={enfantItemStyle.data}>{APIState?.data?.parents?.find(parent => parent.id === APIState.data.autorisations_parentales.id_Parent)?.prenom}</span>
                                    </li>
                                    <li>
                                        Profession : <span className={enfantItemStyle.data}>{APIState?.data?.parents?.find(parent => parent.id === APIState.data.autorisations_parentales.id_Parent)?.profession || "Non renseigné"}</span>
                                    </li>
                                    <li>
                                        Téléphone : <span className={enfantItemStyle.data}>{APIState?.data?.parents?.find(parent => parent.id === APIState.data.autorisations_parentales.id_Parent)?.telephone || "Non renseigné"}</span>
                                    </li>
                                </ul>
                            </div>
                        )
                        :
                        (<p><span className={enfantItemStyle.data}>Non renseignés</span></p>)
                        }
                    </div>
                    <div className={enfantItemStyle.reprsentantEnfantContainer}> 
                        <h3>Personnes autorisées à récupérer l&apos;enfant :</h3>
                        {APIState?.data?.parents?.map(parent => (
                                    <div key={parent.id} className={enfantItemStyle.representantItem}>
                                        <h4>{parent.nom} {parent.prenom}</h4>
                                        <p>Date de naissance : {parent.dateNaissance != null ? <span className={enfantItemStyle.data}>{new Date(parent.dateNaissance).toLocaleDateString("fr-FR")}</span> : "Non renseigné"}</p>
                                        <p>Lien parenté : <span className={enfantItemStyle.data}>Parent</span></p>
                                        <p>Téléphone : {parent.telephone != null ? (<span className={enfantItemStyle.data}>{parent.telephone}</span>) : "Non renseigné"}</p>
                                    </div>
                        ))}
                        {APIState?.data?.representants_legaux.length > 0 && (
                            <div>
                                {APIState?.data?.representants_legaux.map(personne => (
                                    <div key={personne.id} className={enfantItemStyle.representantItem}>
                                        <h4>{personne.nom} {personne.prenom}</h4>
                                        <p>Date de naissance : {personne?.dateNaissance != null ? (<span className={enfantItemStyle.data}>{personne.dateNaissance}</span>) : "Non renseigné"}</p>
                                        <p>Lien parenté : {personne?.lien_parente != null ? (<span className={enfantItemStyle.data}>{personne.lien_parente}</span>) : "Non renseigné"}</p>
                                        <p>Téléphone : {personne?.telephone != null ? (<span className={enfantItemStyle.data}>{personne.telephone}</span>) : "Non renseigné"}</p>
                                    </div>
                                ))}
                            </div>)
                        }
                        {(APIState?.data?.parents?.length == 0 && APIState?.data?.representants_legaux?.length == 0) && (
                            <p className={enfantItemStyle.data}>Aucun</p>
                        )}
                    </div>
                    <div className={enfantItemStyle.autorisationsContainer}>
                        <h3>Autorisations :</h3>
                        <p>Administration d&apos;antipyrétique : <span className={enfantItemStyle.data}>{(APIState?.data?.autorisations_parentales?.administration_antipyretique == 1) || (APIState?.data?.autorisations_parentales?.administration_antipyretique == 0) ? (`${APIState.data.autorisations_parentales.administration_antipyretique == 1 ? "Oui" : "Non"}`) : "Non renseignée"}</span></p>
                        <p>Administration de soins : <span className={enfantItemStyle.data}>{(APIState?.data?.autorisations_parentales?.administration_soin == 1) || (APIState?.data?.autorisations_parentales?.administration_soin == 0) ? (`${APIState.data.autorisations_parentales.administration_soin == 1 ? "Oui" : "Non"}`) : "Non renseignée"}</span></p>
                        <p>Autorisation de sortie : <span className={enfantItemStyle.data}>{(APIState?.data?.autorisations_parentales?.autorisation_sortie == 1) || (APIState?.data?.autorisations_parentales?.autorisation_sortie == 0) ? (`${APIState.data.autorisations_parentales.autorisation_sortie == 1 ? "Oui" : "Non"}`) : "Non renseignée"}</span></p>
                        <p>Prise de photos/vidéos : <span className={enfantItemStyle.data}>{(APIState?.data?.autorisations_parentales?.autorisation_photo_video == 1) || (APIState?.data?.autorisations_parentales?.autorisation_photo_video == 0) ? (`${APIState.data.autorisations_parentales.autorisation_photo_video == 1 ? "Oui" : "Non"}`) : "Non renseignée"}</span></p>
                        <p>Maquillage : <span className={enfantItemStyle.data}>{(APIState?.data?.autorisations_parentales?.autorisation_maquillage == 1) || (APIState?.data?.autorisations_parentales?.autorisation_maquillage == 0) ? (`${APIState.data.autorisations_parentales.autorisation_maquillage == 1 ? "Oui" : "Non"}`) : "Non renseignée"}</span></p>
                    </div>
                    <div className={enfantItemStyle.btnsContainer}>
                        {!APIState.data?.autorisations_parentales && 
                            <div className={enfantItemStyle.btnAjouterContainer}>
                            <button className={enfantItemStyle.btnAjouter} onClick={handleClickBtnAjouterAutorisationParentale}>Ajouter une autorisation</button>
                            </div>
                        }
                        {APIState.data?.autorisations_parentales && 
                            <div className={enfantItemStyle.btnModifierContainer}>
                               <button className={enfantItemStyle.btnModifier} onClick={handleClickBtnModifierAutorisationParentale}>Modifier les autorisations</button>
                            </div>
                        }
                    </div>
                </div>
            )}
        </div>
        {
            ((codeUser == "DR") || (codeUser == "DA")) && (
                <div className={enfantItemStyle.btnEnfantContainer}>
                    <button className={`${enfantItemStyle.btnEnfantItem} ${enfantItemStyle.btnModifier}`}>Modifier infos enfant</button>
                    <button className={`${enfantItemStyle.btnEnfantItem} ${enfantItemStyle.btnChangerSection}`}>Changer l&apos;enfant de section</button>
                    <button className={`${enfantItemStyle.btnEnfantItem} ${enfantItemStyle.btnSupprimer}`}>Supprimer enfant</button>
                </div>
            )
        }
      </div>
    )
    }
    </>
  )
}