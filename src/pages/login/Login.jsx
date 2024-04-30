import Service from "./service/Service";
import Entreprise from "./entreprise/Entreprise";
import Logo from "./logo/Logo";
import loginStyle from "./Login.module.css"

export default function Login() {
  return (
    <div className={loginStyle.loginContainer}>
      <div className={loginStyle.logoFormContainer}>
        <Logo/>
        <form className={loginStyle.loginForm}>
          <Entreprise/>
          <Service/>
        </form>
      </div>
    </div>
  )
}