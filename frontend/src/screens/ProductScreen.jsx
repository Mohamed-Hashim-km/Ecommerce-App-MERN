import React from "react";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import products from "../../products";
import { useGetProductByIdQuery } from "../slices/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";

const ProductScreen = () => {
  const { id } = useParams();
  console.log(id);
  

  // const productsList = products;
  // console.log(products);
  // const product = productsList.find((Item) => Item.id == id);
  // console.log(product);


  const {data:product,isLoading,error}=useGetProductByIdQuery(id)
  console.log(product);
  
///////////////////////
  return (
    <>
     {isLoading?(<Loader/>):error?(<Message varient="danger">{error.data.message}</Message>): (<>   
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      <Row>
        <Col md={5}>
          <Image src={product?.image} alt={product?.name} fluid />
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
              <ListGroup.Item>
                <Button className="btn-block" type="button" disabled={product?.countInStock === 0}>
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row></>)}
     </>
    
  );
};

export default ProductScreen;
