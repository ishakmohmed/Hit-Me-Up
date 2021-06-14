import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Col } from "react-bootstrap";
import ProgressiveCheckout from "../components/ProgressiveCheckout";
import FormContainer from "../components/FormContainer";
import { savePaymentMethod } from "../actions/cart";

function PaymentScreen({ history }) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) history.push("/shipping");

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/order");
  };

  return (
    <>
      <h2>Payment</h2>
      <ProgressiveCheckout step1 step2 step3 />
      <FormContainer>
        <Form
          onSubmit={handleSubmit}
          style={{
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
            padding: "2rem",
            margin: "2rem",
            marginTop: "4rem",
          }}
        >
          <Form.Group>
            <Form.Label style={{ fontWeight: "bold", marginBottom: "2rem" }}>
              Payment Method
            </Form.Label>
            <Col>
              <Form.Check
                type="radio"
                label="PayPal/Credit"
                id="PayPal"
                name="paymentMethod"
                value="PayPal"
                onChange={(e) => setPaymentMethod(e.target.value)}
                checked
              ></Form.Check>
            </Col>
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

export default PaymentScreen;
