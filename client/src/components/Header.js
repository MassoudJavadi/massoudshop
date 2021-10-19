import React from 'react'
import {Route} from 'react-router-dom'
import { Navbar, Nav, Container, NavDropdown ,Form,FormControl} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions'
import SearchBox from './SearchBox'

const Header = () => {
    //Route: because the searchbox is a child of Header, we don't have direct access to "history" props in searchbox.So we pass history here in the Parent element.  

    const dispatch= useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const logoutHandler = () => {
        dispatch(logout())
    }
    return (
        <header>
           <Navbar bg="primary" expand="lg" collapseOnSelect>
                <Container>
                   
                    <LinkContainer to='/'>
                        <Navbar.Brand >MsShop</Navbar.Brand>
                    </LinkContainer>
                        
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />


                    <Navbar.Collapse id="basic-navbar-nav">

                        
                        <Route render={({ history }) => <SearchBox history={history} />} />
                        
                        <Nav className="ms-auto">
                            <LinkContainer to='/cart'>
                                 <Nav.Link><i className='fas fa-shopping-cart'></i>Cart</Nav.Link>
                            </LinkContainer>
                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id='username'>
                                    <LinkContainer to='/Profile'>
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            ):
                            <LinkContainer to='/login'>
                                   <Nav.Link href="/login"><i className='fas fa-user'>Sign In</i></Nav.Link>
                            </LinkContainer>}
                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title='Admin' id='adminmenu'>
                                <LinkContainer to='/admin/userlist'>
                                    <NavDropdown.Item>Users</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/admin/productlist'>
                                    <NavDropdown.Item>Products</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/admin/orderlist'>
                                    <NavDropdown.Item>Orders</NavDropdown.Item>
                                </LinkContainer>
                                </NavDropdown>
                            )}
                        </Nav>
                        
                    </Navbar.Collapse>

                </Container>
            </Navbar>
        </header>
    )
}

export default Header
