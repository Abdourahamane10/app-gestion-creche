import serviceStyle from "./Service.module.css"
import PropTypes from 'prop-types'
export default function Service({codeServiceRef}) {
  return (
    <>
    <label htmlFor="service" className={serviceStyle.labelService}>Code du service</label>
    <input id="service" ref={codeServiceRef} type="text" className={serviceStyle.serviceInput} placeholder="Code du service..." />
    </>
  )
}

Service.propTypes = {
  codeServiceRef: PropTypes.object.isRequired,
};