import { Container } from "react-bootstrap"
import Header from "./components/Header"
import Footer from './components/Footer'
import HomePage from "./pages/HomePage"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

const App = () => {
  return (
    <>
      <Router>
        <Header/>
          <main className="py-3">
            <Container>
                    <Routes>
                        <Route path="/" element={<HomePage/>}/> 
                    </Routes>
            </Container>
          </main>
        <Footer/>
      </Router>
    </>
  )
}

export default App