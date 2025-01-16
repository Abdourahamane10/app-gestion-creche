import { useState } from "react";
import passwordStyle from "./PasswordPersonnel.module.css"
import PropTypes from 'prop-types'

export default function PasswordPersonnel({passwordPersonnelRef}) {

  const [passwordVisible, setPasswordVisible] = useState(false);

  function handleClickEye() {
    setPasswordVisible(!passwordVisible);
  }
  return (
    <>
        <label htmlFor="passwordPersonnel" className={passwordStyle.labelPassword}>Mot de passe</label>
        <div className={passwordStyle.inputPasswordContainer}>
          <input id="passwordPersonnel" ref={passwordPersonnelRef} type={passwordVisible ? "text" : "password"} className={passwordStyle.password_input} placeholder="Mot de passe personnel..." />
          <span onClick={handleClickEye} className={passwordStyle.eyeIcone} aria-label={passwordVisible ? "Masquer le mot de passe" : "Afficher le mot de passe"}>{passwordVisible ? "👁️" : "👁️‍🗨️"}</span>
      </div>
    </>
  )
}

PasswordPersonnel.propTypes = {
  passwordPersonnelRef: PropTypes.shape({current : PropTypes.any}).isRequired,
};