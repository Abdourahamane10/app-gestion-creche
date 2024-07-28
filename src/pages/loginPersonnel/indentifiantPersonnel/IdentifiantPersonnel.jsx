import inputConnexionStyle from "./IdentifiantPersonnel.module.css"
import PropTypes from 'prop-types'
export default function IdentifiantPersonnel({identifiantPersonnelRef}) {
  return (
    <>
        <label htmlFor="identifiant_personnel">Identifiant</label>
        <input id="identifiant_personnel" ref={identifiantPersonnelRef} type="text" className={inputConnexionStyle.identifiant_personnel} placeholder="Identifiant personnel..."/>
    </>
  )
}

IdentifiantPersonnel.propTypes = {
  identifiantPersonnelRef: PropTypes.shape({ current: PropTypes.any }).isRequired,
};