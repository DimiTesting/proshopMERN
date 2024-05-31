import {useGetProductsQuery} from '../../slices/productsApiSlice'
import {Row, Col, Table, Button} from 'react-bootstrap'
import { FaEdit, FaTrash } from 'react-icons/fa'
import {LinkContainer} from 'react-router-bootstrap'
import Loader from '../../components/Loader'
import Message from '../../components/Message'


const ProductListPage = () =>{
    const {data: products, isLoading, error} = useGetProductsQuery()

    function deleteProduct(id) {
        console.log(`Delete: ${id}`)
    }

    return (
    <>
        <Row>
            <Col>
                <h2> Products </h2>
            </Col>
            <Col className='text-end'>
                <LinkContainer to='/createproduct/admin'>
                    <Button type='submit' className='btn-sm m-3'>
                        Create Product
                    </Button>
                </LinkContainer>
            </Col>
        </Row>

        {isLoading? <Loader/>: error? <Message variant='danger'> {error} </Message> : (
            <Table striped hover responsive className='table-sm mt-5' >
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>PRICE</th>
                        <th>CATEGORY</th>
                        <th>BRAND</th>
                    </tr>
                </thead>
                <tbody>
                        {products.map((product) => (
                            <tr key={product._id}>
                                <td> {product._id} </td>
                                <td> {product.name} </td>
                                <td> ${product.price} </td>
                                <td> {product.category} </td>
                                <td> {product.brand} </td>
                                <td> 
                                    <LinkContainer to={`/admin/product/${product._id}`}>
                                        <Button variant='light' className='btn-sm'> 
                                            {<FaEdit/>} 
                                        </Button> 
                                    </LinkContainer>

                                </td>
                                <td> 
                                    <Button  variant='light' className='btn-sm' onClick={() => deleteProduct(product._id)}> 
                                        {<FaTrash/>} 
                                    </Button> 
                                </td>
                            </tr>
                        ))}
                </tbody>
            </Table>
        )}
    </>
    )
}

export default ProductListPage