import connectionBtnStyle from "./ConnexionBtn.module.css"
import PropTypes from 'prop-types'

export default function ConnexionBtn({loading}) {
  return (
    <div className={connectionBtnStyle.containerBtnConnexion}>
    <button className={connectionBtnStyle.connexionBtn}>
    {loading && (<img className={connectionBtnStyle.spinner} src="/icones/spinner.svg" />)}
      Se connecter
      </button>
    </div>
  )
}

ConnexionBtn.propTypes = {
  loading: PropTypes.shape({current: PropTypes.any}),
}