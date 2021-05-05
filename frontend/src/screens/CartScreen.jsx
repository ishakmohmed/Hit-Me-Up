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

  return (
    <Row>
      <Col md={8}>
        <h1>Your Shopping Bag</h1>
        {/* {cartItems.length === 0 ? (
          <Message>No Items Added Yet.</Message>
        ) : (
          <ListGroup variant="flush">hello</ListGroup>
        )} */}
      </Col>
      <Col md={2}></Col>
      <Col md={2}></Col>
    </Row>
  );
}

export default CartScreen;
