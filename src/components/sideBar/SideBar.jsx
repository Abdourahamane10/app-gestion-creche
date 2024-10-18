import sideBarStyle from "./SideBar.module.css";

export default function SideBar() {
  return (
    <aside className={sideBarStyle.sideBar}>
      <div className={sideBarStyle.item_prof}>
        <a href="#">
          <img src="PhotosProfessionnelles/Photo_defaut.jpg" alt="Photo professionnelle" />
          <p>Professionnelle1</p>
        </a>
      </div>
      <div className={sideBarStyle.item_prof}>
        <a href="#">
          <img src="PhotosProfessionnelles/Photo_defaut.jpg" alt="Photo professionnelle" />
          <p>Professionnelle2</p>
        </a>
      </div>
    </aside>
  )
}