import passwordStyle from "./PasswordPersonnel.module.css"
export default function PasswordPersonnel() {
  return (
    <>
        <label htmlFor="passwordPersonnel">Mot de passe</label>
        <input id="passwordPersonnel" type="password" className={passwordStyle.password_input} placeholder="Mot de passe personnel..." />
    </>
  )
}