import { useState } from "react"
import { useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom";

import indexStyle from '../../../../../index.module.css';
import transmissionStyleCommun from '../TransmissionStyleCommun.module.css';

export default function AddTransmissionMatin() {
    const token = useSelector(state => state.auth.token);
    const userConnected = useSelector(state => state.auth.userConnected);
    const navigate = useNavigate();
    const location = useLocation();
    
    const enfant = location.state?.enfant;
    const parentsOfEnfant = enfant?.parents;

    const [transmissionValues, setTransmissionValues] = useState({
        heureReveil: "00:00",
        quantiteBiberon: 0,
        heurePriseDoliprane: "00:00",
        observation: ""
    })
    
    const [transmissionChecks, setTransmissionChecks] = useState({
        priseRepas: "",
        bonneSante: "",
        priseDoliprane: false
    })
    const optionsPriseRepas = ["oui", "non"];
    const optionsBonneSante = ["oui", "non"];

    const [idParentSelected, setIdParentSelected] = useState("");

    const [messageToDisplay, setMessageToDisplay] = useState("");
    const [messageSuccess, setMessageSucces] = useState(false);
    const [APIState, setAPIState] = useState({
        loading: false,
        error: false,
        data: undefined
    });

    const [alerte, setAlerte] = useState({
        alertePriseRepas: false,
        alerteBonneSante: false
    });

    function handleChangeTransmissionValues(event) {
        const {name, value} = event.target;
        setTransmissionValues({...transmissionValues, [name]: value});
    }

    function handleChangeTransmissionChecks(event) {
        const {name, value, type, checked} = event.target;
        setTransmissionChecks({...transmissionChecks, [name]: type === "checkbox" ? checked : value});
    }

    function handleParentChange(event) {
        const idParent = event.target.value;
        setIdParentSelected(idParent);
    }

    function handleSubmit(e) {
        e.preventDefault();
        setAlerte({
            alertePriseRepas: transmissionChecks.priseRepas === "",
            alerteBonneSante: transmissionChecks.bonneSante === ""
        });

        if (alerte.alertePriseRepas || alerte.alerteBonneSante) {
            return;
        }

        if(userConnected === null || userConnected.idEmploye === null) {
            navigate('/');
        }
        setAPIState({loading: true, error: false, data: undefined});
        fetch(`${import.meta.env.VITE_APP_SERV}/api/transmissionMatin`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                dateTransmissionMatin: new Date().toISOString().split('T')[0],
                heureReveil: transmissionValues.heureReveil,
                priseDeRepas: transmissionChecks.priseRepas === "oui" ? Number(1) : (transmissionChecks.priseRepas === "non" ? Number(0) : null),
                quantiteBiberonMatin: transmissionChecks.priseRepas === "oui" ? Number(transmissionValues.quantiteBiberon) : null,
                bonneSante: transmissionChecks.bonneSante === "oui" ? Number(1) : (transmissionChecks.bonneSante === "non" ? Number(0) : null),
                doliprane: transmissionChecks.bonneSante === "non" ? (transmissionChecks.priseDoliprane ? Number(1) : Number(0)) : null,
                heureDoliprane: transmissionChecks.priseDoliprane ? transmissionValues.heurePriseDoliprane : null,
                obsTransMatin: transmissionValues.observation,
                idEmploye: userConnected.idEmploye,
                idParent: Number(idParentSelected),
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
                    throw new Error(data.message || JSON.stringify(data.errors) || "Une erreur est survenue lors de l'enregistrement de la transmission");
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
            setMessageSucces(true);
            const id = enfant?.id;
            navigate(`/enfant/${id}`);
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
    <>
        <h3 className={transmissionStyleCommun.title}>Ajout d&apos;une transmission matinale</h3>
        <form onSubmit={handleSubmit}>
            <div className={transmissionStyleCommun.inputContainer}>
                <label htmlFor="heureReveil">Heure du réveil</label>
                <input id="heureReveil" name="heureReveil" value={transmissionValues.heureReveil} type="time" onChange={handleChangeTransmissionValues} />
            </div>
            <div className={`${transmissionStyleCommun.inputContainer} ${transmissionStyleCommun.optionsPriseRepas}`}>
                <label>Prise de repas : </label>
                {optionsPriseRepas.map((option) => (
                    <div key={option} className={transmissionStyleCommun.optionPriseRepas}>
                        <label htmlFor={option}>{option}</label>
                        <input id={option} name="priseRepas" type="radio" value={option} onChange={handleChangeTransmissionChecks} />
                    </div>
                ))}
                {alerte.alertePriseRepas && (
                    <p className={transmissionStyleCommun.messageAlerte}>Un des champs doit être sélectionné</p>
                )}
            </div>
            {transmissionChecks.priseRepas === "oui" && (
                <div className={transmissionStyleCommun.inputContainer}>
                    <label htmlFor="quantite">Quantité du biberon</label>
                    <input id="quantite" name="quantiteBiberon" value={transmissionValues.quantiteBiberon} type="number" min={0} onChange={handleChangeTransmissionValues} />
                </div>
            )}
            <div className={`${transmissionStyleCommun.inputContainer} ${transmissionStyleCommun.optionsBonneSante}`}>
                <label>En bonne santé : </label>
                {optionsBonneSante.map((option) => (
                    <div key={option}>
                        <label htmlFor={option}>{option}</label>
                        <input id={option} name="bonneSante" type="radio" value={option} onChange={handleChangeTransmissionChecks} />
                    </div>
                ))}
                {alerte.alerteBonneSante && (
                    <p className={transmissionStyleCommun.messageAlerte}>Un des champs doit être sélectionné</p>
                )}
            </div>
            {transmissionChecks.bonneSante === "non" && (
                <div className={transmissionStyleCommun.inputContainer}>
                    <label htmlFor="doliprane">Doliprane</label>
                    <input id="doliprane" type="checkbox" name="priseDoliprane" checked={transmissionChecks.priseDoliprane} onChange={handleChangeTransmissionChecks} />
                </div>
            )}
            {(transmissionChecks.bonneSante === "non" && transmissionChecks.priseDoliprane) && (
                <div className={transmissionStyleCommun.inputContainer}>
                    <label htmlFor="heurePriseDoliprane">Heure de prise du doliprane</label>
                    <input id="heurePriseDoliprane" type="time" name="heurePriseDoliprane" value={transmissionValues.heurePriseDoliprane} onChange={handleChangeTransmissionValues} />
                </div>
            )}
            <div className={transmissionStyleCommun.inputContainer}>
                <label htmlFor="observation">Observation</label>
                <textarea id="observation" name="observation" value={transmissionValues.observation} onChange={handleChangeTransmissionValues} placeholder="Observation..."></textarea>
            </div>
            <div className={transmissionStyleCommun.inputContainer}>
                <label htmlFor="parent">Parent auteur de la transmission</label>
                <select id="parent" value={idParentSelected} onChange={handleParentChange}>
                    <option value="" disabled> Sélectiionnez le parent auteur de  la transmission</option>
                    {parentsOfEnfant?.map(parent => (
                        <option key={parent.id} value={parent.id}>{parent.nom} {parent.prenom}</option>
                    ))}
                </select>
                {(parentsOfEnfant === null || parentsOfEnfant?.length == 0) && (
                    <p className={transmissionStyleCommun.messageAlerte}>Veuillez créer d&apos;abord le(s) parent(s)</p>
                )}
            </div>
            <div>
                <label htmlFor="employe">Professionnelle</label>
                <input id="employe" type="text" value={`${userConnected.nomEmploye} ${userConnected.prenomEmploye}`} disabled />
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
    </>
  )
}