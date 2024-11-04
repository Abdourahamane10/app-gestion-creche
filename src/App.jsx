import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useSelector } from "react-redux"

import Login from "./pages/login/Login"
import LoginPersonnel from "./pages/loginPersonnel/LoginPersonnel"
import HomeProfessionnel from "./pages/professionnel/HomeProfessionnel"
import HomeDirection from "./pages/direction/HomeDirection"

function App() {
  /* const [count, setCount] = useState(0) */
  const codeUser = useSelector(state => state.auth.codeUser);

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/login" element={<LoginPersonnel/>}/>
        <Route path="/accueil" element={((codeUser == "DR" || codeUser == "DA") && (<HomeDirection />)) || ((codeUser == "AP" || codeUser == "IN" || codeUser == "EJ" || codeUser == "AE") && (<HomeProfessionnel />))} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
