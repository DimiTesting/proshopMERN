import { Row, Col, ListGroup, Card, Image } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom"
import Message from "../components/Message"

const CartPage = () => {

    const {cartItems} = useSelector((state) => state.cart)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    return (
        <Row>
            <h1> Shopping Cart</h1>
            {cartItems.length === 0 ? 
                <Message> Cart is Empy 
                    <Link to='/'> Go Back </Link>
                </Message>
            : (
                <Col>
                    <ListGroup variant="flush">
                        There are some products in the Cart
                    </ListGroup>
                </Col>
            )}
        </Row>
    )
}

export default CartPage