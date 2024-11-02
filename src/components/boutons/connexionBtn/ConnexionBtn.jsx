import PropTypes from 'prop-types'

import connectionBtnStyle from "./ConnexionBtn.module.css"
import indexStyle from "../../../index.module.css"

export default function ConnexionBtn({loading}) {
  return (
    <div className={connectionBtnStyle.containerBtnConnexion}>
    <button className={connectionBtnStyle.connexionBtn}>
    {loading && (<img className={indexStyle.spinner} style={{ color: 'blue' }} src="/icones/spinner.svg" />)}
      Se connecter
      </button>
    </div>
  )
}

ConnexionBtn.propTypes = {
  loading: PropTypes.bool,
}