import entrepriseStyle from "./Entreprise.module.css"
export default function Entreprise() {
  return (
    <>
    <label htmlFor="entreprise">Identifiant de la société</label>
    <input id="entreprise" type="text" className={entrepriseStyle.entrepriseInput} placeholder="Identifiant de la société..." />
    </>
  )
}