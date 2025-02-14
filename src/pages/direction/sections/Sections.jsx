import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { getSectionReducer } from "../../../features/sectionSlice";

import indexStyle from "../../../index.module.css";
import adminStyle from "./Sections.module.css";

export default function Sections() {

    const listeSections = useSelector(state => state.listeSections.sections);
    const token = useSelector(state => state.auth.token);

    const navigate = useNavigate();

    const [SectionAPIState, setSectionAPIState] = useState({
        loading: false,
        error: false,
        data: undefined
    });

    const dispatch = useDispatch();

    useEffect(() => {
      setSectionAPIState({loading: true, error: false, data: undefined});
      fetch(`${import.meta.env.VITE_API_SERV}/api/section`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        if(!response.ok){
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
        const sections = responseData.data;
        dispatch(getSectionReducer(sections));
        setSectionAPIState({loading: false, error: false, data: responseData});
      })
      .catch(() => {
        setSectionAPIState({loading: false, error: true, data: undefined});
      });
    }, [token, dispatch, navigate]);

    function handleClickAddSectionBtn() {
      navigate('/addSection');
    }

  return (
    <div className={adminStyle.sectionMain}>
      <h2 className={adminStyle.sections}>Sections</h2>
      {SectionAPIState.loading ? (
        <div className={adminStyle.loadingContainer}>
          <img className={indexStyle.spinner} style={{ backgroundColor: "darkgray" }} src="/icones/spinner.svg" />
        </div>
      ) : 
      listeSections.length > 0 && (
        <div className={adminStyle.sectionsContainer}>
          {listeSections.map((section) => (
            <div key={section.id} className={adminStyle.sectionCard}>
              <h3 className={adminStyle.sectionName}>{section.nom_section}</h3>
              <p className={adminStyle.sectionItem}>{`Nombre d'enfants : ${section.enfants.length}`}</p>
              <p className={adminStyle.sectionItem}>{`Nombre de professionnelles : ${section.employes.length}`}</p>
              <p className={adminStyle.sectionItem}>Référent de section : <span className={adminStyle.sectionItemReferentName}>{section.referent? section.referent.nom: ""} {section.referent? section.referent.prenom : ""}</span></p>
            </div>
          ))}
        </div>
      )}
     <button className={adminStyle.addSectionBtn} onClick={handleClickAddSectionBtn}>Ajouter une section</button>
    </div>
  )
}