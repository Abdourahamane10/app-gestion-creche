import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom"

import sectionItemStyle from './SectionItem.module.css';
import indexStyle from '../../../../index.module.css';

export default function SectionItem() {

    const params = useParams();

    const idSection = params?.id;

    const token = useSelector(state => state.auth.token);

    const navigate = useNavigate();

    const [APIState, setAPIState] = useState({
        loading: false,
        error: false,
        data: undefined
    });

    const [tabContentSection, setTabContentSection] = useState([[], []]);

    const [selectedElementTab, setSelectedElementTab] = useState(0);

    const codeUser = useSelector(state => state.auth.codeUser);

    function handleClickBtnAjouterEnfant() {
        navigate('/addEnfant');
    }

    useEffect(() => {
        setAPIState({loading: true, error: false, data: undefined});
        fetch(`http://127.0.0.1:8000/api/section/${idSection}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              }
        })
        .then(response => {
            if(!response.ok) {
                if(response.status == 401){
                    navigate('/');
                }
                return response.json().then(messageError => {
                    throw Error(messageError.message || messageError.rror || "Une erreur est survenue");
                });
            }
            return response.json();
        })
        .then(responseData => {
            const sectionData = responseData.data;
            setTabContentSection([sectionData.enfants, sectionData.employes]);
            setAPIState({loading: false, error: false, data: sectionData});
        })
        .catch(() => {
            setAPIState({loading: false, error: true, data: undefined});
        })
    }, [token, navigate, idSection]);

  return (
    <div className={sectionItemStyle.container}>
        <div className={sectionItemStyle.ongletContainer}>
                <div onClick={() => setSelectedElementTab(0)} className={sectionItemStyle.ongletItem}>Enfants</div>
                {((codeUser == "DR") || (codeUser == "DA")) && 
                (<div onClick={() => setSelectedElementTab(1)} className={sectionItemStyle.ongletItem}>Employés</div>)
                }
        </div>
        <div className={sectionItemStyle.photosContainer}>
            {APIState.loading 
            ? 
            <div className={sectionItemStyle.loadingContainer}>
                <img className={indexStyle.spinner} style={{ backgroundColor: "gray" }} src="/icones/spinner.svg" />
            </div>
            :
            tabContentSection[selectedElementTab].map(obj => (
                <div key={obj.id} className={sectionItemStyle.photoItem}>
                    <Link to={selectedElementTab == 0 ? `/enfant/${obj.id}` : `/employe/${obj.id}`}>
                    <img className={sectionItemStyle.img_enfant_employe} src="/PhotosProfessionnelles/Photo_defaut.jpg" alt="photo" />
                    </Link>
                    <p className={sectionItemStyle.prenomItem}>{obj.prenom}</p>
                </div>
            ))
            }
        </div>
        {selectedElementTab == 0 && 
        (<div className={sectionItemStyle.btnAjouter_enfant_employe_container}>
            <button className={sectionItemStyle.btnAjouter_enfant_employe} onClick={handleClickBtnAjouterEnfant}>Ajouter un enfant</button>
        </div>)}
        {selectedElementTab == 1 && 
        (<div className={sectionItemStyle.btnAjouter_enfant_employe_container}>
            <button className={sectionItemStyle.btnAjouter_enfant_employe}>Ajouter un employé</button>
        </div>)}
    </div>
  )
}