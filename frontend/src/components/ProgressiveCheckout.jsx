import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function ProgressiveCheckout({ step1, step2, step3, step4 }) {
  return (
    <Nav
      style={{
        background: "#F1F1F1",
        borderRadius: "10px",
        margin: "2rem 0 1rem 0",
        padding: "0.5rem",
      }}
    >
      <Nav.Item style={{ flex: 1 }}>
        {step1 ? (
          <LinkContainer to="/login">
            <Nav.Link>
              Login <i class="fas fa-solid fa-check"></i>
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Login</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item style={{ flex: 1 }}>
        {step2 ? (
          <LinkContainer to="/shipping">
            <Nav.Link>
              Ship <i class="fas fa-solid fa-check"></i>
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Ship</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item style={{ flex: 1 }}>
        {step3 ? (
          <LinkContainer to="/payment">
            <Nav.Link>
              Pay <i class="fas fa-solid fa-check"></i>
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Pay</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item style={{ flex: 1 }}>
        {step4 ? (
          <LinkContainer to="/order">
            <Nav.Link>
              Order <i class="fas fa-solid fa-check"></i>
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Order</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
}

export default ProgressiveCheckout;
