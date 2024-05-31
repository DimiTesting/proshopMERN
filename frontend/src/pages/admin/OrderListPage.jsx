import { useGetOrdersQuery } from "../../slices/ordersApiSlice"
import {Table, Button} from "react-bootstrap"
import {LinkContainer} from "react-router-bootstrap"
import Loader from "../../components/Loader"
import Message from "../../components/Message"
import {FaTimes} from "react-icons/fa"

const OrderListPage = () => {

    const {data: orders, isLoading, error} = useGetOrdersQuery()

    return (
        <>
            {isLoading ? <Loader/>: error ? <Message variant='danger'> Error </Message>: (
                <Table className="table-sm">
                    <thead>
                        <tr>
                            <th> ID </th>
                            <th> USER </th>
                            <th> DATE </th>
                            <th> TOTAL </th>
                            <th> PAID </th>
                            <th> DELIVERED </th>
                            <th> DETAILS </th>
                        </tr>
                    </thead>
                    <tbody> 
                            {orders.orders.map((order) => (
                                <tr key={order._id}>
                                    <td> {order._id }</td>
                                    <td> {order.createdAt.substring(0,10) }</td>
                                    <td> {order.user.name }</td>
                                    <td> ${order.totalPrice }</td>
                                    <td> {order.isPaid? order.paidAt: (<FaTimes style={{color: "red"}}/>) }</td>
                                    <td> {order.isDelivered? order.deliveredAt: (<FaTimes style={{color: "red"}}/>) }</td>
                                    <td>
                                        <LinkContainer to={`/order/${order._id}`}>
                                            <Button className='btn-sm' variant="light">
                                                Details
                                            </Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </Table>
            )}
        </>
    )
}

export default OrderListPage