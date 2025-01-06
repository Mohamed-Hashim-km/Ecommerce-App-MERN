import React from "react";
import products from "../../products";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";

const Homepage = () => {
  return (
    <>
      <h1>Latest Products</h1>

      <Row>
        {products.map((prodcuts, index) => {
          return (
            <Col sm={12} md={6} lg={4} xl={3} key={index}>
              <Product product={prodcuts} />
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default Homepage;
