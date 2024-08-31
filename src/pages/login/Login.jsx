import Service from "./service/Service";
import Entreprise from "./entreprise/Entreprise";
//import Logo from "./logo/Logo";
import loginStyle from "./Login.module.css";
import ConnexionBtn from "../../components/boutons/ConnexionBtn";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import indexStyle from "../../index.module.css"

export default function Login() {

  const identifiantEntrepriseRef = useRef();
  const codeServiceRef = useRef();
  const [identifiantEntreprise, setIdentifiantEntreprise] = useState("");
  const [codeService, setCodeService] = useState("");
  const [isClickedSubmit, setIsClickedSubmit] = useState(false);
  const navigate = useNavigate();
  const [APIState, setAPIState] = useState({
    loading: false,
    error: false,
    data: undefined
  });
  const [messageError, setMessageError] = useState("");

  function handleSubmit(e){
    e.preventDefault();
    setIsClickedSubmit(true);
    //Vérification des champs s'ils sont renseignés avant d'appeler l'API
    const identifiantEntrepriseValue = identifiantEntrepriseRef.current.value;
    const codeServiceValue = codeServiceRef.current.value;
    if(!identifiantEntrepriseValue || !codeServiceValue){
      return;
    }

    setIdentifiantEntreprise(identifiantEntrepriseValue);
    setCodeService(codeServiceValue);

    setAPIState({...APIState, loading: true});

    fetch("http://127.0.0.1:8000/api/loginSociete", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        codeSociete: identifiantEntrepriseValue,
        codeService: codeServiceValue
      }),
    })
    .then(response => {
      if(!response.ok){
        if(response.status == 400){
          throw Error("Identifiant de la société ou code du service manquant!");
        }
        else if(response.status == 401){
          throw Error("Société inconnue!");
        }
        else if(response.status == 500){
          throw Error("Echec de la connexion à la base de données!");
        }
        else {
          throw Error(`${response.status}`);
        }
      }
      return response.json();
    })
    .then(responseData => {
      setAPIState({loading: false, error: false, data: responseData});
      navigate('/login', {state: {database: responseData.data.database, tableAuth: responseData.data.tableAuth}});
    })
    .catch((erreur) => {
      setAPIState({loading: false, error: true, data: undefined})
      setMessageError(erreur.message)
    })
  }

  return (
    <div className={loginStyle.loginContainer}>
      <div className={loginStyle.loginFormContainer}>
        {/* <Logo/> */}
        {APIState.error && (<p className={indexStyle.errorAppelApi}>{messageError}</p>)}
        <form className={loginStyle.loginForm} onSubmit={(e) => handleSubmit(e)}>
          <Entreprise identifiantEntrepriseRef={identifiantEntrepriseRef} />
          {(!identifiantEntreprise && isClickedSubmit) && (<p className={loginStyle.errorValidation}>Champ obligatoire!</p>)}
          <Service codeServiceRef={codeServiceRef} />
          {(!codeService && isClickedSubmit) && (<p className={loginStyle.errorValidation}>Champ obligatoire!</p>)}
          <ConnexionBtn loading={APIState.loading} />
          {/* {APIState.loading && (<img className={loginStyle.spinner} src="/icones/spinner.svg" />)} */}
        </form>
      </div>
    </div>
  )
}