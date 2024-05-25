import { useEffect } from "react";
import { useSelector, useDispatch} from "react-redux"
import { useNavigate, Link } from "react-router-dom";
import { useCreateOrderMutation } from "../slices/ordersApiSlice"
import { clearCart } from "../slices/cartSlice";
import { Button, Row, Col, ListGroup, Image, Card} from "react-bootstrap";
import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";
import Loader from "../components/Loader"
import {toast} from 'react-toastify'

const PlaceOrderPage = () => {

    const cart = useSelector((state) => state.cart)
    console.log(cart)
    const navigate = useNavigate()
    const [createOrder, {isLoading, error}] = useCreateOrderMutation()
    const dispatch = useDispatch()

    useEffect(()=> {
        if(!cart.shippingAddress.address) {
            navigate('/shipping')
        }
        if(!cart.paymentMethod) {
            navigate('/payments')
        }
    }, [cart.shippingAddress.address, cart.paymentMethod, navigate])

    const handlePlaceOrder = async() => {
        try {
            const res = await createOrder({
                orderItems: cart.cartItem,
                shippingAddress: cart.shippingAddress, 
                paymentMethod: cart.paymentMethod, 
                itemsPrice: cart.ItemPrice, 
                taxPrice: cart.TaxPrice,
                shippingPrice: cart.ShippingPrice,
                totalPrice: cart.Total
            }).unwrap()
            dispatch(clearCart())
            navigate(`/order/${res.createdOrder._id}`)
        } catch (error) {
            toast.error(error)
        }
    }

    return (
        <>
            <CheckoutSteps step1 step2 step3 step4/>
            <Row>
                <Col md={8}> 
                    <ListGroup variant="flush">
                        <ListGroup.Item >
                            <h2>Shipping address</h2>
                            <strong> 
                                Address: 
                                {cart.shippingAddress.address}, { } 
                                {cart.shippingAddress.postalCode }, { } 
                                {cart.shippingAddress.city }, { } 
                                {cart.shippingAddress.country }
                            </strong>
                        </ListGroup.Item>
                    </ListGroup>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Payment method</h2>
                            <strong> 
                                Method: 
                            </strong>
                            {cart.paymentMethod} 
                        </ListGroup.Item>
                    </ListGroup>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {cart.cartItem.length === 0? (<Message>No Items</Message>): (
                                <ListGroup variant="flush">
                                    {cart.cartItem.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded/>
                                                </Col>
                                                <Col>
                                                    <Link to={`/products/${item._id}`}> {item.name} </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x {item.price} = ${item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={4}>
                    <Card>
                        <h3>Order Summary </h3>
                        <ListGroup>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col> ${cart.ItemPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col> ${cart.ShippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col> ${cart.TaxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col> ${cart.Total}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                {error && (<Message> {error} </Message>)}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button
                                    type="submit"
                                    className="btn btn-block"
                                    disabled={cart.cartItem.length===0}
                                    onClick= {handlePlaceOrder}
                                >
                                    Place Order
                                </Button>
                                {isLoading && (<Loader/>)}
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
        )

}

export default PlaceOrderPage