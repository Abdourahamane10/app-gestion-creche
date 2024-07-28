import entrepriseStyle from "./Entreprise.module.css"
import PropTypes from 'prop-types';

export default function Entreprise({identifiantEntrepriseRef}) {
  
  return (
    <>
    <label htmlFor="entreprise" >Identifiant de la société</label>
    <input id="entreprise" ref={identifiantEntrepriseRef} type="text" className={entrepriseStyle.entrepriseInput} placeholder="Identifiant de la société..." />
    </>
  )
}

Entreprise.propTypes = {
  identifiantEntrepriseRef: PropTypes.object.isRequired,
};