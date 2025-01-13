import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import Message from "../components/Message";
import { Link, useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "../slices/orderApiSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { useEffect } from "react";
import { clearCartItmes } from "../slices/cartSlice";

const PlaceOrderScreen = () => {
  const cart = useSelector((state) => state.cart);
  console.log(typeof cart.paymentMethod);
  
  console.log(cart);
  
  const [createOrder, { isLoading, isError }] = useCreateOrderMutation();
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        cartItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethode: cart.paymentMethod,
        itemPrice: cart.itemPrice,
        taxPrice: cart.taxPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      console.log(res);
      
      dispatch(clearCartItmes())

      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error(error.data.message);
    }
  };

 useEffect(()=>{
  if(!cart.shippingAddress){
    navigate('/shipping')
  }else if(!cart.paymentMethod){
    navigate('/payment')
  }
 },[cart.shippingAddress,cart.paymentMethod])

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city} {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>{isError && <Message variant="danger">{isError}</Message>}</ListGroup.Item>
              <ListGroup.Item>
                <Button type="button" className="btn-block" disabled={cart.cartItems === 0} onClick={placeOrderHandler}>
                  Place Order
                </Button>
                {isLoading && <Loader />}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;