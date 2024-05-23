import FormContainer from "../components/FormContainer";
import { Row, Col, Form, Button} from "react-bootstrap";
import { Link } from 'react-router-dom'
import { useState } from "react";

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSumbit = (e) => {
        e.preventDefault()
        console.log('Submit pressed')
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

            </Form>

            <Row className="py-3">
                <Col>
                    New Customer ? <Link to='/register'> Register</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginPage