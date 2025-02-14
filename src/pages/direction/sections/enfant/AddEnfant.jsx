import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Select from 'react-select';

import addEnfantStyle from './AddEnfant.module.css';
import { setCategoriesAgeReducer } from '../../../../features/categorieAgeSlice';
import { setParentsReducer } from '../../../../features/parentSlice';
import indexStyle from '../../../../index.module.css';



export default function AddEnfant() {

    const [sexeSelected, setSexeSelected] = useState("");

    const location = useLocation();

    const idSection = location.state?.idSection;

    const [checkboxesAliments, setCheckboxesAliments] = useState({
        feculents: false,
        legumes: false,
        fruits: false,
        poulet: false,
        viande: false,
        poisson: false,
        porc: false
    });

    const [infosEnfant, setInfosEnfant] = useState({
        arriveeLundi: "00:00",
        arriveeMardi: "00:00",
        arriveeMercredi: "00:00",
        arriveeJeudi: "00:00",
        arriveeVendredi: "00:00",
        sortieLundi: "00:00",
        sortieMardi: "00:00",
        sortieMercredi: "00:00",
        sortieJeudi: "00:00",
        sortieVendredi: "00:00",
        nom: "",
        prenom: "",
        dateNaissance: "",
        photo: ""
    });

    function handleSexeChange(event) {
        const sexe = event.target.value;
        setSexeSelected(sexe);
    }

    function handleChangeCheckbox(event) {
        const {name, checked} = event.target;
        setCheckboxesAliments({...checkboxesAliments, [name]: checked});
    }

    function handleChangeInfosEnfant(event) {
        const {name, value, files} = event.target;
        if(name === "photo") {
            setInfosEnfant({...infosEnfant, [name]: files[0]});
        }
        else {
            setInfosEnfant({...infosEnfant, [name]: value});
        }
    }

    const categoriesAge = useSelector(state => state.categoriesAge.categoriesAge);
    const token = useSelector(state => state.auth.token);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [categorieAgeSelected, setCategorieAgeSelected] = useState("");

    function handleCategorieAgeChange(event) {
        const categorieAge = event.target.value;
        setCategorieAgeSelected(categorieAge);
    }

    const parents = useSelector(state => state.parents.parents);

    useEffect(() => {
        if(parents.length === 0) {
            fetch(`${import.meta.env.VITE_API_SERV}/api/parent`, {
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
                    })
                }
                return response.json();
            })
            .then(responseData => {
                const listeParents = responseData.data;
                dispatch(setParentsReducer(listeParents));
            })
            .catch(() => {
    
            })
        }
    }, [parents, token, dispatch, navigate]);

    useEffect(() => {
        if(categoriesAge.length === 0) {
            fetch(`${import.meta.env.VITE_API_SERV}/api/categorieAge`, {
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
                    })
                }
                return response.json();
            })
            .then(responseData => {
                const listeCategoriesAge = responseData.data;
                dispatch(setCategoriesAgeReducer(listeCategoriesAge));
            })
            .catch(() => {
    
            })
        }
    }, [categoriesAge, token, dispatch, navigate]);

    const optionsParents = parents
    .filter(parent => parent.id !== undefined && parent.nom && parent.prenom) // Filtrer les parents valides
    .map(parent => ({
      value: parent.id, 
      label: `${parent.nom} ${parent.prenom}`
    }));

    const [parentsSelected, setParentsSelected] = useState(null);

    const [APIStatePOST, setAPIStatePOST] = useState({
        loading: false,
        error: false,
        data: undefined
    });

    const [messageToDisplay, setMessageToDisplay] = useState("");

    const [messageSuccess, setMessageSucces] = useState(true);
    
    function handleParentsChange(optionsSelected) {
        if (!optionsSelected || optionsSelected.length === 0) {
            setParentsSelected([]);
        } else {
            // On mappe directement les ids des parents
            const tIdParentsSelected = optionsSelected.map(option => option.value);
            setParentsSelected(tIdParentsSelected);
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData();
        formData.append("nomEnfant", infosEnfant.nom);
        formData.append("prenomEnfant", infosEnfant.prenom);
        formData.append("dateNaissanceEnfant", infosEnfant.dateNaissance.replace(/\//g, "-"));
        formData.append("sexeEnfant", sexeSelected);
        formData.append("dateInscription", new Date().toISOString().split('T')[0]);
        formData.append("feculent", checkboxesAliments.feculents);
        formData.append("legume", checkboxesAliments.legumes);
        formData.append("fruit", checkboxesAliments.fruits);
        formData.append("poulet", checkboxesAliments.poulet);
        formData.append("viande", checkboxesAliments.viande);
        formData.append("poisson", checkboxesAliments.poisson);
        formData.append("porc", checkboxesAliments.porc);
        formData.append("idSection", idSection);
        formData.append("heureArriveeLundi", `${infosEnfant.arriveeLundi}`);
        formData.append("heureArriveeMardi", `${infosEnfant.arriveeMardi}`);
        formData.append("heureArriveeMercredi", `${infosEnfant.arriveeMercredi}`);
        formData.append("heureArriveeJeudi", `${infosEnfant.arriveeJeudi}`);
        formData.append("heureArriveeVendredi", `${infosEnfant.arriveeVendredi}`);
        formData.append("heureSortieLundi", `${infosEnfant.sortieLundi}`);
        formData.append("heureSortieMardi", `${infosEnfant.sortieMardi}`);
        formData.append("heureSortieMercredi", `${infosEnfant.sortieMercredi}`);
        formData.append("heureSortieJeudi", `${infosEnfant.sortieJeudi}`);
        formData.append("heureSortieVendredi", `${infosEnfant.sortieVendredi}`);
        formData.append("idCategorieAge", categorieAgeSelected);
        formData.append("photoEnfant", infosEnfant.photo);
        formData.append("parents", JSON.stringify(parentsSelected));       

        setAPIStatePOST({loading: true, error: false, data: undefined});
        fetch(`${import.meta.env.VITE_API_SERV}/api/enfant`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                "Accept": "application/json"
            },
            body: formData
        })
        .then(response => {
            if(!response.ok) {
                if(response.status === 401) {
                    navigate('/');
                }
                return response.json().then(messageError => {
                    throw Error(messageError.message || messageError.error || "Une erreur est survenue");
                });
            }
            return response.json();
        })
        .then(responseData => {
            const message = responseData.message;
            setMessageToDisplay(message);
            setTimeout(() => {
                setMessageToDisplay("");
            }, 7000);
            setAPIStatePOST({loading: false, error: false, data: responseData});
            navigate(`/section/${idSection}`);
        })
        .catch(erreur => {
            setMessageToDisplay(erreur.message);
            setTimeout(() => {
                setMessageToDisplay("");
            }, 7000);
            setAPIStatePOST({loading: false, error: true, data: undefined});
            setMessageSucces(false);
        })
    }

  return (
    <div>
        <h3 className={addEnfantStyle.title}>Ajout d&apos;un enfant dans la section {idSection}</h3>
        <form onSubmit={handleSubmit}>
            <div className={addEnfantStyle.inputContainer}>
                <label htmlFor="nom">Nom</label>
                <input id="nom" name='nom' type="text" value={infosEnfant.nom} onChange={handleChangeInfosEnfant} />
            </div>
            <div className={addEnfantStyle.inputContainer}>
                <label htmlFor="prenom">Prenom</label>
                <input id="prenom" name='prenom' type="text" value={infosEnfant.prenom} onChange={handleChangeInfosEnfant} />
            </div>
            <div className={`${addEnfantStyle.inputContainer} ${addEnfantStyle.dateNaissanceContainer}`}>
                <label htmlFor="dateNaissance">Date de naissance</label>
                <input id="dateNaissance" name='dateNaissance' type="date" value={infosEnfant.dateNaissance} onChange={handleChangeInfosEnfant} />
            </div>
            <div className={addEnfantStyle.inputContainer}>
                <label htmlFor="categoriesAge">Catégories d&apos;âge</label>
                <select className={addEnfantStyle.addEnfantSelect} id="categoriesAge" value={categorieAgeSelected} onChange={handleCategorieAgeChange}>
                    <option value="" disabled>Séléctionnez la catégorie d&apos;âge</option>
                    {categoriesAge.map(obj => (
                        <option key={obj.id} value={obj.id}>{obj.nom} ({obj.nombre_mois_min} à {obj.nombre_mois_max} mois)</option> 
                    ))}
                </select>
            </div>
            <div className={addEnfantStyle.inputContainer}>
                <label htmlFor="sexe">Sexe</label>
                <select className={addEnfantStyle.addEnfantSelect} id="sexe" value={sexeSelected} onChange={handleSexeChange}>
                    <option value="" disabled>Séléctionnez le sexe</option>
                    <option value="M">M</option>
                    <option value="F">F</option>
                </select>
            </div>
            <div>
                <p className={addEnfantStyle.titleCheckboxAliments}>Cochez ce que l&apos;enfant peut manger parmi les aliments proposés :</p>
                <div className={`${addEnfantStyle.inputContainer} ${addEnfantStyle.checkboxContainer}`}>
                    <label className={addEnfantStyle.labelCheckbox} htmlFor="feculents">Féculent</label>
                    <input id="feculents" type="checkbox" name='feculents' checked={checkboxesAliments.feculents} onChange={handleChangeCheckbox} />
                </div>
                <div className={`${addEnfantStyle.inputContainer} ${addEnfantStyle.checkboxContainer}`}>
                    <label className={addEnfantStyle.labelCheckbox} htmlFor="legumes">Légumes</label>
                    <input id="legumes" type="checkbox" name='legumes' checked={checkboxesAliments.legumes} onChange={handleChangeCheckbox} />
                </div>
                <div className={`${addEnfantStyle.inputContainer} ${addEnfantStyle.checkboxContainer}`}>
                    <label className={addEnfantStyle.labelCheckbox} htmlFor="fruits">Fruits</label>
                    <input id="fruits" type="checkbox" name='fruits' checked={checkboxesAliments.fruits} onChange={handleChangeCheckbox} />
                </div>
                <div className={`${addEnfantStyle.inputContainer} ${addEnfantStyle.checkboxContainer}`}>
                    <label className={addEnfantStyle.labelCheckbox} htmlFor="poulet">Poulet</label>
                    <input id="poulet" type="checkbox" name='poulet' checked={checkboxesAliments.poulet} onChange={handleChangeCheckbox} />
                </div>
                <div className={`${addEnfantStyle.inputContainer} ${addEnfantStyle.checkboxContainer}`}>
                    <label className={addEnfantStyle.labelCheckbox} htmlFor="viande">Viande</label>
                    <input id="viande" type="checkbox" name='viande' checked={checkboxesAliments.viande} onChange={handleChangeCheckbox} />
                </div>
                <div className={`${addEnfantStyle.inputContainer} ${addEnfantStyle.checkboxContainer}`}>
                    <label className={addEnfantStyle.labelCheckbox} htmlFor="poisson">Poisson</label>
                    <input id="poisson" type="checkbox" name='poisson' checked={checkboxesAliments.poisson} onChange={handleChangeCheckbox} />
                </div>
                <div className={`${addEnfantStyle.inputContainer} ${addEnfantStyle.checkboxContainer}`}>
                    <label className={addEnfantStyle.labelCheckbox} htmlFor="porc">Porc</label>
                    <input id="porc" type="checkbox" name='porc' checked={checkboxesAliments.porc} onChange={handleChangeCheckbox} />
                </div>
            </div>
            <div className={`${addEnfantStyle.inputContainer} ${addEnfantStyle.selectParentContainer}`}>
                <label htmlFor="parents">Parents</label>
                <Select 
                id='parents'
                className={addEnfantStyle.selectParents}
                options={optionsParents}
                value={optionsParents.filter(option => parentsSelected?.includes(option.value))}
                onChange={handleParentsChange}
                isMulti
                placeholder="Sélectionnez les parents s'ils sont présents, sinon créez les après"
                styles={{
                menu: (provided) => ({
                ...provided,
                position: 'absolute',
                zIndex: 1,
                marginTop: '4px',
                }),
                control: (provided) => ({
                ...provided,
                position: 'relative',
                }),
                }}
                menuPosition="absolute"
                menuPortalTarget={null} // Assurez-vous qu'aucun portail n'est utilisé
                />
            </div>
            <div className={`${addEnfantStyle.inputContainer} ${addEnfantStyle.heureContainerInput}`}>
                <label htmlFor="arriveeLundi">Heure d&apos;arrivée lundi</label>
                <input id="arriveeLundi" name='arriveeLundi' type="time" value={infosEnfant.arriveeLundi} onChange={handleChangeInfosEnfant} />
            </div>
            <div className={`${addEnfantStyle.inputContainer} ${addEnfantStyle.heureContainerInput}`}>
                <label htmlFor="arriveeMardi">Heure d&apos;arrivée mardi</label>
                <input id="arriveeMardi" name='arriveeMardi' type="time" value={infosEnfant.arriveeMardi} onChange={handleChangeInfosEnfant} />
            </div>
            <div className={`${addEnfantStyle.inputContainer} ${addEnfantStyle.heureContainerInput}`}>
                <label htmlFor="arriveeMercredi">Heure d&apos;arrivée mercredi</label>
                <input id="arriveeMercredi" name='arriveeMercredi' type="time" value={infosEnfant.arriveeMercredi} onChange={handleChangeInfosEnfant} />
            </div>
            <div className={`${addEnfantStyle.inputContainer} ${addEnfantStyle.heureContainerInput}`}>
                <label htmlFor="arriveeJeudi">Heure d&apos;arrivée jeudi</label>
                <input id="arriveeJeudi" name='arriveeJeudi' type="time" value={infosEnfant.arriveeJeudi} onChange={handleChangeInfosEnfant} />
            </div>
            <div className={`${addEnfantStyle.inputContainer} ${addEnfantStyle.heureContainerInput}`}>
                <label htmlFor="arriveeVendredi">Heure d&apos;arrivée vendredi</label>
                <input id="arriveeVendredi" name='arriveeVendredi' type="time" value={infosEnfant.arriveeVendredi} onChange={handleChangeInfosEnfant} />
            </div>
            <div className={`${addEnfantStyle.inputContainer} ${addEnfantStyle.heureContainerInput}`}>
                <label htmlFor="sortieLundi">Heure de sortie lundi</label>
                <input id="sortieLundi" name='sortieLundi' type="time" value={infosEnfant.sortieLundi} onChange={handleChangeInfosEnfant} />
            </div>
            <div className={`${addEnfantStyle.inputContainer} ${addEnfantStyle.heureContainerInput}`}>
                <label htmlFor="sortieMardi">Heure de sortie mardi</label>
                <input id="sortieMardi" name='sortieMardi' type="time" value={infosEnfant.sortieMardi} onChange={handleChangeInfosEnfant} />
            </div>
            <div className={`${addEnfantStyle.inputContainer} ${addEnfantStyle.heureContainerInput}`}>
                <label htmlFor="sortieMercredi">Heure de sortie mercredi</label>
                <input id="sortieMercredi" name='sortieMercredi' type="time" value={infosEnfant.sortieMercredi} onChange={handleChangeInfosEnfant} />
            </div>
            <div className={`${addEnfantStyle.inputContainer} ${addEnfantStyle.heureContainerInput}`}>
                <label htmlFor="sortieJeudi">Heure de sortie jeudi</label>
                <input id="sortieJeudi" name='sortieJeudi' type="time" value={infosEnfant.sortieJeudi} onChange={handleChangeInfosEnfant} />
            </div>
            <div className={`${addEnfantStyle.inputContainer} ${addEnfantStyle.heureContainerInput}`}>
                <label htmlFor="sortieVendredi">Heure de sortie vendredi</label>
                <input id="sortieVendredi" name='sortieVendredi' type="time" value={infosEnfant.sortieVendredi} onChange={handleChangeInfosEnfant} />
            </div>
            <div className={`${addEnfantStyle.inputContainer} ${addEnfantStyle.photoInputContainer}`}>
                <label htmlFor="photo">Photo</label>
                <input id="photo" name="photo" type="file" onChange={handleChangeInfosEnfant} />
            </div>
            <button className={addEnfantStyle.btnValider}>
                {APIStatePOST.loading && (<img className={indexStyle.spinner} style={{ color: 'green' }} src="/icones/spinner.svg" />)}
                Valider
            </button>
        </form>
        {messageToDisplay != "" && (<p style={{ color: `${messageSuccess ? "green" : "red"}`, padding: 10 }}>{messageToDisplay}</p>)}
    </div>
  )
}