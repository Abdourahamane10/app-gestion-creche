import Service from "./service/Service";
import Entreprise from "./entreprise/Entreprise";
import loginStyle from "./Login.module.css"

export default function Login() {
  return (
    <div className={loginStyle.loginContainer}>
      <form className={loginStyle.loginForm}>
        <Entreprise/>
        <Service/>
      </form>
    </div>
  )
}