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
import { addToCart } from "../actions/cart";

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
    console.log("ABCD");
  };

  const handleCheckout = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Your Shopping Bag</h1>
        {cartItems.length === 0 ? (
          <Message variant="danger">No item added.</Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key="item.product">
                <Row>
                  <Col md={2}>
                    <Image src={item.image} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>RM {item.price}</Col>
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
                        background: "#141B41",
                        color: "white",
                        borderBottom: "0.5px solid white",
                        outlineWidth: "none",
                      }}
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
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
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => handleRemoveFromCart(item.product)}
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
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>
                Total (
                {cartItems.reduce(
                  (accumulator, item) => accumulator + item.qty,
                  0
                )}
                ) items
              </h3>
              RM{" "}
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={handleCheckout}
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
