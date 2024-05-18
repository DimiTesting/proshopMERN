import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {Row, Form, Col, Image, Button, ListGroup, ListGroupItem, Card} from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useGetProductDetailsQuery } from '../slices/productsApiSlice'

function ProductPage() {

    const {id:productId} = useParams()
    const {data:product, isLoading, error} = useGetProductDetailsQuery(productId)
    const [qty, setQty] = useState(1)

    return(
        <>
            {
                isLoading? (<Loader/>): error? (<Message> {error?.data?.message || error.error}</Message>): 
                (<>
                    <Link className='btn btn-light my-3' to='/'>
                        Go Back
                    </Link>

                    <Row>
                        <Col md={5}>
                            <Image src={`${product.image}`} alt={`${product.name}`} fluid/>
                        </Col>
                        <Col md={4}>
                            <ListGroup variant='flush'>
                                <ListGroupItem> <h3>{product.name}</h3> </ListGroupItem>
                                <ListGroupItem> <Rating value={product.rating} text={`${product.numReviews} reviews`}/> </ListGroupItem>
                                <ListGroupItem>  Price ${product.price} </ListGroupItem>
                                <ListGroupItem> Description: {product.description}</ListGroupItem>
                            </ListGroup>
                        </Col>
                        <Col md={3}>
                            <Card>
                                <ListGroup>
                                    <ListGroupItem>
                                        <Row>
                                            <Col>Price</Col>
                                            <Col> ${product.price}</Col>
                                        </Row>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <Row>
                                            <Col>Status</Col>
                                            <Col> {product.countInStock>1? 'In Stock': 'Out of Stock'}</Col>
                                        </Row>
                                    </ListGroupItem>

                                    {product.countInStock>1 && (
                                        <ListGroupItem>
                                            <Row>
                                                <Col>Qty</Col>
                                                <Col> 
                                                    <Form.Control as='select' value={qty} onChange={(e)=> setQty(e.target.value)}>
                                                        {[...Array(product.countInStock)].keys().map((x) => (
                                                            <option 
                                                                key={x+1} 
                                                                value={x+1}> 
                                                                {x+1} 
                                                            </option>
                                                        ))}
                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                        </ListGroupItem>
                                    )}

                                    <ListGroupItem>
                                        <Button className='btn btn-block' type='button' disabled={product.countInStock===0}>
                                            Add to Card
                                        </Button>
                                    </ListGroupItem>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                </>)
            }
        </>
    )
}

export default ProductPage