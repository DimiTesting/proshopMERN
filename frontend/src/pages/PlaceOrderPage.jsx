import { useEffect } from "react";
import { useSelector, useDispatch} from "react-redux"
import { useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "../slices/ordersApiSlice"
import { Button, Row, Col, ListGroup, Image, Card} from "react-bootstrap";
import CheckoutSteps from "../components/CheckoutSteps";

const PlaceOrderPage = () => {

    const cart = useSelector((state) => state.cart)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(()=> {
        if(!cart.shippingAddress.address) {
            navigate('/shipping')
        }
        if(!cart.paymentMethod) {
            navigate('/payments')
        }
    }, [cart.shippingAddress.address, cart.paymentMethod, navigate])

    return (
        <>
            <CheckoutSteps step1 step2 step3 step4/>
            <Row>
                <Col md={8}> Column </Col>
                <Col md={8}> Column </Col>
            </Row>
        </>
        )

}

export default PlaceOrderPage