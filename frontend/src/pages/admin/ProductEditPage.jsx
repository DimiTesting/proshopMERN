import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useUpdateProductMutation, useGetProductDetailsQuery } from "../../slices/productsApiSlice";
import FormContainer from "../../components/FormContainer";
import {Form, Button} from 'react-bootstrap'
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { toast } from "react-toastify";

const ProductEditPage = () => {
    const {id: productId} = useParams()
    const [name, setName] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState(0)
    const [countInStock, setCountInStock] = useState(0)
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')
    const {data:product, isLoading:productLoading, error, refetch} = useGetProductDetailsQuery(productId)
    const [updateProduct, {isLoading: updateLoading}] = useUpdateProductMutation()
    const navigate = useNavigate()
    //console.log(product)

    useEffect(() => {   
        if(product) {
            setName(product.name)
            setBrand(product.brand)
            setCategory(product.category)
            setPrice(product.price)
            setImage(product.image)
            setCountInStock(product.countInStock)
            setDescription(product.description)
        }
    }, [product])

    const handleUpdate = async(e) => {
        e.preventDefault()
        console.log('HandleUpdate clicked')

        const updatedProduct = {
            _id: productId, 
            name: name, 
            brand: brand, 
            category: category, 
            price: price, 
            description: description,
            countInStock: countInStock
        }

        console.log(updatedProduct)

        const result = await updateProduct(updatedProduct)

        if(result.error) {
            toast.error(result.error)
        } else { 
            toast.success('Product has been udpated')
            navigate('/admin/productList')
        }
    }

    return (
        <>
           <Link to='/admin/productlist' className="btn btn-light">
                Go Back
           </Link> 
                <FormContainer>
                    <h1>Edit Product </h1>
                    {updateLoading && <Loader/>}

                    {productLoading ? <Loader/> : error? <Message variant={'danger'}> {error} </Message>: (
                        <Form onSubmit={handleUpdate}>
                            <Form.Group controlId='name' className="my-3">
                                <Form.Label> Name </Form.Label>
                                <Form.Control 
                                    type="text"
                                    placeholder="Enter Name"
                                    value={name} 
                                    onChange={(e)=>setName(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='price' className="my-3">
                                <Form.Label> Price </Form.Label>
                                <Form.Control 
                                    type="number"
                                    placeholder="Enter price"
                                    value={price} 
                                    onChange={(e)=>setPrice(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='category' className="my-3">
                                <Form.Label> Category </Form.Label>
                                <Form.Control 
                                    type="text"
                                    placeholder="Enter category"
                                    value={category} 
                                    onChange={(e)=>setCategory(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='brand' className="my-3">
                                <Form.Label> Brand </Form.Label>
                                <Form.Control 
                                    type="text"
                                    placeholder="Enter brand"
                                    value={brand} 
                                    onChange={(e)=>setBrand(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='countInStock' className="my-3">
                                <Form.Label> Count in Stock </Form.Label>
                                <Form.Control 
                                    type="number"
                                    placeholder="Enter amount in stock"
                                    value={countInStock} 
                                    onChange={(e)=>setCountInStock(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='description' className="my-3">
                                <Form.Label> Description </Form.Label>
                                <Form.Control 
                                    type="text"
                                    placeholder="Enter description"
                                    value={description} 
                                    onChange={(e)=>setDescription(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                    Update
                            </Button>
                        </Form>
                    )}

                </FormContainer>
        </>
    )
}

export default ProductEditPage