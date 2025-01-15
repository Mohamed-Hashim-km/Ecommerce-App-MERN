import React, { useState } from "react";
import { Button, Card, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import products from "../../products";
import { useGetProductByIdQuery } from "../slices/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { addCart } from "../slices/cartSlice";
import { useDispatch } from "react-redux";

const ProductScreen = () => {
  const [qty, setQty] = useState(1);
  const { id } = useParams();
  console.log(id);
  const dispatch = useDispatch();
  const navigate=useNavigate()

  

  // const productsList = products;
  // console.log(products);
  // const product = productsList.find((Item) => Item.id == id);
  // console.log(product);

  const { data: product, isLoading, error } = useGetProductByIdQuery(id);
  console.log(product);


  const addToCartHandler = () => {
    dispatch(addCart({...product,qty}));
    navigate('/cart')
  };

  ///////////////////////
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message varient="danger">{error?.data?.message||error?.error}</Message>
      ) : (
        <>
          <Link to="/" className="btn btn-light my-3">
            Go Back
          </Link>
          <Row>
            <Col md={5}>
              <Image src={`http://localhost:5000${product.image}`} alt={product?.name} fluid />
            </Col>
            <Col md={4}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product?.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product?.price}</ListGroup.Item>
                <ListGroup.Item>Description: {product?.description}</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product?.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>{product?.countInStock > 0 ? "In Stock" : "Out Of Stock"}</Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty:</Col>
                        <Col>
                          <Form.Control as="select" value={qty} onChange={(e) => setQty(e.target.value)}>
                            {[...Array(product.countInStock).keys()].map((x) => {
                              return (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              );
                            })}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button className="btn-block" type="button" disabled={product?.countInStock === 0} onClick={addToCartHandler}>
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
