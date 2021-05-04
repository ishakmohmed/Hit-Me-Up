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
import { addToCard } from "../actions/cart";

function CartScreen({ history, location, match }) {
  const productId = match.params.id;

  const qty = location.search ? parseInt(location.search.split("=")[1]) : 1; // location.search is query string parameter including the question mark. Example: ?qty=99.

  const dispatch = useDispatch();

  

  return <div>Cart</div>;
}

export default CartScreen;
