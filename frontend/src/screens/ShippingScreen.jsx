import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { saveShippingAddress } from "../actions/cart";

function ShippingScreen({ history }) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push("/payment");
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
              placeholder="address..."
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
              placeholder="city..."
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
              placeholder="postal code..."
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
              placeholder="country..."
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
