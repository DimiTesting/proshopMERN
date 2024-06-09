import {Carousel, Image} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useGetTopRatedProductsQuery } from '../slices/productsApiSlice'


const ProductCauresel = () => {
    const {data: products, isLoading, error} = useGetTopRatedProductsQuery()

    console.log(products)

    
    return isLoading? <Loader/> : error ? <Message variant='danger'> No products found </Message>: (
        <Carousel pause='hover' className='mb-4'> 
            {products.map((product) => (
                <Carousel.Item key={product._id}>
                    <Link to={`/products/${product._id}`}>
                        <Image src={`${product.image}`} alt={`${product.name}`} fluid></Image>
                            <Carousel.Caption className='carousel-caption'>
                                <h2> 
                                    {product.name} { } 
                                    ${product.price} 
                                </h2>
                            </Carousel.Caption>
                    </Link>
                </Carousel.Item>
            ))}
        </Carousel> 
    )
}

export default ProductCauresel