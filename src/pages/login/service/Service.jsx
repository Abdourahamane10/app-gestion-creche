import serviceStyle from "./Service.module.css"
export default function Service() {
  return (
    <>
    <label htmlFor="service">Identifiant de service</label>
    <input id="service" type="text" className={serviceStyle.serviceInput} placeholder="Identifiant de service..." />
    </>
  )
}