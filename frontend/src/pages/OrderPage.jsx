import { useGetOrderQuery } from '../slices/ordersApiSlice'
import { useParams, Link } from 'react-router-dom'
import {Row, Col, ListGroup, Button, Image, Card, ListGroupItem} from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'

const OrderPage = () => {
    const {id:orderId} = useParams()
    const {data: order, refetch, isLoading, error} = useGetOrderQuery(orderId)
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
                                <Message variant='success'> Delivered </Message>): 
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
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default OrderPage
