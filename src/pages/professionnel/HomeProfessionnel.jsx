import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MainProfessionnel from "../../components/mains/mainProfessionnel/MainProfessionnel";
import homeProfessionnelStyle from "./HomeProfessionnel.module.css";

export default function HomeProfessionnel() {
  return (
    <div className={homeProfessionnelStyle.home_container}>
      <Header />
      <main className={homeProfessionnelStyle.main_container}>
        <MainProfessionnel />
      </main>
      <Footer />
    </div>
  )
}