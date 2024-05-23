import FormContainer from "../components/FormContainer";
import { Row, Col, Form, Button} from "react-bootstrap";
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { useLoginMutation } from "../slices/usersApiSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { userInfo } = useSelector((state) => state.auth)
    const [ login, {isLoading} ] = useLoginMutation()

    const {search} = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/'

    useEffect(()=> {
        if(userInfo) {
            navigate(redirect)
        }
    }, [userInfo, redirect, navigate])

    const handleSumbit = async(e) => {
        e.preventDefault()
        try {
            const res = await login({email, password}).unwrap()
            dispatch(setCredentials({...res}))
            navigate(redirect)
        } catch (err) {
            toast.error(err?.data?.message || err.error)
        }
    }

    return (
        <FormContainer>
            <h1> Sign-in </h1>
            <Form onSubmit={handleSumbit}>

            <Form.Group className='my-2' controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                    type='email'
                    placeholder='Enter email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group className='my-2' controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type='password'
                    placeholder='Enter password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
            </Form.Group>

                <Button type="submit" variant="primary" className="py-3">
                    Sign-in
                </Button>

                {isLoading && <Loader/>}
            </Form>

            <Row className="py-3">
                <Col>
                    New Customer ? <Link to={redirect ? `/register?redirect=${redirect}`: '/register'}> Register</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginPage