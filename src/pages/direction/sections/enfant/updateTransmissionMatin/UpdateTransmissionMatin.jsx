import { useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { useSelector } from "react-redux";

import indexStyle from '../../../../../index.module.css';
import transmissionStyleCommun from '../TransmissionStyleCommun.module.css';

export default function UpdateTransmissionMatin() {
    const location = useLocation();
    const navigate = useNavigate();
    const token = useSelector(state => state.auth.token);
    let enfant = location?.state?.enfant;
    const [searchParams] = useSearchParams();
    const idEnfant = searchParams.get('idEnfant');

    if(!enfant) {
        fetch(`${import.meta.env.VITE_APP_SERV}/api/enfant/${idEnfant}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            return response.json().then(data => {
                console.log("Réponse complète de l'API :", data); // <-- Ajoute ce log ici
                if (!response.ok) {
                    if (response.status === 401) {
                        // Sauvegarder la dernière route visitée avant déconnexion automatique (si déconnexion automatique)
                        localStorage.setItem("lastVisitedPage", `${location.pathname}${location.search}`);
                        navigate('/');
                    }
                    throw new Error(data.message || JSON.stringify(data.errors) || "Une erreur est survenue lors de l'enfant");
                }
                return data;
            });
        })
        .then(responseData => {
            enfant = responseData.data;
        })
        .catch(() => {
            localStorage.setItem("lastVisitedPage", window.location.pathname);
            navigate('/');
        });
    }

    const transmissionMatinale = enfant?.transmissionMatin;
    const parentsOfEnfant = enfant?.parents;
    const optionsPriseRepas = [
        { label: "oui", value: "1" },
        { label: "non", value: "0" },
    ];
    const optionsSante = [
        { label: "oui", value: "1" },
        { label: "non", value: "0" },
    ];
    const userConnected = useSelector(state => state.auth.userConnected);
    const [valuesToSave, setValuesToSave] = useState({
        heureReveil: transmissionMatinale?.heure_reveil ? transmissionMatinale.heure_reveil : "",
        priseRepas: transmissionMatinale?.prise_de_repas != null ? String(transmissionMatinale.prise_de_repas) : "",
        bonneSante: transmissionMatinale?.bonne_sante != null ? String(transmissionMatinale.bonne_sante) : "",
        priseDoliprane: transmissionMatinale?.doliprane != null ? transmissionMatinale.doliprane : "",
        heurePriseDoliprane: transmissionMatinale?.heure_prise_doliprane ? transmissionMatinale.heure_prise_doliprane : "",
        observation: transmissionMatinale?.observation ? transmissionMatinale.observation : "",
        quantiteBiberon: transmissionMatinale?.quantite_biberon ? transmissionMatinale.quantite_biberon : "",
        idParentSelected: transmissionMatinale?.parent?.id
    });

    const [messageToDisplay, setMessageToDisplay] = useState("");
    const [messageSuccess, setMessageSuccess] = useState(false);
    const [APIState, setAPIState] = useState({
        loading: false,
        error: false,
        data: undefined
    })

    function handleChangeValuesToSave(event) {
        const {name, value, type, checked} = event.target;
        setValuesToSave({...valuesToSave, [name]: type === "checkbox" ? checked : value});
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log("value to save :", valuesToSave);

        if(userConnected == null || userConnected.idEmploye == null) {
            navigate('/');
        }

        setAPIState({...APIState, loading: true});
        fetch(`${import.meta.env.VITE_APP_SERV}/api/transmissionMatin/${transmissionMatinale?.id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                dateTransmissionMatin: new Date().toISOString().split('T')[0],
                heureReveil: valuesToSave.heureReveil != "" ? valuesToSave.heureReveil : null,
                priseDeRepas: valuesToSave.priseRepas != "" ? Number(valuesToSave.priseRepas) : null,
                quantiteBiberonMatin: valuesToSave.quantiteBiberon != "" ? Number(valuesToSave.quantiteBiberon) : null,
                bonneSante: valuesToSave.bonneSante != "" ? Number(valuesToSave.bonneSante) : null,
                doliprane: valuesToSave.priseDoliprane != "" ? valuesToSave.priseDoliprane : null,
                heureDoliprane: valuesToSave.heurePriseDoliprane != "" ? valuesToSave.heurePriseDoliprane : null,
                obsTransMatin: valuesToSave.observation != "" ? valuesToSave.observation : null,
                idEmploye: userConnected?.idEmploye,
                idParent: valuesToSave.idParentSelected ? Number(valuesToSave.idParentSelected) : null,
                idEnfant: enfant?.id
            })
        })
        .then(response => {
            return response.json().then(data => {
                console.log("Réponse complète de l'API :", data); // <-- Ajoute ce log ici
                if (!response.ok) {
                    if (response.status === 401) {
                        // Sauvegarder la dernière route visitée avant déconnexion automatique (si déconnexion automatique)
                        localStorage.setItem("lastVisitedPage", window.location.pathname);
                        navigate('/');
                    }
                    throw new Error(data.message || JSON.stringify(data.errors) || "Une erreur est survenue lors de la modification de la transmission");
                }
                return data;
            });
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
    }

  return (
    <div>
        <h3 className={transmissionStyleCommun.title}>Modification de la transmission matinale</h3>
        <form onSubmit={handleSubmit}>
            <div className={transmissionStyleCommun.inputContainer}>
                <label htmlFor="heureReveil">Heure de reveil</label>
                <input id="heureReveil" type="time" name="heureReveil" value={valuesToSave.heureReveil} onChange={handleChangeValuesToSave} />
            </div>
            <div className={`${transmissionStyleCommun.inputContainer} ${transmissionStyleCommun.optionsPriseRepas}`}>
                <label>Prise de repas : </label>
                {optionsPriseRepas.map(option => (
                    <div key={option.value}>
                        <label htmlFor={`priseRepas-${option.label}`}>{option.label}</label>
                        <input id={`priseRepas-${option.label}`} type="radio" name="priseRepas" value={option.value} checked={String(valuesToSave.priseRepas) === String(option.value)} onChange={handleChangeValuesToSave} />
                    </div>
                ))}
            </div>
            {/* {alerte.alertePriseRepas && (
                <p className={transmissionStyleCommun.messageAlerte}>Un des champs doit être sélectionné</p>
            )} */}
            {valuesToSave.priseRepas == 1 && (
                <div className={transmissionStyleCommun.inputContainer}>
                    <label htmlFor="quantite">Quantité du biberon</label>
                    <input id="quantite" type="number" min={0} name="quantiteBiberon" value={valuesToSave.quantiteBiberon} onChange={handleChangeValuesToSave} />
                </div>
            )}
            <div className={`${transmissionStyleCommun.inputContainer} ${transmissionStyleCommun.optionsBonneSante}`}>
                <label>En bonne santé</label>
                {optionsSante.map(option => (
                    <div key={option.value}>
                        <label htmlFor={`bonneSante-${option.label}`}>{option.label}</label>
                        <input id={`bonneSante-${option.label}`} type="radio" name="bonneSante" value={option.value} checked={valuesToSave.bonneSante == option.value} onChange={handleChangeValuesToSave} />
                    </div>
                ))}
            </div>
            {/* {alerte.alerteBonneSante && (
                <p className={transmissionStyleCommun.messageAlerte}>Un des champs doit être sélectionné</p>
            )} */}
            {valuesToSave.bonneSante == 0 && (
                <div className={transmissionStyleCommun.inputContainer}>
                    <label htmlFor="priseDoliprane">Doliprane</label>
                    <input id="priseDoliprane" type="checkbox" name="priseDoliprane" checked={valuesToSave.priseDoliprane == 1} onChange={handleChangeValuesToSave} />
                </div>
            )}
            {(valuesToSave.bonneSante == 0 && valuesToSave.priseDoliprane == 1) && (
                <div className={transmissionStyleCommun.inputContainer}>
                    <label htmlFor="heurePriseDoliprane">Heure de prise du doliprane</label>
                    <input id="heurePriseDoliprane" type="time" name="heurePriseDoliprane" value={valuesToSave.heurePriseDoliprane} onChange={handleChangeValuesToSave} />
                </div>
            )}
            <div className={transmissionStyleCommun.inputContainer}>
                <label htmlFor="observation">Observation</label>
                <textarea name="observation" id="observation" value={valuesToSave.observation} onChange={handleChangeValuesToSave}></textarea>
            </div>
            <div className={transmissionStyleCommun.inputContainer}>
                <label htmlFor="parent">Parent auteur de la transmission</label>
                <select name="idParentSelected" id="parent" value={valuesToSave.idParentSelected} onChange={handleChangeValuesToSave}>
                    {parentsOfEnfant?.map(parent => (
                        <option key={parent.id} value={parent.id}>{parent.nom} {parent.prenom}</option>
                    ))}
                </select>
            </div>
            <div className={transmissionStyleCommun.inputContainer}>
                <label htmlFor="employe">Professionnelle</label>
                <input id="employe" type="text" value={`${userConnected?.nomEmploye} ${userConnected?.prenomEmploye}`} disabled />
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