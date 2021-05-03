import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import { listProductDetails } from "../actions/product";
import Rating from "../components/Rating";
import Message from "../components/Message";
import Loader from "../components/Loader";

function ProductScreen({ match }) {
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [match, dispatch]);

  return (
    <>
      <Link to="/">
        <i
          style={{
            fontSize: "2rem",
          }}
          className="back-button fas fa-arrow-circle-left"
        ></i>
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row
          style={{
            marginTop: "3rem",
            border: "0.5px solid lightgray",
            padding: "1.5rem",
          }}
        >
          <Col md={4}>
            <Image
              src={product.image}
              alt={product.name}
              fluid
              style={{
                boxShadow:
                  "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
              }}
            />
          </Col>
          <Col md={4}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h4>{product.name}</h4>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={` by ${product.numReviews} users`}
                />
              </ListGroup.Item>
              <ListGroup.Item
                style={{
                  color: "white",
                  margin: "1rem 0",
                  padding: "1rem",
                  background: "#B80C09",
                  borderRadius: "10px",
                  textAlign: "center",
                }}
              >
                <strong>RM {product.price}</strong>
              </ListGroup.Item>
              <ListGroup.Item
                style={{
                  background: "black",
                  color: "white",
                  borderRadius: "10px",
                  padding: "1rem",
                  marginBottom: "0.5em",
                }}
              >
                <strong>About:</strong> <em>{product.description}</em>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant="flush" style={{ borderRadius: "10px" }}>
                <ListGroup.Item
                  style={{ background: "#141B41", color: "white" }}
                >
                  <Row>
                    <Col>
                      <strong>Price:</strong>
                    </Col>
                    <Col>
                      <strong>RM {product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item
                  style={{
                    background: "#141B41",
                    color: "white",
                  }}
                >
                  <Row>
                    <Col>
                      <strong>Status:</strong>
                    </Col>
                    <Col>
                      <strong>
                        {product.countInStock > 0
                          ? "Available"
                          : "Out Of Stock"}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item
                  style={{ background: "#141B41", color: "white" }}
                >
                  <Button
                    className="btn-block"
                    type="button"
                    disabled={product.countInStock === 0}
                    style={{
                      background: "#F45B69",
                      border: "none",
                      borderRadius: "5px",
                    }}
                  >
                    Add To Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
}

export default ProductScreen;
