import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Rating from "./Rating";

function Product({ product }) {
  return (
    <Card
      className="mb-4 mt-4"
      style={{
        boxShadow:
          "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
      }}
    >
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div" style={{ color: "#000000" }}>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <Rating
            value={product.rating}
            text={` by ${product.numReviews} users`}
          />
        </Card.Text>

        <Card.Text
          as="h4"
          style={{
            color: "white",
            padding: "1rem",
            background: "#113537",
            borderRadius: "25px",
            textAlign: "center",
          }}
        >
          RM {product.price}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Product;
