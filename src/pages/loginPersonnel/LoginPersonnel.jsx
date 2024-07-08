import Logo from "./logo/Logo";
import loginPersonnelStyle from "./LoginPersonnel.module.css"
import InputConnexion from "./inputConnexion/InputConnexion";
import ConnexionBtn from "../../components/boutons/ConnexionBtn";
export default function LoginPersonnel() {
  return (
    <div className={loginPersonnelStyle.loginContainer}>
      <div className={loginPersonnelStyle.loginFormContainer}>
        <Logo/>
        <form className={loginPersonnelStyle.loginForm}>
        <InputConnexion/>
        <ConnexionBtn/>
        </form>
      </div>
    </div>
  )
}