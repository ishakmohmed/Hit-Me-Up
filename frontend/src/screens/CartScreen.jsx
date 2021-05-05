import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import Message from "../components/Message";
import { addToCart, removeFromCart } from "../actions/cart";

function CartScreen({ history, location, match }) {
  const productId = match.params.id;

  const qty = location.search ? parseInt(location.search.split("=")[1]) : 1; // location.search is query string parameter including the question mark. Example: ?qty=99.

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleCheckout = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <Row>
      <Col md={8}>
        <h1 style={{ marginBottom: "3rem" }}>Your Shopping Bag</h1>
        {cartItems.length === 0 ? (
          <Message variant="danger">No item added.</Message>
        ) : (
          <ListGroup
            variant="flush"
            style={{ borderRadius: "10px", marginBottom: "1rem" }}
          >
            {cartItems.map((item) => (
              <ListGroup.Item
                key="item.product"
                style={{
                  color: "black",
                  backgroundColor: "white",
                  boxShadow:
                    "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
                  marginBottom: "1rem",
                }}
              >
                <Row>
                  <Col md={2} xs={4}>
                    <Image
                      src={item.image}
                      fluid
                      style={{
                        margin: "0.5rem",
                        borderRadius: "5px",
                      }}
                    />
                  </Col>
                  <Col md={3}>
                    <Link
                      to={`/product/${item.product}`}
                      style={{ color: "black" }}
                    >
                      <strong>{item.name}</strong>
                    </Link>
                  </Col>
                  <Col md={2}>
                    <strong>RM {item.price}</strong>
                  </Col>
                  <Col md={2}>
                    {" "}
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={
                        (e) =>
                          dispatch(
                            addToCart(item.product, parseInt(e.target.value))
                          )
                        // item.product is the id.
                      }
                      style={{
                        background: "white",
                        color: "black",
                        borderBottom: "0.5px solid white",
                        outlineWidth: "none",
                        margin: "1rem 0",
                      }}
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option
                          key={x + 1}
                          value={x + 1}
                          style={{
                            background: "white",
                            color: "black",
                          }}
                        >
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="danger"
                      onClick={() => handleRemoveFromCart(item.product)}
                      style={{
                        borderRadius: "5px",
                        margin: "0.5rem 0",
                      }}
                    >
                      <i class="fa fa-times" aria-hidden="true"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
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
              style={{
                background: "#141B41",
                color: "white",
                borderBottom: "none",
              }}
            >
              <strong>
                {" "}
                {cartItems.reduce(
                  (accumulator, item) => accumulator + item.qty,
                  0
                )}{" "}
                Items | RM{" "}
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </strong>
            </ListGroup.Item>
            <ListGroup.Item style={{ background: "#141B41" }}>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={handleCheckout}
                style={{
                  background: "#F45B69",
                  border: "none",
                  borderRadius: "5px",
                  marginBottom: "0.5rem",
                }}
              >
                Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
}

export default CartScreen;
