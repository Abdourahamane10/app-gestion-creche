import Service from "./service/Service";
import Entreprise from "./entreprise/Entreprise";
//import Logo from "./logo/Logo";
import loginStyle from "./Login.module.css";
import ConnexionBtn from "../../components/boutons/ConnexionBtn";

export default function Login() {
  return (
    <div className={loginStyle.loginContainer}>
      <div className={loginStyle.loginFormContainer}>
        {/* <Logo/> */}
        <form className={loginStyle.loginForm}>
          <Entreprise/>
          <Service/>
          <ConnexionBtn/>
        </form>
      </div>
    </div>
  )
}