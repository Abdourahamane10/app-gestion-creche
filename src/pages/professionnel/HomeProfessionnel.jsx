import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MainPrincipal from "../../components/mains/mainPrincipal/MainPrincipal";
// import homeProfessionnelStyle from "./HomeProfessionnel.module.css";
import mainPrincipalStyle from "../../components/mains/mainPrincipal/MainPrincipal.module.css"

export default function HomeProfessionnel() {
  return (
    <div className={mainPrincipalStyle.home_container}>
      <Header />
      <main className={mainPrincipalStyle.main_container}>
        <MainPrincipal />
      </main>
      <Footer />
    </div>
  )
}