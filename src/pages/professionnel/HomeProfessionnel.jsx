import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MainProfessionnel from "../../components/mains/mainProfessionnel/MainProfessionnel";
import homeStyle from "./HomeProfessionnel.module.css";

export default function HomeProfessionnel() {
  return (
    <div className={homeStyle.home_container}>
      <Header />
      <main className={homeStyle.main_container}>
        <MainProfessionnel />
      </main>
      <Footer />
    </div>
  )
}