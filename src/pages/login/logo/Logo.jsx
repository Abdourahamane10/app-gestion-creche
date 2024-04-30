import logoStyle from "./Logo.module.css"
export default function Logo() {
  return (
    <div className={logoStyle.logo}>
        <img src="/logos/PetitsChaperonsRouges.jpeg" alt="logo societe" />
    </div>
  )
}