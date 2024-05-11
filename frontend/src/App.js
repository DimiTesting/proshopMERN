import { Container } from "react-bootstrap"
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from "./pages/HomePage"

const App = () => {
  return (
    <>
        <Header/>
          <main className="py-3">
            <Container>
                <h1>Welcome to the Shopping Card</h1>
                <HomePage/>
            </Container>
          </main>
        <Footer/>
    </>
  )
}

export default App