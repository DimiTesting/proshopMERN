import {Row, Col} from 'react-bootstrap'
import { useGetProductsQuery } from '../slices/productsApiSlice'
import ProductItem from '../components/ProductItem'
import Loader from '../components/Loader'
import Message from '../components/Message'

const HomePage = () => {

    const {data: products, isLoading, error} = useGetProductsQuery()

    return (
      
        <>
            {isLoading ? 
                (<Loader/>) : error ? (<Message>{error?.data?.message || error.error}</Message>) :
                (<>
                    <h1> Latest Products </h1>
                    <Row>
                        {products.map((product) => (
                            <Col sm={12} md={6} lg={4} xl={3}>
                            <ProductItem key={product._id} product={product} id={product._id}/>
                        </Col>))}
                    </Row>
                </>
                )
            }
        </>
    
    )
}

export default HomePage