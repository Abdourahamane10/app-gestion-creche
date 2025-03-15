import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import DeconnexionBtn from "../boutons/deconnexionBtn/DeconnexionBtn"
import SideBar from "../sideBar/SideBar"
import headerStyle from "./Header.module.css"
import { getSectionReducer } from "../../features/sectionSlice";
import indexStyle from '../../index.module.css';
import { setIdSectionSelectedReducer } from "../../features/sectionSlice";

export default function Header() {

  const token = useSelector(state => state.auth.token);

  const listeSections = useSelector(state => state.listeSections.sections);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [APIState, setAPIState] = useState({
    loading: false,
    error: false,
    data: undefined
  });

  const idSectionNavigated = useSelector(state => state.listeSections.idSectionSelected);
  const divsRefs = useRef([]);

  function handleClickSection(idSection) {
    dispatch(setIdSectionSelectedReducer(idSection));
  }

  useEffect(() => {
    setAPIState({loading: true, error: false, data: undefined});
    fetch(`${import.meta.env.VITE_APP_SERV}/api/section`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
    .then(response => {
      if(!response.ok) {
        if(response.status == 401){
          // Sauvegarder la dernière route visitée avant déconnexion automatique (si déconnexion automatique)
          localStorage.setItem("lastVisitedPage", window.location.pathname);
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
      setAPIState({loading: false, error: false, data: responseData});
    })
    .catch(() => {
      setAPIState({loading: false, error: true, data: undefined});
    })
  }, [token, navigate, dispatch]);

  return (
    <>
    <header className={headerStyle.headerPrincipal}>
        <SideBar />
        <div className={headerStyle.toggler_container}>
            <button>
                <img src="/icones/envelope-icon.jpg" alt="toggle menu" />
            </button>
        </div>
        {APIState.loading 
        ? (
            <div className={headerStyle.sections_container}>
              <img className={indexStyle.spinner} style={{ color: "blue" }} src="/icones/spinner.svg" />
            </div>
          )
        :
        listeSections.length > 0 && (
            <div className={headerStyle.sections_container}>
              {listeSections.map((section, index) => (
                <NavLink onClick={() => handleClickSection(section.id)} ref={(el) => (divsRefs.current[index] = el)} className={idSectionNavigated === section.id ? headerStyle.activeLink : ""} to={`/section/${section.id}`} key={section.id}>
                <span className={headerStyle.sectionName}>Section {section.nom_section}</span>
                <span className={headerStyle.sectionCount}>{section.enfants.length}</span>
                </NavLink>
              ))}
            </div>
        )}
        <DeconnexionBtn />
    </header>
    </>
  )
}