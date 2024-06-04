import {useGetProductsQuery} from '../../slices/productsApiSlice'
import { useCreateProductMutation, useDeleteProductMutation } from '../../slices/productsApiSlice'
import {Row, Col, Table, Button} from 'react-bootstrap'
import { FaEdit, FaTrash } from 'react-icons/fa'
import {LinkContainer} from 'react-router-bootstrap'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import {toast} from 'react-toastify'


const ProductListPage = () =>{
    const {data: products, isLoading, error, refetch} = useGetProductsQuery()
    const [createproduct, {isLoading: productLoading}] = useCreateProductMutation()
    const [deleteproduct, {isLoading: deleteLoading}] = useDeleteProductMutation()
    console.log(products)

    async function deleteProduct(id) {
        if (window.confirm('Would you like to create a new product')) {
            try {
                await deleteproduct(id)
                refetch()
                toast.success('Product has been deleted')
            } catch (err) {
                toast.error(err?.data?.error || err.err)
            }
        }
    }

    async function handleCreate() {
        if (window.confirm('Would you like to create a new product')) {
            try {
                await createproduct()
                refetch()
                toast.success('New sample product has been created')
            } catch (err) {
                toast.error(err?.data?.error || err.error)
            }
        }
    }

    return (
    <>
        <Row>
            <Col>
                <h2> Products </h2>
            </Col>
            <Col className='text-end'>
                    <Button type='submit' className='btn-sm m-3' onClick={() => handleCreate()}>
                        Create Product
                    </Button>
            </Col>
        </Row>

        {productLoading && <Loader/>}
        {deleteLoading && <Loader/>}

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
                                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
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