import { Routes, Route, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"

import Login from "./pages/login/Login"
import LoginPersonnel from "./pages/loginPersonnel/LoginPersonnel"
import HomeProfessionnel from "./pages/professionnel/HomeProfessionnel"
import HomeDirection from "./pages/direction/home/HomeDirection"
import appContentStyle from "./AppContent.module.css"
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import UpdatePresentation from "./pages/direction/presentation/UpdatePresentation"
import UpdateProjetPedagogique from "./pages/direction/projetPedagogique/UpdateProjetPedagogique"
import UpdateReglement from "./pages/direction/reglement/UpdateReglement"
import Sections from "./pages/direction/sections/Sections"
import AddSection from "./pages/direction/sections/addSection/AddSection"
import AddTextesAdmin from "./pages/direction/AddTextesAdmin"
import SectionItem from "./pages/direction/sections/sectionItem/SectionItem"
import AddEnfant from "./pages/direction/sections/enfant/addEnfant/AddEnfant"
import EnfantItem from "./pages/direction/sections/enfant/enfantItem/EnfantItem"
import AddTransmissionMatin from "./pages/direction/sections/enfant/addTransmissionMatin/AddTransmissionMatin"

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
              <Route path="updatePresentation" element={<UpdatePresentation />} />
              <Route path="updateProjetPedagogique" element={<UpdateProjetPedagogique />} />
              <Route path="updateReglement" element={<UpdateReglement />} />
              <Route path="/sections" element={<Sections />} />
              <Route path="/addSection" element={<AddSection />} />
              <Route path="/addTextesAdmin" element={<AddTextesAdmin />} />
              <Route path="/section/:id" element={<SectionItem />} />
              <Route path="/addEnfant" element={<AddEnfant />} />
              <Route path="/enfant/:id" element={<EnfantItem />} />
              <Route path="/addTransmissionMatin" element={<AddTransmissionMatin />} />
            </Routes>
          </main>
          <Footer />
        </div>
        )}
      </>
    )
}