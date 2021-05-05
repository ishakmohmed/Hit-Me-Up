import { Alert } from "react-bootstrap";

function Message({ variant, children }) {
  return (
    <Alert variant={variant} style={{ marginTop: "3rem" }}>
      {children}
    </Alert>
  );
}

export default Message;
