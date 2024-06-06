import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useGetUserDetailsQuery, useUpdateUserDetailsMutation } from "../../slices/usersApiSlice";
import FormContainer from "../../components/FormContainer";
import {Form, Button} from 'react-bootstrap'
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { toast } from "react-toastify";

const UserEditPage = () => {
    const {id: userId} = useParams()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const {data:user, isLoading:userLoading, error} = useGetUserDetailsQuery(userId)
    const [updateUser, {isLoading: updateLoading}] = useUpdateUserDetailsMutation()
    const navigate = useNavigate()

    useEffect(() => {   
        if(user) {
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
        }
    }, [user])

    const handleUpdate = async(e) => {
        e.preventDefault()

        const updatedUser = {
            _id: user._id,
            name: name, 
            email: email, 
            isAdmin: isAdmin
        }

        console.log(updatedUser)

        const result = await updateUser(updatedUser)

        if(result.error) {
            console.log(result.error)
            toast.error(result.error)
        } else { 
            toast.success('User has been udpated')
            navigate('/admin/userList')
        }
    }

    return (
        <>
           <Link to='/admin/userList' className="btn btn-light">
                Go Back
           </Link> 
                <FormContainer>
                    <h1>Edit Product </h1>
                    {updateLoading && <Loader/>}

                    {userLoading ? <Loader/> : error? <Message variant={'danger'}> {error} </Message>: (
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
                            <Form.Group controlId='email' className="my-3">
                                <Form.Label> Email </Form.Label>
                                <Form.Control 
                                    type="email"
                                    placeholder="Enter email"
                                    value={email} 
                                    onChange={(e)=>setEmail(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='isAdmin' className="my-3">
                                <Form.Check 
                                    type="checkbox"
                                    label="Is Admin"
                                    value={isAdmin} 
                                    onChange={(e)=>setIsAdmin(e.target.checked)}
                                ></Form.Check>
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                    Update User
                            </Button>
                        </Form>
                    )}

                </FormContainer>
        </>
    )
}

export default UserEditPage