import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MainPrincipal from "../../components/mains/mainPrincipal/MainPrincipal";
// import homeDirectionStyle from "./HomeDirection.module.css"
import mainPrincipalStyle from "../../components/mains/mainPrincipal/MainPrincipal.module.css"

export default function HomeDirection() {
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