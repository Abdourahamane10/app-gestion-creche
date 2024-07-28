import passwordStyle from "./PasswordPersonnel.module.css"
import PropTypes from 'prop-types'

export default function PasswordPersonnel({passwordPersonnelRef}) {
  return (
    <>
        <label htmlFor="passwordPersonnel" className={passwordStyle.labelPassword}>Mot de passe</label>
        <input id="passwordPersonnel" ref={passwordPersonnelRef} type="password" className={passwordStyle.password_input} placeholder="Mot de passe personnel..." />
    </>
  )
}

PasswordPersonnel.propTypes = {
  passwordPersonnelRef: PropTypes.shape({current : PropTypes.any}).isRequired,
};