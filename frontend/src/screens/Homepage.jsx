import React, { useEffect } from "react";
// import products from "../../products";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productApiSlice";

const Homepage = () => {
       

  
const {data:products}=useGetProductsQuery()
  console.log(products);



   





  return (
    <>
      <h1>Latest Products</h1>

      <Row>
        {products?.map((prodcuts, index) => {
          return (
            <Col sm={12} md={6} lg={4} xl={3} key={index}>
              <Product product={prodcuts}  />
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default Homepage;
