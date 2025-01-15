import { useState } from 'react';
import addEnfantStyle from './AddEnfant.module.css';

export default function AddEnfant() {

    const [sexeSelected, setSexeSelected] = useState("");

    const [checkboxes, setCheckboxes] = useState({
        feculents: false,
        legumes: false,
        fruits: false,
        poulet: false,
        viande: false,
        poisson: false,
        porc: false
    });

    const [heureSelected, setHeureSelected] = useState({
        arriveeLundi: "00:00",
        arriveeMardi: "00:00",
        arriveeMercredi: "00:00",
        arriveeJeudi: "00:00",
        arriveeVendredi: "00:00",
        sortieLundi: "00:00",
        sortieMardi: "00:00",
        sortieMercredi: "00:00",
        sortieJeudi: "00:00",
        sortieVendredi: "00:00"
    });

    function handleSexeChange(event) {
        const sexe = event.target.value;
        setSexeSelected(sexe);
    }

    function handleChangeCheckbox(event) {
        const {name, checked} = event.target;
        setCheckboxes({...checkboxes, [name]: checked});
    }

    function handleChangeHeure(event) {
        const {name, value} = event.target;
        setHeureSelected({...heureSelected, [name]: value});
    }

  return (
    <div>
        <h3 className={addEnfantStyle.title}>Ajout d&apos;un enfant</h3>
        <form>
            <div className={addEnfantStyle.inputContainer}>
                <label htmlFor="nom">Nom</label>
                <input id="nom" type="text" />
            </div>
            <div className={addEnfantStyle.inputContainer}>
                <label htmlFor="prenom">Prenom</label>
                <input id="prenom" type="text" />
            </div>
            <div className={`${addEnfantStyle.inputContainer} ${addEnfantStyle.dateNaissanceContainer}`}>
                <label htmlFor="prenom">Date de naissance</label>
                <input id="prenom" type="date" />
            </div>
            <div className={addEnfantStyle.inputContainer}>
                <label htmlFor="sexe">Sexe</label>
                <select className={addEnfantStyle.addEnfantSelect} id="sexe" value={sexeSelected} onChange={handleSexeChange}>
                    <option value="" disabled>Séléctionnez le sexe</option>
                    <option value="M">M</option>
                    <option value="F">F</option>
                </select>
            </div>
            <div className={`${addEnfantStyle.inputContainer} ${addEnfantStyle.checkboxContainer}`}>
                <label className={addEnfantStyle.labelCheckbox} htmlFor="feculents">Féculent</label>
                <input id="feculents" type="checkbox" name='feculents' checked={checkboxes.feculents} onChange={handleChangeCheckbox} />
            </div>
            <div className={`${addEnfantStyle.inputContainer} ${addEnfantStyle.checkboxContainer}`}>
                <label className={addEnfantStyle.labelCheckbox} htmlFor="legumes">Légumes</label>
                <input id="legumes" type="checkbox" name='legumes' checked={checkboxes.legumes} onChange={handleChangeCheckbox} />
            </div>
            <div className={`${addEnfantStyle.inputContainer} ${addEnfantStyle.checkboxContainer}`}>
                <label className={addEnfantStyle.labelCheckbox} htmlFor="fruits">Fruits</label>
                <input id="fruits" type="checkbox" name='fruits' checked={checkboxes.fruits} onChange={handleChangeCheckbox} />
            </div>
            <div className={`${addEnfantStyle.inputContainer} ${addEnfantStyle.checkboxContainer}`}>
                <label className={addEnfantStyle.labelCheckbox} htmlFor="poulet">Poulet</label>
                <input id="poulet" type="checkbox" name='poulet' checked={checkboxes.poulet} onChange={handleChangeCheckbox} />
            </div>
            <div className={`${addEnfantStyle.inputContainer} ${addEnfantStyle.checkboxContainer}`}>
                <label className={addEnfantStyle.labelCheckbox} htmlFor="viande">Viande</label>
                <input id="viande" type="checkbox" name='viande' checked={checkboxes.viande} onChange={handleChangeCheckbox} />
            </div>
            <div className={`${addEnfantStyle.inputContainer} ${addEnfantStyle.checkboxContainer}`}>
                <label className={addEnfantStyle.labelCheckbox} htmlFor="poisson">Poisson</label>
                <input id="poisson" type="checkbox" name='poisson' checked={checkboxes.poisson} onChange={handleChangeCheckbox} />
            </div>
            <div className={`${addEnfantStyle.inputContainer} ${addEnfantStyle.checkboxContainer}`}>
                <label className={addEnfantStyle.labelCheckbox} htmlFor="porc">Porc</label>
                <input id="porc" type="checkbox" name='porc' checked={checkboxes.porc} onChange={handleChangeCheckbox} />
            </div>
            <div className={`${addEnfantStyle.inputContainer} ${addEnfantStyle.heureContainerInput}`}>
                <label htmlFor="arriveeLundi">Heure d&apos;arrivée lundi</label>
                <input id="arriveeLundi" name='arriveeLundi' type="time" value={heureSelected.arriveeLundi} onChange={handleChangeHeure} />
            </div>
            <div className={`${addEnfantStyle.inputContainer} ${addEnfantStyle.heureContainerInput}`}>
                <label htmlFor="arriveeMardi">Heure d&apos;arrivée mardi</label>
                <input id="arriveeMardi" name='arriveeMardi' type="time" value={heureSelected.arriveeLundi} onChange={handleChangeHeure} />
            </div>
            <div className={`${addEnfantStyle.inputContainer} ${addEnfantStyle.heureContainerInput}`}>
                <label htmlFor="arriveeMercredi">Heure d&apos;arrivée mercredi</label>
                <input id="arriveeMercredi" name='arriveeMercredi' type="time" value={heureSelected.arriveeLundi} onChange={handleChangeHeure} />
            </div>
            <div className={`${addEnfantStyle.inputContainer} ${addEnfantStyle.heureContainerInput}`}>
                <label htmlFor="arriveeJeudi">Heure d&apos;arrivée jeudi</label>
                <input id="arriveeJeudi" name='arriveeJeudii' type="time" value={heureSelected.arriveeLundi} onChange={handleChangeHeure} />
            </div>
            <div className={`${addEnfantStyle.inputContainer} ${addEnfantStyle.heureContainerInput}`}>
                <label htmlFor="arriveeVendredi">Heure d&apos;arrivée vendredi</label>
                <input id="arriveeVendredi" name='arriveeVendredi' type="time" value={heureSelected.arriveeLundi} onChange={handleChangeHeure} />
            </div>
            <div className={`${addEnfantStyle.inputContainer} ${addEnfantStyle.heureContainerInput}`}>
                <label htmlFor="sortieLundi">Heure de sortie lundi</label>
                <input id="sortieLundi" name='sortieLundi' type="time" value={heureSelected.sortieLundi} onChange={handleChangeHeure} />
            </div>
            <div className={`${addEnfantStyle.inputContainer} ${addEnfantStyle.heureContainerInput}`}>
                <label htmlFor="sortieMardi">Heure de sortie mardi</label>
                <input id="sortieMardi" name='sortieMardi' type="time" value={heureSelected.sortieMardi} onChange={handleChangeHeure} />
            </div>
            <div className={`${addEnfantStyle.inputContainer} ${addEnfantStyle.heureContainerInput}`}>
                <label htmlFor="sortieMercredi">Heure de sortie mercredi</label>
                <input id="sortieMercredi" name='sortieMercredi' type="time" value={heureSelected.sortieMercredi} onChange={handleChangeHeure} />
            </div>
            <div className={`${addEnfantStyle.inputContainer} ${addEnfantStyle.heureContainerInput}`}>
                <label htmlFor="sortieJeudi">Heure de sortie jeudi</label>
                <input id="sortieJeudi" name='sortieJeudii' type="time" value={heureSelected.sortieJeudi} onChange={handleChangeHeure} />
            </div>
            <div className={`${addEnfantStyle.inputContainer} ${addEnfantStyle.heureContainerInput}`}>
                <label htmlFor="sortieVendredi">Heure de sortie vendredi</label>
                <input id="sortieVendredi" name='sortieVendredi' type="time" value={heureSelected.sortieVendredi} onChange={handleChangeHeure} />
            </div>
            <div className={`${addEnfantStyle.inputContainer} ${addEnfantStyle.photoInputContainer}`}>
                <label htmlFor="photo">Photo</label>
                <input id="photo" type="file" />
            </div>
            <button className={addEnfantStyle.btnValider}>Valider</button>
        </form>
    </div>
  )
}