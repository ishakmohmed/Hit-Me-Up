import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { register } from "../actions/user";

function RegisterScreen({ history, location }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  // this redirect is used in login and sign up screen.
  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) history.push(redirect);
  }, [history, userInfo, redirect]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== passwordConfirmation) setMessage("Passwords don't match.");
    else dispatch(register(name, email, password));
  };

  return (
    <FormContainer>
      <h1 style={{ textAlign: "center" }}>Register</h1>
      {loading && <Loader />}
      {message && <Message variant="danger">{message}</Message>}
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
        <Form.Group controlId="name">
          <Form.Label>
            <strong>Name</strong>
          </Form.Label>
          <Form.Control
            className="shadow-none"
            type="name"
            placeholder="Mohmed Ishak"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>
            <strong>Email</strong>
          </Form.Label>
          <Form.Control
            className="shadow-none"
            type="email"
            placeholder="you@email.com"
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
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="passwordConfirmation">
          <Form.Label>
            <strong>Confirm Password</strong>
          </Form.Label>
          <Form.Control
            className="shadow-none"
            type="password"
            placeholder="********"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
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
          <strong>Register</strong>
        </Button>
        <Row>
          <Col>
            Login{" "}
            <Link
              to={redirect ? `/login?redirect=${redirect}` : "/login"}
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

export default RegisterScreen;
