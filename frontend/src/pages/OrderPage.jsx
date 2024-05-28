import { useGetOrderQuery } from '../slices/ordersApiSlice'
import { useParams, Link } from 'react-router-dom'
import {Row, Col, ListGroup, Button, Form, Image} from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'

const OrderPage = () => {
    const {id:orderId} = useParams()
    const {data: order, refetch, isLoading, error} = useGetOrderQuery(orderId)

    console.log(order)

    return isLoading ? <Loader/> : error ? <Message variant="danger"> No order</Message> : (
        <>
            <h1> {order._id} </h1>
            <Row>
                <Col md={8}>
                    <ListGroup>
                        <ListGroup.Item variant='flush'>
                            <h2> Shipping </h2>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}></Col>
            </Row>
        </>
    )
}

export default OrderPage
