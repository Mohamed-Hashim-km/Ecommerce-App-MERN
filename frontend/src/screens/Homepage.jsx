import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useParams } from "react-router-dom";
import Paginationate from "../components/Paginationate";

const Homepage = () => {
  const { pageNumber, keyword } = useParams();
  console.log(pageNumber);
  console.log(keyword);

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://ecommerce-app-mern-10.onrender.com/api/products?pageNumber=${pageNumber}&keyword=${keyword}`);
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [pageNumber, keyword]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message>{error.message}</Message>
      ) : (
        <>
          <h1>Latest Products</h1>
          <Row>
            {data?.products?.map((product, index) => (
              <Col sm={12} md={6} lg={4} xl={3} key={index}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginationate pages={data?.pages} page={data?.page} keyword={keyword} />
        </>
      )}
    </>
  );
};

export default Homepage;