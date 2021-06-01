import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { listProducts } from "../actions/product";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";

function HomeScreen() {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      <h2>New Arrivals</h2>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products.map((p) => (
            <Col key={p._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={p} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
}

export default HomeScreen;
