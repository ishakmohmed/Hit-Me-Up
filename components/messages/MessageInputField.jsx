import { useState } from "react";
import { Form, Segment } from "semantic-ui-react";

function MessageInputField({ sendMsg }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div style={{ position: "sticky", bottom: "0" }}>
      <Segment secondary color="red" attached="bottom">
        <Form
          reply
          onSubmit={(e) => {
            e.preventDefault();
            sendMsg(text);
            setText("");
          }}
        >
          <Form.Input
            size="large"
            placeholder="Compose a text..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            action={{
              color: "red",
              icon: "chevron circle up",
              disabled: text === "",
              loading: loading,
            }}
          />
        </Form>
      </Segment>
    </div>
  );
}

export default MessageInputField;