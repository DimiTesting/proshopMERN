import {Row, Col} from 'react-bootstrap'
import products from "../products"
import ProductItem from '../components/ProductItem'

const HomePage = () => {
    return (
        <>
            <h1> Latest Products </h1>
            <Row>
                {products.map((product) => (
                    <Col sm={12} md={6} lg={4} xl={3}>
                        <ProductItem key={product._id} product={product} id={product._id}/>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default HomePage