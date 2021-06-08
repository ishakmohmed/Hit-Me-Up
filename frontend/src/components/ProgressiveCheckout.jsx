import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function ProgressiveCheckout({ step1, step2, step3, step4 }) {
  return (
    <Nav
      style={{
        background: "#141B41",
        borderRadius: "10px",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
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
          <LinkContainer to="/placeorder">
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
