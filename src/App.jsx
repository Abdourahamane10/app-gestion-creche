import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/login/Login"
import LoginPersonnel from "./pages/loginPersonnel/LoginPersonnel"
import Home from "./pages/professionnel/Home"

function App() {
  /* const [count, setCount] = useState(0) */

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/login" element={<LoginPersonnel/>}/>
        <Route path="/accueil" element={<Home/>} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
