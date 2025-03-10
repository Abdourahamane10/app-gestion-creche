import Logo from "./logo/Logo";
import loginPersonnelStyle from "./LoginPersonnel.module.css"
import ConnexionBtn from "../../components/boutons/connexionBtn/ConnexionBtn";
import IdentifiantPersonnel from "./indentifiantPersonnel/IdentifiantPersonnel";
import PasswordPersonnel from "./passwordPersonnel/PasswordPersonnel";
import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { loginReducer } from "../../features/authSlice";
import indexStyle from "../../index.module.css"

export default function LoginPersonnel() {
  const [identifiantPersonnel, setIdentifiantPersonnel] = useState("");
  const [passwordPersonnel, setPasswordPersonnel] = useState("");
  const [formSubmited, setFormSubmited] = useState(false);
  const identifiantPersonnelRef = useRef();
  const passwordPersonnelRef = useRef();
  const navigate = useNavigate();
  const [messageError, setMessageError] = useState("");
  const [infosConnexionAPIState, setInfosConnexionAPIState] = useState({
    loading: false,
    error: false,
    data: undefined
  });
  const dispatch = useDispatch();

  const location = useLocation();
  const dataNavigationUrl = location.state || {};

  function handleSubmit(e){
    e.preventDefault();
    setFormSubmited(true);
    const identifiantPersonnelValue = identifiantPersonnelRef.current.value;
    const passwordPersonnelValue = passwordPersonnelRef.current.value;
    setIdentifiantPersonnel(identifiantPersonnelValue);
    setPasswordPersonnel(passwordPersonnelValue);

    if(!identifiantPersonnelValue || !passwordPersonnelValue){
      return;
    }
    setInfosConnexionAPIState({...infosConnexionAPIState, loading: true});

    fetch(`${import.meta.env.VITE_APP_SERV}/api/login`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: identifiantPersonnelValue,
        password: passwordPersonnelValue,
        database: dataNavigationUrl.database,
        tableAuth: dataNavigationUrl.tableAuth
      })
    })
    .then(response => {
      if(!response.ok){
        if(response.status == 400){
          throw Error("Email ou mot de passe incorrect!");
        }
        else if(response.status == 401){
          throw Error("Utilisateur inconnu!");
        }
        else {
          throw Error(`${response.status}`);
        }
      }
      return response.json();
    })
    .then(responseData => {
      setInfosConnexionAPIState({loading: false, error: false, data: responseData});
      if(responseData.data.access_token && responseData.data.code_user && responseData.data.user_connected){
        const token = responseData.data.access_token;
        const codeUser = responseData.data.code_user;
        const userConnected = responseData.data.user_connected;
        dispatch(loginReducer({token, codeUser, userConnected}));
        navigate('/accueil');
      }
      else {
        navigate('/');
      }
    })
    .catch(erreur => {
      setInfosConnexionAPIState({loading: false, error: true, data: undefined});
      setMessageError(erreur.message);
    })
  }

  return (
    <div className={loginPersonnelStyle.loginContainer}>
      <div className={loginPersonnelStyle.loginFormContainer}>
        <Logo/>
        {infosConnexionAPIState.error && (<p className={indexStyle.errorAppelApi}>{messageError}</p>)}
        <form className={loginPersonnelStyle.loginForm} onSubmit={(e) => handleSubmit(e)}>
        <IdentifiantPersonnel identifiantPersonnelRef={identifiantPersonnelRef} />
        {(!identifiantPersonnel && formSubmited) && (<p className={loginPersonnelStyle.errorValidation}>Champ obligatoire!</p>)}
        <PasswordPersonnel passwordPersonnelRef={passwordPersonnelRef} />
        {(!passwordPersonnel && formSubmited) && (<p className={loginPersonnelStyle.errorValidation}>Champ obligatoire!</p>)}
        <ConnexionBtn loading={infosConnexionAPIState.loading} />
        </form>
      </div>
    </div>
  )
}