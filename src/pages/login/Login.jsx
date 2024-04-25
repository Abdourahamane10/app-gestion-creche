import Service from "./service/Service";
import Entreprise from "./entreprise/Entreprise";

export default function Login() {
  return (
    <div>
      <form>
        <Entreprise/>
        <Service/>
      </form>
    </div>
  )
}