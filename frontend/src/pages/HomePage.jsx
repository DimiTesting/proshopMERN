import {Row, Col} from 'react-bootstrap'
import products from "../products"
import ProductItem from '../components/ProductItem'

const HomePage = () => {
    return (
        <>
            <Row>
                <Col>
                    {products.map((product) => (
                        <ProductItem key={product._id} product={product}/>
                    ))}
                </Col>
            </Row>
        </>
    )
}

export default HomePage