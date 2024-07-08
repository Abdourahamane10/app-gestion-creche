import inputConnexionStyle from "./InputConnexion.module.css"
export default function InputConnexion() {
  return (
    <>
        <label htmlFor="identifiant_personnel">Identifiant personnel</label>
        <input id="identifiant_personnel" type="text" className={inputConnexionStyle.identifiant_personnel} placeholder="Identifiant personnel"/>
    </>
  )
}