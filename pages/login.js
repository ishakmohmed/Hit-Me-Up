import { useState, useEffect } from "react";
import { Form, Button, Message, Segment, Divider } from "semantic-ui-react";

import { loginUser } from "../utils/authUser";
import { FooterMessage } from "../components/common/Welcome";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const isUser = Object.values({ email, password }).every((item) =>
      Boolean(item)
    );
    isUser ? setSubmitDisabled(false) : setSubmitDisabled(true);
  }, [user]);

  const handleSubmit = async (e) => {    
    e.preventDefault();

    await loginUser(user, setErrorMsg, setFormLoading);
  };

  return (
    <>
      <Form
        loading={formLoading}
        error={errorMsg !== null}
        onSubmit={handleSubmit}
      >
        <Message
          error
          header="Error"
          content={errorMsg}
          onDismiss={() => setErrorMsg(null)}
        />
        <Segment>
          <Form.Input
            required
            label="Email"
            placeholder="masteruser@email.com"
            name="email"
            value={email}
            onChange={handleChange}
            fluid
            type="email"
          />
          <Form.Input
            label="Password"
            placeholder="Masteruser975"
            name="password"
            value={password}
            onChange={handleChange}
            fluid
            icon={{
              name: "eye",
              link: true,
              onClick: () => setShowPassword(!showPassword),
            }}
            type={showPassword ? "text" : "password"}
            required
          />
          <Divider hidden />
          <Button
            content="Login"
            type="submit"
            color="green"
            disabled={submitDisabled}
          />
        </Segment>
      </Form>
      <FooterMessage />
    </>
  );
}

export default Login;
