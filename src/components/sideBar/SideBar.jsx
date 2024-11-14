import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import sideBarStyle from "./SideBar.module.css";

export default function SideBar() {

  const codeUser = useSelector(state => state.auth.codeUser);

  return (
    <aside className={sideBarStyle.sideBar}>
      {((codeUser == "DR") || (codeUser == "DA")) ? (
        <>
        <div className={sideBarStyle.item_direction}>
        <Link to="#">
          Menus
        </Link>
      </div>
      <div className={sideBarStyle.item_direction}>
        <Link to="#">
          Activités
        </Link>
      </div>
      <div className={sideBarStyle.item_direction}>
        <Link to="#">
          Évènements
        </Link>
      </div>
      <div className={sideBarStyle.item_direction}>
        <Link to="#">
          Gestion des sections
        </Link>
      </div>
        </>
    ) : (
      <>
      <div className={sideBarStyle.item_prof}>
        <Link to="#">
          <img src="PhotosProfessionnelles/Photo_defaut.jpg" alt="Photo professionnelle" />
          <p>Professionnelle1</p>
        </Link>
      </div>
      <div className={sideBarStyle.item_prof}>
        <Link to="#">
          <img src="PhotosProfessionnelles/Photo_defaut.jpg" alt="Photo professionnelle" />
          <p>Professionnelle2</p>
        </Link>
      </div>
      </>
    )}
    </aside>
  )
}