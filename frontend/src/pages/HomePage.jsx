import {Row, Col} from 'react-bootstrap'
import { useGetProductsQuery } from '../slices/productsApiSlice'
import ProductItem from '../components/ProductItem'
import { useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'

const HomePage = () => {
    const {pageNumber} = useParams()
    const {data, isLoading, error} = useGetProductsQuery({pageNumber})

    return (
      
        <>
            {isLoading ? 
                (<Loader/>) : error ? (<Message>{error?.data?.message || error.error}</Message>) :
                (<>
                    <h1> Latest Products </h1>
                    <Row>
                        {data.products.map((product) => (
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