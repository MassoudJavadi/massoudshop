import React , {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Row,Col,Button,Form, FormControl} from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {login} from '../actions/userActions'
import {useSelector,useDispatch} from 'react-redux'




const LoginPage = ({history,location}) => {
    
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const {error,loading,userInfo} = userLogin

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(()=>{
        if(userInfo){
            history.push(redirect)
        }
    },[history,userInfo,redirect])

    const submitHandler = e =>{
        e.preventDefault() //page doesn't refresh auto
        //DISPATCH LOGIN
        dispatch(login(password,email))
    }
    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader/> }
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <FormControl 
                                  type='email'
                                  placeholder='Enter Email' 
                                  value={email}
                                  onChange={e=>setEmail(e.target.value)}> 
                    </FormControl>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <FormControl 
                                type='password' 
                                placeholder='Enter password' 
                                value={password}
                                onChange={e=>setPassword(e.target.value)}> 
                    </FormControl>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Sign In
                </Button>


            </Form>

            <Row className='py-3'>
                <Col>
                    New Customer ? <Link to={redirect ? `/register?redirect=${redirect}`: '/register'}>Register</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginPage