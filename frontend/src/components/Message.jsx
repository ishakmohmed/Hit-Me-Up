import { Alert } from "react-bootstrap";

function Message({ variant, children }) {
  return (
    <Alert variant={variant} style={{ marginTop: "3rem" }}>
      <strong>{children}</strong>
    </Alert>
  );
}

export default Message;
