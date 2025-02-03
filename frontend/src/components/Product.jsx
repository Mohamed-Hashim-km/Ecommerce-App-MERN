import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = ({ product }) => {
  console.log(product);

  return (
    <>
      <Card className="my-3 p-3 rounded">
        <Link to={`/productscreen/${product._id}`}>
          <Card.Img src={`https://ecommerce-app-mern-10.onrender.com${product.image}`} variant="top" />
        </Link>
        <Card.Body>
          <Link to={`/productscreen/${product._id}`}>
            <Card.Title as="div" className="product-title">
              <strong>{product.name}</strong>
            </Card.Title>
          </Link>
          <Card.Title as="div" className="product-title">
            <Rating value={product.rating} />
          </Card.Title>
          <Card.Text as="h3">${product.price}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default Product;
