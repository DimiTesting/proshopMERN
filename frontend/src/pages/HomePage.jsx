import {Row, Col} from 'react-bootstrap'
import { useGetProductsQuery } from '../slices/productsApiSlice'
import ProductItem from '../components/ProductItem'

const HomePage = () => {

    const {data: products, isLoading, error} = useGetProductsQuery()

    return (
      
        <>
            {isLoading ? 
                (<h2>Loading..</h2>) : error ? (<div>{error?.data?.message || error.error}</div>) :
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