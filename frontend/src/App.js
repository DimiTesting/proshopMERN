import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import PrivateRoute from './components/PrivateRoute'
import HomePage from "./pages/HomePage"
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ShippingPage from './pages/ShippingPage'
import PaymentPage from './pages/PaymentPage'
import PlaceOrderPage from './pages/PlaceOrderPage'
import OrderPage from './pages/OrderPage'
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
                        <Route path='/register' element={<RegisterPage/>}/>
                        <Route path='' element={<PrivateRoute/>}>
                          <Route path='/shipping' element={<ShippingPage/>}/>
                          <Route path='/payments' element={<PaymentPage/>}/>
                          <Route path='/placeorder' element={<PlaceOrderPage/>}/>
                          <Route path='/order/:id' element={<OrderPage/>}/>
                        </Route>
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