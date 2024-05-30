import {Navbar, Nav, Container, Badge, NavDropdown} from 'react-bootstrap'
import {FaShoppingCart, FaUser, FaShopify} from 'react-icons/fa'
import {LinkContainer} from 'react-router-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import { useLogoutMutation } from '../slices/usersApiSlice'
import { logout } from '../slices/authSlice'
import {useNavigate} from 'react-router-dom'

const Header = () => {

    const { cartItem } = useSelector((state) => state.cart)
    const { userInfo } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [logoutAPICall] = useLogoutMutation()

    const logoutHandler = async() => {
        try {
            await logoutAPICall().unwrap()
            dispatch(logout())
            navigate('/sign-in')
        } catch (err) {
            console.log(err)
        }
    }

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
                            
                            {userInfo? (
                                <NavDropdown title={userInfo.name} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item> Profile </NavDropdown.Item>
                                    </LinkContainer>
                                        <NavDropdown.Item onClick={logoutHandler}> Logout </NavDropdown.Item>
                                </NavDropdown>
                            ): (
                                <LinkContainer to='/sign-in'>
                                <Nav.Link>  <FaUser/> Sign-in </Nav.Link>
                            </LinkContainer>
                            )}

                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title="Admin" id='admin'>
                                    <LinkContainer to='/productlist'>
                                        <NavDropdown.Item> Products </NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/userlist'>
                                        <NavDropdown.Item> Users </NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/orderlist'>
                                        <NavDropdown.Item> Orders </NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            )}

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header 