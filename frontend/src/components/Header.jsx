import {Navbar, Nav, Container, Badge} from 'react-bootstrap'
import {FaShoppingCart, FaUser, FaShopify} from 'react-icons/fa'
import {LinkContainer} from 'react-router-bootstrap'
import {useSelector} from 'react-redux'

const Header = () => {

    const { cartItem } = useSelector((state) => state.cart)
    console.log(cartItem)

    return (
        <header>
            <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>  <FaShopify/> Proshop</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls='basic navbar-nav'/>
                    <Navbar.Collapse id='basic navbar-nav'>
                    <Nav className='ms-auto'>
                            <LinkContainer to='/cart'>
                                <Nav.Link>  
                                    <FaShoppingCart/> 
                                        Cart
                                    {cartItem.length>0 && (
                                        <Badge pill bg='success' style={{marginLeft: '5px'}}>
                                            {cartItem.reduce((acc, curr) => acc + curr.qty, 0)}
                                        </Badge>
                                    )}
                                 </Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/sign-in'>
                                <Nav.Link>  <FaUser/> Sign-in </Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header 