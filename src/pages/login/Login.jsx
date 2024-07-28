import Service from "./service/Service";
import Entreprise from "./entreprise/Entreprise";
//import Logo from "./logo/Logo";
import loginStyle from "./Login.module.css";
import ConnexionBtn from "../../components/boutons/ConnexionBtn";
import { useRef } from "react";
import { useState } from "react";

export default function Login() {

  const identifiantEntrepriseRef = useRef();
  const codeServiceRef = useRef();
  const [identifiantEntreprise, setIdentifiantEntreprise] = useState("");
  const [codeService, setCodeService] = useState("");
  const [isClickedSubmit, setIsClickedSubmit] = useState(false);

  function handleSubmit(e){
    e.preventDefault();
    setIdentifiantEntreprise(identifiantEntrepriseRef.current.value);
    setCodeService(codeServiceRef.current.value);
    setIsClickedSubmit(true);
  }

  return (
    <div className={loginStyle.loginContainer}>
      <div className={loginStyle.loginFormContainer}>
        {/* <Logo/> */}
        <form className={loginStyle.loginForm} onSubmit={(e) => handleSubmit(e)}>
          <Entreprise identifiantEntrepriseRef={identifiantEntrepriseRef} />
          {(!identifiantEntreprise && isClickedSubmit) && (<p className={loginStyle.errorValidation}>Champ obligatoire!</p>)}
          <Service codeServiceRef={codeServiceRef} />
          {(!codeService && isClickedSubmit) && (<p className={loginStyle.errorValidation}>Champ obligatoire!</p>)}
          <ConnexionBtn/>
        </form>
      </div>
    </div>
  )
}