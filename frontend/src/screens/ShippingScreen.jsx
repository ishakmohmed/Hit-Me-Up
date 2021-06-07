import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";

function ShippingScreen({ history }) {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <h2>Shipping</h2>
      <FormContainer>
        <Form
          onSubmit={handleSubmit}
          style={{
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
            padding: "2rem",
            margin: "2rem",
          }}
        >
          <Form.Group controlId="address">
            <Form.Label>
              <strong>Address</strong>
            </Form.Label>
            <Form.Control
              className="shadow-none"
              type="text"
              placeholder="Mohmed Ishak"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="city">
            <Form.Label>
              <strong>City</strong>
            </Form.Label>
            <Form.Control
              className="shadow-none"
              type="text"
              placeholder="Mohmed Ishak"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="postalCode">
            <Form.Label>
              <strong>Postal Code</strong>
            </Form.Label>
            <Form.Control
              className="shadow-none"
              type="text"
              placeholder="Mohmed Ishak"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="country">
            <Form.Label>
              <strong>Country</strong>
            </Form.Label>
            <Form.Control
              className="shadow-none"
              type="text"
              placeholder="Mohmed Ishak"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
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
            <strong>Proceed</strong>
          </Button>
        </Form>
      </FormContainer>
    </>
  );
}

export default ShippingScreen;
