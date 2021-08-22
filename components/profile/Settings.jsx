import { useState, useEffect, useRef } from "react";
import {
  List,
  Divider,
  Message,
  Checkbox,
  Form,
  Button,
} from "semantic-ui-react";

import { passwordUpdate, toggleMessagePopup } from "../../utils/profileActions";

function Settings({ newMessagePopup }) {
  const [passwordFields, showPasswordFields] = useState(false);
  const [newMessageSettings, showNewMessageSettings] = useState(false);
  const [popupSetting, setPopupSetting] = useState(newMessagePopup);
  const [success, setSuccess] = useState(false);
  const isFirstRun = useRef(true);

  useEffect(() => {
    success && setTimeout(() => setSuccess(false), 3000);
  }, [success]);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;

      return;
    }
  }, [popupSetting]);

  return (
    <>
      {success && (
        <>
          <Message compact color="black" content="Updated" />
          <Divider hidden />
        </>
      )}

      <List size="small">
        <List.Item>
          <List.Content>
            <List.Header
              onClick={() => showPasswordFields(!passwordFields)}
              as="a"
              content="Update password"
            />
          </List.Content>

          {passwordFields && (
            <UpdatePassword
              setSuccess={setSuccess}
              showPasswordFields={showPasswordFields}
            />
          )}
        </List.Item>
        <Divider />
        <List.Item>
          <List.Content>
            <List.Header
              onClick={() => showNewMessageSettings(!newMessageSettings)}
              as="a"
              content="Popup new messages?"
            />
          </List.Content>
          <div style={{ marginTop: "10px" }}>
            If you turn this on, new messages will popup on your screen.
            <br />
            <br />
            <Checkbox
              checked={popupSetting}
              toggle
              onChange={() =>
                toggleMessagePopup(popupSetting, setPopupSetting, setSuccess)
              }
            />
          </div>
        </List.Item>
        <Divider />
      </List>
    </>
  );
}

const UpdatePassword = ({ setSuccess, showPasswordFields }) => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setError] = useState(null);
  const [userPasswords, setUserPasswords] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const [typed, showTyped] = useState({
    field1: false,
    field2: false,
  });
  const { field1, field2 } = typed;
  const { currentPassword, newPassword } = userPasswords;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserPasswords((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    errorMsg && setTimeout(() => setError(null), 5000);
  }, [errorMsg]);

  return (
    <>
      <Form
        error={errorMsg !== null}
        loading={loading}
        onSubmit={async (e) => {
          e.preventDefault();
          setLoading(true);

          await passwordUpdate(setSuccess, userPasswords);
          setLoading(false);

          showPasswordFields(false);
        }}
      >
        <List.List>
          <List.Item>
            <Form.Input
              fluid
              icon={{
                name: "eye",
                link: true,
                onClick: () =>
                  showTyped((prev) => ({ ...prev, field1: !field1 })),
              }}
              type={field1 ? "text" : "password"}
              iconPosition="right"
              label="Current Password"
              name="currentPassword"
              onChange={handleChange}
              value={currentPassword}
            />
            <Form.Input
              fluid
              icon={{
                name: "eye",
                circular: true,
                link: true,
                onClick: () =>
                  showTyped((prev) => ({ ...prev, field2: !field2 })),
              }}
              type={field2 ? "text" : "password"}
              iconPosition="right"
              label="New Password"
              name="newPassword"
              onChange={handleChange}
              value={newPassword}
            />
            <Button
              disabled={loading || currentPassword === "" || newPassword === ""}
              compact
              type="submit"
              color="red"
              content="Update"
            />
            <Button
              disabled={loading}
              compact
              type="button"
              content="Cancel"
              onClick={() => showPasswordFields(false)}
            />
          </List.Item>
        </List.List>
      </Form>
      <Divider hidden />
    </>
  );
};

export default Settings;
