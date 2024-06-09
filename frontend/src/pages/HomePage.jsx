import {Row, Col} from 'react-bootstrap'
import { useGetProductsQuery } from '../slices/productsApiSlice'
import ProductItem from '../components/ProductItem'
import { Link, useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import Message from '../components/Message'
import ProductCauresel from '../components/ProductCauresel'

const HomePage = () => {
    const {keyword, pageNumber} = useParams()
    const {data, isLoading, error} = useGetProductsQuery({keyword, pageNumber})

    return (
      
        <>
            {!keyword ? <ProductCauresel/> :<Link to='/' className='btn btn-light mb-4'> Go Back</Link>}
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
                    <Paginate page={data.page} pages={data.pages} keyword={keyword? keyword: ''}/>
                </>
                )
            }
        </>
    
    )
}

export default HomePage