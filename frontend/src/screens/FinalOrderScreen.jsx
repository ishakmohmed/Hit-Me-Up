import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getOrderDetails } from "../actions/order";

function FinalOrderScreen({ match }) {
  const orderId = match.params.id;

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  if (!loading) {
    const transformToFloatHelperFunction = (number) => {
      return (Math.round(number * 100) / 100).toFixed(2);
    };

    order.itemsPrice = transformToFloatHelperFunction(
      order.orderItems.reduce(
        (accumulator, item) => accumulator + item.price * item.qty,
        0
      )
    );
  }

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [orderId, dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h2>Order ID: {order._id}</h2>
      <Row style={{ marginTop: "2rem" }}>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h5 style={{ margin: "1.5rem 0" }}>Address</h5>
              {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
              {order.shippingAddress.postalCode},{" "}
              {order.shippingAddress.country}
            </ListGroup.Item>

            <ListGroup.Item>
              <h5 style={{ margin: "1.5rem 0" }}>Payment Method</h5>
              {order.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h5 style={{ margin: "1.5rem 0" }}>Order Items</h5>
              {order.orderItems.length === 0 ? (
                <Message>No order added.</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
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
                    <strong>RM {order.itemsPrice}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item style={{ background: "#141B41", color: "white" }}>
                <Row>
                  <Col>
                    <strong>Shipping: </strong>
                  </Col>
                  <Col>
                    <strong>RM {order.shippingPrice}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item style={{ background: "#141B41", color: "white" }}>
                <Row>
                  <Col>
                    <strong>Tax: </strong>
                  </Col>
                  <Col>
                    <strong>RM {order.taxPrice}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item style={{ background: "#141B41", color: "white" }}>
                <Row>
                  <Col>
                    <strong>Total:</strong>
                  </Col>
                  <Col>
                    <strong>RM {order.totalPrice}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default FinalOrderScreen;
