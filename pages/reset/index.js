import { useEffect, useState } from "react";
import { Form, Button, Message, Segment } from "semantic-ui-react";
import axios from "axios";

import baseUrl from "../../utils/baseUrl";
import catchErrors from "../../utils/catchErrors";

function ResetPage() {
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const [emailChecked, setEmailChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const resetPassword = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await axios.post(`${baseUrl}/api/reset`, { email });
      setEmailChecked(true);
    } catch (error) {
      setErrorMsg(catchErrors(error));
    }

    setLoading(false);
  };

  useEffect(() => {
    errorMsg !== null && setTimeout(() => setErrorMsg(null), 5000);
  }, [errorMsg]);

  return (
    <>
      {emailChecked ? (
        <Message
          compact
          color="black"
          content="Check your inbox for link to reset password"
        />
      ) : (
        <Message compact color="black" content="Reset password" />
      )}

      <Form
        loading={loading}
        onSubmit={resetPassword}
        error={errorMsg !== null}
      >
        {/* <Message compact color="black" content={errorMsg} /> */}
        <Segment>
          <Form.Input
            fluid
            type="email"
            iconPosition="right"
            label="Email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <Button
            disabled={loading || email.length === 0}
            type="submit"
            color="blue"
            content="Submit"
          />
        </Segment>
      </Form>
    </>
  );
}

export default ResetPage;
