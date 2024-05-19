import { Row, Col, ListGroup, Card, Image, Form, Button} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom"
import Message from "../components/Message"
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../slices/cartSlice";

const CartPage = () => {

    const {cartItem} = useSelector((state) => state.cart)
    console.log(cartItem)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const updateQuantity = async(product, qty) => {
        dispatch(addToCart({...product, qty}))
    }

    const deleteItem = async(id) => {
        dispatch(removeFromCart(id))
    }

    const proceedToCheckout = async() => {
        navigate('/login?redirect=/shipping')
    }

    return (
        <Row>
            <h1> Shopping Cart</h1>
            {cartItem.length === 0 ? 
                <Message> Cart is Empy 
                    <Link to='/'> Go Back </Link>
                </Message>
            : (
                <Col md={8}>
                    <ListGroup variant="flush">
                        {cartItem.map((item) => (
                            <ListGroup.Item key={item._id}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded/>
                                    </Col>
                                    <Col md={2}>
                                        <Link to={`/products/${item._id}`}> {item.name} </Link>
                                    </Col>
                                    <Col md={2}>
                                        ${item.price}
                                    </Col>
                                    <Col md={2}>
                                        <Form.Control as='select'
                                            onChange={(e) => 
                                                updateQuantity(item, Number(e.target.value))
                                            }>
                                            {[...Array(item.countInStock).keys()].map((x) => (
                                                <option 
                                                    key={x+1} 
                                                    value={x+1}> 
                                                    {x+1} 
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                    <Col md={2}>
                                        <Button type="button" variant="light" onClick={()=> deleteItem(item._id)}>
                                            <FaTrash></FaTrash>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            )}
            <Col md={4}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>
                                Subtotal {cartItem.reduce((acc, item) => acc+item.qty, 0)} items
                            </h2>
                            ${cartItem.reduce((acc, item) => acc+item.qty*item.price, 0).toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type="button" className="btn-block" disabled={cartItem.length===0} onClick={()=> proceedToCheckout()}>
                                Procced to checkout
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default CartPage