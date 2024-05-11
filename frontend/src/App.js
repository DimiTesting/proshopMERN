import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from "./pages/HomePage"
import ProductPage from './pages/ProductPage'
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
                        <Route path='/products/:id' element={<ProductPage/>}/>
                    </Routes>
            </Container>
          </main>
        <Footer/>
      </Router>
    </>
  )
}

export default App