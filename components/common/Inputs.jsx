import { Form, Button, TextArea, Divider } from "semantic-ui-react";

function Inputs({
  user: { bio, instagram, twitter },
  handleChange,
  showSocialLinks,
  setShowSocialLinks,
}) {
  return (
    <>
      <Form.Field
        required
        control={TextArea}
        name="bio"
        value={bio}
        onChange={handleChange}
        placeholder="bio"
      />
      <Button
        content="Add social media handles (optional)"
        color="green"
        icon="world"
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
        </>
      )}
    </>
  );
}

export default Inputs;
