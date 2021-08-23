import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Form, Button, Message, Segment, Divider } from "semantic-ui-react";
import axios from "axios";

import baseUrl from "../../utils/baseUrl";
import catchErrors from "../../utils/catchErrors";

function TokenPage() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState({ field1: "", field2: "" });
  const { field1, field2 } = newPassword;
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewPassword((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    errorMsg !== null && setTimeout(() => setErrorMsg(null), 5000);
  }, [errorMsg]);

  const resetPassword = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      if (field1 !== field2) return setErrorMsg("Passwords don't match");

      await axios.post(`${baseUrl}/api/reset/token`, {
        password: field1,
        token: router.query.token,
      });

      setSuccess(true);
    } catch (error) {
      setErrorMsg(catchErrors(error));
    }

    setLoading(false);
  };

  return (
    <>
      {success ? (
        <Message
          compact
          color="black"
          content="Password has been reset"
          style={{ cursor: "pointer" }}
          onClick={() => router.push("/login")}
        />
      ) : (
        <Message compact content="Reset password" color="black" />
      )}

      {!success && (
        <Form
          loading={loading}
          onSubmit={resetPassword}
          error={errorMsg !== null}
        >
          <Message compact color="black" content={errorMsg} />
          <Segment>
            <Form.Input
              fluid
              icon="eye"
              type="password"
              iconPosition="right"
              label="New Password"
              name="field1"
              onChange={handleChange}
              value={field1}
              required
            />
            <Form.Input
              fluid
              icon="eye"
              type="password"
              iconPosition="right"
              label="Confirm Password"
              name="field2"
              onChange={handleChange}
              value={field2}
              required
            />
            <Divider hidden />
            <Button
              disabled={field1 === "" || field2 === "" || loading}
              type="submit"
              color="red"
              content="Reset"
            />
          </Segment>
        </Form>
      )}
    </>
  );
}

export default TokenPage;
