import Logo from "./logo/Logo";
import loginPersonnelStyle from "./LoginPersonnel.module.css"
import ConnexionBtn from "../../components/boutons/ConnexionBtn";
import IdentifiantPersonnel from "./indentifiantPersonnel/IdentifiantPersonnel";
import PasswordPersonnel from "./passwordPersonnel/PasswordPersonnel";
import { useRef, useState } from "react";

export default function LoginPersonnel() {
  const [identifiantPersonnel, setIdentifiantPersonnel] = useState("");
  const [passwordPersonnel, setPasswordPersonnel] = useState("");
  const [formSubmited, setFormSubmited] = useState(false);
  const identifiantPersonnelRef = useRef();
  const passwordPersonnelRef = useRef();

  function handleSubmit(e){
    e.preventDefault();
    setIdentifiantPersonnel(identifiantPersonnelRef.current.value);
    setPasswordPersonnel(passwordPersonnelRef.current.value);
    setFormSubmited(true);
  }

  return (
    <div className={loginPersonnelStyle.loginContainer}>
      <div className={loginPersonnelStyle.loginFormContainer}>
        <Logo/>
        <form className={loginPersonnelStyle.loginForm} onSubmit={(e) => handleSubmit(e)}>
        <IdentifiantPersonnel identifiantPersonnelRef={identifiantPersonnelRef} />
        {(!identifiantPersonnel && formSubmited) && (<p className={loginPersonnelStyle.errorValidation}>Champ obligatoire!</p>)}
        <PasswordPersonnel passwordPersonnelRef={passwordPersonnelRef} />
        {(!passwordPersonnel && formSubmited) && (<p className={loginPersonnelStyle.errorValidation}>Champ obligatoire!</p>)}
        <ConnexionBtn/>
        </form>
      </div>
    </div>
  )
}