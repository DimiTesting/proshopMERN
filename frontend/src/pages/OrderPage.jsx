import { useGetOrderQuery, usePayOrderMutation, useGetPayPalClientIdQuery } from '../slices/ordersApiSlice'
import { useParams, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import {Row, Col, ListGroup, Button, Image, Card, ListGroupItem} from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {toast} from 'react-toastify'
import {PayPalButtons, usePayPalScriptReducer} from '@paypal/react-paypal-js'

const OrderPage = () => {
    const {id:orderId} = useParams()
    const {data: order, refetch, isLoading, error} = useGetOrderQuery(orderId)

    const [payOrder, {isLoading: loadingPay}] = usePayOrderMutation()
    const [{isPending}, paypalDispatch] = usePayPalScriptReducer()
    const {data: paypal, isLoading: loadingPayPal, error: errorPayPal} = useGetPayPalClientIdQuery()
    const {userInfo} = useSelector((state)=> state.auth)

    useEffect(() => {
        if(!errorPayPal && !loadingPayPal && paypal.clientId) {
            const loadingPayPalScript = async () => {
                paypalDispatch({
                    type: 'resetOptions', 
                    value: {
                        'clientId': paypal.clientId, 
                        currency: "USD"
                    }
                })
                paypalDispatch({type: 'setLoadingStatus', value: 'pending'})
            } 
            if (order && order.isPaid) {
                if(!window.paypal) {
                    loadingPayPalScript()
                }
            }
        }
    })

    function onApprove(data, actions){
        return actions.order.capture().then(async function(details){
            try {
                await payOrder({orderId, details})
                refetch()
                toast.success("Payment went through")
            } catch (err) {
                toast.error(err?.data?.message || err.message)
            }
        })
    }

    async function onApproveTest() {
        await payOrder({orderId, details: {payer: {}}})
        refetch()
        toast.success("Payment went through")
    }

    function onError(err){
        toast.error(err.message)
    }

    function createOrder(data, actions) {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: order.totalPrice
                    }
                }
            ]
        }).then((orderId) => {
            return orderId
        })
    }

    return isLoading ? <Loader/> : error ? <Message variant="danger"> No order</Message> : (
        <>
            <h1> Order {orderId} </h1>
            <Row>
                <Col md={8}>
                    <ListGroup>
                        <ListGroup.Item variant='flush'>
                            <h2> Shipping </h2>
                            <p> <strong> Name </strong> {order.order.user.name} </p>
                            <p> <strong> Email </strong> {order.order.user.email} </p>
                            <p> <strong> Address </strong> 
                                {order.order.shippingAddress.address},{" "}
                                {order.order.shippingAddress.city},{" "} 
                                {order.order.shippingAddress.postalCode},{" "}
                                {order.order.shippingAddress.country}
                            </p>
                            {order.order.isDelivered? (
                                <Message variant='success'> Delivered </Message>): 
                                (<Message variant='danger'> Not delivered </Message>)}
                        </ListGroup.Item>

                        <ListGroup.Item variant='flush'>
                            <h2> Payment </h2>
                            <p> <strong> Method </strong> {order.order.paymentMethod} </p>
                            {order.order.isPaid? (
                                <Message variant='success'> Paid at {order.order.paidAt} </Message>): 
                                (<Message variant='danger'> Not paid </Message>)}
                        </ListGroup.Item>

                        <ListGroup.Item variant='flush'>
                            <h2> Order Items </h2>
                            {order.order.orderItems.map((item, index) => (
                                <ListGroupItem key={index}>
                                    <Row>
                                        <Col md={1}>
                                            <Image src={item.image} alt={item.name} fluid rounded/>
                                        </Col>
                                        <Col>
                                            <Link to={`/products/${item.product}`}> {item.name} </Link>
                                        </Col>
                                        <Col md={4}>
                                            {item.qty} * ${item.price} = ${item.qty*item.price}
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                            ))}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <h2> Order Summary </h2>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Row>
                                    <Col> Items </Col>
                                    <Col> ${order.order.itemsPrice} </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col> Shipping </Col>
                                    <Col> ${order.order.shippingPrice} </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col> Tax </Col>
                                    <Col> ${order.order.taxPrice} </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col> Total </Col>
                                    <Col> ${order.order.totalPrice} </Col>
                                </Row>
                            </ListGroup.Item>

                            {!order.order.isPaid && (
                                <ListGroup.Item>
                                    {loadingPay  && <Loader/>}
                                    {isPending ? (<Loader/>): (
                                        <div>
                                            {/*<Button onClick={onApproveTest} style={{marginBottom: "10px"}}>
                                                Test Pay Order
                                            </Button>*/}
                                            <div>
                                                <PayPalButtons 
                                                    createOrder={createOrder} 
                                                    onApprove={onApprove} 
                                                    onError={onError}>
                                                </PayPalButtons>
                                            </div>
                                        </div>
                                    )}
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default OrderPage
