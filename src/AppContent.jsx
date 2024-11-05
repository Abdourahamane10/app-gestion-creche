import { Routes, Route, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"

import Login from "./pages/login/Login"
import LoginPersonnel from "./pages/loginPersonnel/LoginPersonnel"
import HomeProfessionnel from "./pages/professionnel/HomeProfessionnel"
import HomeDirection from "./pages/direction/HomeDirection"
import appContentStyle from "./AppContent.module.css"
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"

export default function AppContent() {
    const codeUser = useSelector(state => state.auth.codeUser);

    const location = useLocation();
  
    // Définissons les routes où Header, Footer, et les conteneurs ne doivent pas être affichés
    const hideHeaderFooterAndContainers = location.pathname === "/" || location.pathname === "/login";
  
    return (
      <>
        {hideHeaderFooterAndContainers ? (
          <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/login" element={<LoginPersonnel/>}/>
          </Routes>
        ) : (
        <div className={appContentStyle.home_container}>
          <Header />
          <main className={appContentStyle.main_container}>
            <Routes>
              <Route path="/" element={<Login/>}/>
              <Route path="/login" element={<LoginPersonnel/>}/>
              <Route path="/accueil" element={((codeUser == "DR" || codeUser == "DA") && (<HomeDirection />)) || ((codeUser == "AP" || codeUser == "IN" || codeUser == "EJ" || codeUser == "AE") && (<HomeProfessionnel />))} />
            </Routes>
          </main>
          <Footer />
        </div>
        )}
      </>
    )
}