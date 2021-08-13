import { Form, Button, Message, TextArea, Divider } from "semantic-ui-react";

function CommonInputs({
  user: { bio, instagram, twitter },
  handleChange,
  showSocialLinks,
  setShowSocialLinks
}) {
  return (
    <>
      <Form.Field
        required
        control={TextArea}
        name="bio"
        value={bio}
        onChange={handleChange}
        placeholder="Insert bio here..."
      />
      <Button
        content="Add social handles"
        color="blue"
        type="button"
        onClick={() => setShowSocialLinks(!showSocialLinks)}
      />

      {showSocialLinks && (
        <>
          <Divider />
          <Form.Input
            icon="twitter"
            iconPosition="left"
            name="twitter"
            value={twitter}
            onChange={handleChange}
          />
          <Form.Input
            icon="instagram"
            iconPosition="left"
            name="instagram"
            value={instagram}
            onChange={handleChange}
          />
          <Message
            compact
            color="black"
            content="Twitter and Instagram handles are optional"
          />
        </>
      )}
    </>
  );
}

export default CommonInputs;
