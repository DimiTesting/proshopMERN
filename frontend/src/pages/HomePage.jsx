import {Row, Col} from 'react-bootstrap'
import ProductItem from '../components/ProductItem'
import axios from 'axios'
import { useState, useEffect } from 'react'

const HomePage = () => {

    const [products, setProducts] = useState([])

    useEffect(()=>{
        const fetchProducts = async() => {
            const {data} = await axios.get('/api/products')
            setProducts(data)
        }

        fetchProducts()
    }, [])

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