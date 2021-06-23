import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import ProgressiveCheckout from "../components/ProgressiveCheckout";
import Message from "../components/Message";
import { createNewOrder } from "../actions/order";

function OrderScreen({ history }) {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const transformToFloatHelperFunction = (number) => {
    return (Math.round(number * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = transformToFloatHelperFunction(
    cart.cartItems.reduce(
      (accumulator, item) => accumulator + item.price * item.qty,
      0
    )
  );

  // I just assumed the shipping price
  cart.shippingPrice = transformToFloatHelperFunction(
    cart.itemsPrice > 200 ? 60 : 20
  );

  // I just assumed 6% GST tax
  cart.taxPrice = transformToFloatHelperFunction(
    Number((0.06 * cart.itemsPrice).toFixed(2))
  );

  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const createOrder = useSelector((state) => state.createOrder);
  const { error, order, success } = createOrder;

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
    }
  });

  const handleAddOrder = () => {
    dispatch(
      createNewOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <>
      <ProgressiveCheckout step1 step2 step3 step4 />
      <Row style={{ marginTop: "2rem" }}>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h5 style={{ margin: "1.5rem 0" }}>Address</h5>
              {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
              {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
            </ListGroup.Item>

            <ListGroup.Item>
              <h5 style={{ margin: "1.5rem 0" }}>Payment Method</h5>
              {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h5 style={{ margin: "1.5rem 0" }}>Order Items</h5>
              {cart.cartItems.length === 0 ? (
                <Message>No item added.</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item
                      key={index}
                      style={{
                        color: "black",
                        backgroundColor: "white",
                        boxShadow:
                          "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
                        marginBottom: "1rem",
                        padding: "1rem",
                      }}
                    >
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link
                            to={`/product/${item.product}`}
                            style={{ color: "black" }}
                          >
                            <strong>
                              {item.name} ({item.qty})
                            </strong>
                          </Link>
                        </Col>
                        <Col md={4}>
                          <strong>RM {item.qty * item.price}</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
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
                style={{
                  background: "#141B41",
                  color: "white",
                }}
              >
                <h6 style={{ textAlign: "center" }}>Order Summary</h6>
              </ListGroup.Item>
              <ListGroup.Item style={{ background: "#141B41", color: "white" }}>
                <Row>
                  <Col>
                    <strong>Items: </strong>
                  </Col>
                  <Col>
                    <strong>RM {cart.itemsPrice}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item style={{ background: "#141B41", color: "white" }}>
                <Row>
                  <Col>
                    <strong>Shipping: </strong>
                  </Col>
                  <Col>
                    <strong>RM {cart.shippingPrice}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item style={{ background: "#141B41", color: "white" }}>
                <Row>
                  <Col>
                    <strong>Tax: </strong>
                  </Col>
                  <Col>
                    <strong>RM {cart.taxPrice}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item style={{ background: "#141B41", color: "white" }}>
                <Row>
                  <Col>
                    <strong>Total:</strong>
                  </Col>
                  <Col>
                    <strong>RM {cart.totalPrice}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item
                style={{
                  background: "#141B41",
                }}
              >
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item style={{ background: "#141B41", color: "white" }}>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart.cartItems === 0}
                  style={{
                    background: "#F45B69",
                    border: "none",
                    borderRadius: "5px",
                    marginBottom: "0.5rem",
                  }}
                  onClick={handleAddOrder}
                >
                  <strong>Add Order</strong>
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default OrderScreen;
