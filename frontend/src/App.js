import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from "./pages/HomePage"
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import LoginPage from './pages/LoginPage'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
                        <Route path='/cart' element={<CartPage/>}/>
                        <Route path='/sign-in' element={<LoginPage/>}/>
                    </Routes>
            </Container>
          </main>
        <Footer/>
      </Router>
      <ToastContainer/>
    </>
  )
}

export default App