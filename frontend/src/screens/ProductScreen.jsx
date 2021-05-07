import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import { listProductDetails } from "../actions/product";
import Rating from "../components/Rating";
import Message from "../components/Message";
import Loader from "../components/Loader";

function ProductScreen({ match, history }) {
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [match, dispatch]);

  const handleAddToCart = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

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
              <ListGroup.Item style={{ borderBottom: "none" }}>
                <h4>{product.name}</h4>
              </ListGroup.Item>
              <ListGroup.Item style={{ borderBottom: "none" }}>
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
                  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                }}
              >
                <strong>RM {product.price}</strong>
              </ListGroup.Item>
              <ListGroup.Item
                style={{
                  background: "#156064",
                  color: "white",
                  borderRadius: "10px",
                  padding: "1rem",
                  marginBottom: "0.5rem",
                  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                }}
              >
                <strong>About:</strong> <em>{product.description}</em>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup
                variant="flush"
                style={{
                  borderRadius: "10px",
                  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                }}
              >
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

                {product.countInStock > 0 && (
                  <ListGroup.Item
                    style={{
                      background: "#141B41",
                      color: "white",
                      padding: "1rem",
                    }}
                  >
                    <Row
                      style={{
                        margin: "1rem 0.25rem",
                      }}
                    >
                      <strong>Amount:</strong>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                          style={{
                            background: "#141B41",
                            color: "white",
                            borderBottom: "0.5px solid white",
                            outlineWidth: "none",
                          }}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option
                              key={x + 1}
                              value={x + 1}
                              style={{
                                background: "#141B41",
                                color: "white",
                              }}
                            >
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item
                  style={{
                    background: "#141B41",
                    color: "white",
                  }}
                >
                  <Button
                    className="btn-block"
                    type="button"
                    disabled={product.countInStock === 0}
                    style={{
                      background: "#F45B69",
                      border: "none",
                      borderRadius: "5px",
                      marginBottom: "0.5rem",
                    }}
                    onClick={handleAddToCart}
                  >
                    <strong>Add To Cart</strong>
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
