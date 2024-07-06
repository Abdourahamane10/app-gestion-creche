import connectionBtnStyle from "./ConnexionBtn.module.css"
export default function ConnexionBtn() {
  return (
    <div className={connectionBtnStyle.containerBtnConnexion}>
    <button className={connectionBtnStyle.connexionBtn}>Se connecter</button>
    </div>
  )
}