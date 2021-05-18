import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { login } from "../actions/user";

function LoginScreen({ history, location }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  // this redirect is used in login and sign up screen.
  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      <h1 style={{ textAlign: "center" }}>Login</h1>
      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      <Form
        onSubmit={handleSubmit}
        style={{
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
          padding: "2rem",
          margin: "2rem",
        }}
      >

        <Form.Group controlId="email">
          <Form.Label>
            <strong>Email</strong>
          </Form.Label>
          <Form.Control
            className="shadow-none"
            type="email"
            placeholder="masteruser@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>
            <strong>Password</strong>
          </Form.Label>
          <Form.Control
            className="shadow-none"
            type="password"
            placeholder="Masteruser975"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        
        <Button
          type="submit"
          variant="primary"
          style={{
            background: "#0F084B",
            border: "none",
            borderRadius: "5px",
            margin: "1rem",
            boxShadow:
              "rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px, rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px, rgba(0, 0, 0, 0.07) 0px 16px 16px",
          }}
        >
          <strong>Login</strong>
        </Button>
        <Row>
          <Col>
            Register{" "}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
              style={{ textDecoration: "none" }}
            >
              <strong>here </strong>
            </Link>
            instead.
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
}

export default LoginScreen;
