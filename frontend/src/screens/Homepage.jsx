import React, { useEffect } from "react";
// import products from "../../products";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";

const Homepage = () => {
       

  
const {data:products,isLoading,error}=useGetProductsQuery()
  console.log(products);



   





  return (
    <>
     {isLoading?<Loader/>:error?<Message>{error.data.message||error.message}</Message>: (<><h1>Latest Products</h1>

      <Row>
        {products?.map((prodcuts, index) => {
          return (
            <Col sm={12} md={6} lg={4} xl={3} key={index}>
              <Product product={prodcuts}  />
            </Col>
          );
        })}
      </Row></>)}
    </>
  );
};

export default Homepage;
