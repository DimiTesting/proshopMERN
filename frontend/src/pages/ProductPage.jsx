import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {Row, Form, Col, Image, Button, ListGroup, ListGroupItem, Card} from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useGetProductDetailsQuery, useCreateProductReviewMutation } from '../slices/productsApiSlice'
import { addToCart } from '../slices/cartSlice'
import {toast} from 'react-toastify'

function ProductPage() {

    const {id:productId} = useParams()
    const {userInfo} = useSelector((state) => state.auth)
    const {data:product, isLoading, error, refetch} = useGetProductDetailsQuery(productId)
    const [createProductReview, {isLoading: LoadingProductReview}] = useCreateProductReviewMutation()
    const [qty, setQty] = useState(1)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const addToCartHandler = () => {
        dispatch(addToCart({...product, qty}))
        navigate('/cart')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await createProductReview({
                productId,
                rating: rating,
                comment: comment
            }).unwrap()
            refetch()
            toast.success('Review created')
        } catch (err) {
            toast.error(err?.data?.message || err.error)
        }
    }

    return(
        <>
            {
                isLoading? (<Loader/>): error? (<Message> {error?.data?.message || error.error}</Message>): 
                (<>
                    <Link className='btn btn-light my-3' to='/'>
                        Go Back
                    </Link>
                <>
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

                                    {product.countInStock>0 && (
                                        <ListGroupItem>
                                            <Row>
                                                <Col>Qty</Col>
                                                <Col> 
                                                    <Form.Control as='select' value={qty} onChange={(e)=> setQty(Number(e.target.value))}>
                                                        {[...Array(product.countInStock).keys()].map((x) => (
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
                                        <Button className='btn btn-block' type='button' disabled={product.countInStock===0} onClick={addToCartHandler}>
                                            Add to Card
                                        </Button>
                                    </ListGroupItem>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                </>
                    <>
                    <Row className='reviews'>
                        <Col md={6}>
                            {product.reviews.length === 0 && <Message> No reviews </Message>}
                            <ListGroup variant='fluch'>
                                {product.reviews.map((review) => (
                                    <ListGroup.Item key={review._id}>
                                        <strong> {review.name} </strong>
                                        <Rating value={review.rating}> </Rating>
                                        <p>{review.createdAt.substring(0, 10)}</p>
                                        <p>{review.comment}</p>
                                    </ListGroup.Item>
                                ))}
                                <ListGroup.Item>
                                    <h2> Write a customer review</h2>
                                    {LoadingProductReview &&  <Loader/>}
                                    {userInfo ? (
                                        <Form onSubmit={handleSubmit}>
                                            <Form.Group controlId='rating' className='my-2'>
                                                <Form.Label> Rating </Form.Label>
                                                <Form.Control 
                                                    as='select'
                                                    value={rating}
                                                    onChange={(e) => setRating(Number(e.target.value))}
                                                >
                                                    <option value=""> Select ... </option>
                                                    <option value="1"> 1 - Poor </option>
                                                    <option value="2"> 2 - Fair </option>
                                                    <option value="3"> 3 - Good </option>
                                                    <option value="4"> 4 - Very Good  </option>
                                                    <option value="5"> 5 - Excellent  </option>
                                                </Form.Control>
                                            </Form.Group>

                                            <Form.Group controlId='comment' className='my-2'>
                                                <Form.Label> Comment </Form.Label>
                                                <Form.Control 
                                                    as='textarea'
                                                    value={comment}
                                                    onChange={(e) => setComment(e.target.value)}
                                                >
                                                </Form.Control>
                                            </Form.Group>

                                            <Button disabled={LoadingProductReview} type='submit' variant='primary'>
                                                Submit
                                            </Button>
                                        </Form>
                                    ) : (
                                        <Message > In order to leave a review, please <Link to='/sign-in'> sign-in </Link></Message>
                                    )}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                    </>
                </>)
            }
        </>
    )
}

export default ProductPage