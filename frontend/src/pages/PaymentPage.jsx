import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { Form, Col, Button } from "react-bootstrap";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../slices/cartSlice";


const PaymentPage = () => {
    const [paymentMethod, setPaymentMethod] = useState('PayPal')
    const cart = useSelector((state)=> state.cart)
    const {shippingAddress} = cart
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=> {
        if(!shippingAddress) {
            navigate('/shipping')
        }
    }, [shippingAddress, navigate])

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3/>

            <h1>Payment Method</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label> Select Method </Form.Label>
                </Form.Group>
                <Col>
                    <Form.Check
                        type="radio"
                        className="my-2"
                        label='PayPal or Credit Card'
                        name='paymentMethod'
                        id='PayPal'
                        value='PayPal'
                        checked
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    ></Form.Check>
                </Col>
                <Button type='sumbit' variant='primary'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentPage