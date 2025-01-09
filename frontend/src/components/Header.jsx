import { useState } from "react";
import { Badge, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

import { FaShoppingCart } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slices/userApiSlice";
import { clearCredentials } from "../slices/authSlice";

const Header = () => {
  const [userInfo,setUserinfo]=useState()
  const {cartItems}=useSelector((state)=>state.cart)
  const navigate=useNavigate()
  const dispatch=useDispatch()


  const [logout]=useLogoutMutation()



  const user=useSelector(state=>state.auth.userInfo)
 
  
  

  const logoutHandler=async()=>{
       await logout()
       dispatch(clearCredentials())
       navigate('/')
  }
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand as={Link} to={"/"}>
            ProShop
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to={"/cart"}>
                <FaShoppingCart /> Cart
               {cartItems.length> 0 && <Badge pill bg="success" style={{marginLeft:"5px"}}>
                  {cartItems.reduce((acc,item)=> acc+Number(item.qty),0)}
                </Badge>}
              </Nav.Link>
              <Nav.Link as={user?.name ? Link : false} to={user?.name ? false : "/"}>
                <FaUser />{user&&user.name?`${user.name}`:"Sign In"} 
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>

         <NavDropdown  id="username" style={{ color: 'white' }}>
  <Nav.Link as={Link} to="/">
    <NavDropdown.Item>Profile</NavDropdown.Item>
  </Nav.Link>
  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
</NavDropdown>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
