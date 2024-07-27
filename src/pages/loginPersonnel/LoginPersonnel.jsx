import Logo from "./logo/Logo";
import loginPersonnelStyle from "./LoginPersonnel.module.css"
import ConnexionBtn from "../../components/boutons/ConnexionBtn";
import IdentifiantPersonnel from "./indentifiantPersonnel/IdentifiantPersonnel";
import PasswordPersonnel from "./passwordPersonnel/PasswordPersonnel";
export default function LoginPersonnel() {
  return (
    <div className={loginPersonnelStyle.loginContainer}>
      <div className={loginPersonnelStyle.loginFormContainer}>
        <Logo/>
        <form className={loginPersonnelStyle.loginForm}>
        <IdentifiantPersonnel/>
        <PasswordPersonnel/>
        <ConnexionBtn/>
        </form>
      </div>
    </div>
  )
}