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
          <a href="#">Section1</a>
          <a href="#">Section2</a>
          <a href="#">Section3</a>
        </div>
        <DeconnexionBtn />
    </header>
    </>
  )
}