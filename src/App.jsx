import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/login/Login"
import LoginPersonnel from "./pages/loginPersonnel/LoginPersonnel"

function App() {
  /* const [count, setCount] = useState(0) */

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/login" element={<LoginPersonnel/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
