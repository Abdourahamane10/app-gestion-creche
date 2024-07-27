import serviceStyle from "./Service.module.css"
export default function Service() {
  return (
    <>
    <label htmlFor="service">Code du service</label>
    <input id="service" type="text" className={serviceStyle.serviceInput} placeholder="Code du service..." />
    </>
  )
}