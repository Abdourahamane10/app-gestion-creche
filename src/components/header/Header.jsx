import { Link } from "react-router-dom"

import DeconnexionBtn from "../boutons/deconnexionBtn/DeconnexionBtn"
import SideBar from "../sideBar/SideBar"
import headerStyle from "./Header.module.css"
export default function Header() {
  return (
    <>
    <header className={headerStyle.headerPrincipal}>
        <SideBar />
        <div className={headerStyle.toggler_container}>
            <button>
                <img src="icones/envelope-icon.jpg" alt="toggle menu" />
            </button>
        </div>
        <div className={headerStyle.sections_container}>
          {/* On utilisera <Link to="url"> au lieu des <a></a> pour éviter les rechargement de la page */}
          <Link to="#">
            <span className={headerStyle.sectionName}>Section1</span>
            <span className={headerStyle.sectionCount}>12</span>
          </Link>
          <Link to="#">
            <span className={headerStyle.sectionName}>Section2</span>
            <span className={headerStyle.sectionCount}>20</span>
          </Link>
          <Link to="#">
            <span className={headerStyle.sectionName}>Section3</span>
            <span className={headerStyle.sectionCount}>15</span>
          </Link>
        </div>
        <DeconnexionBtn />
    </header>
    </>
  )
}