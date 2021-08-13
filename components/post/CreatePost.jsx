import { useState, useRef } from "react";
import { Form, Button, Image, Divider, Message, Icon } from "semantic-ui-react";

import uploadPic from "../../utils/uploadPicToCloudinary";
import { submitNewPost } from "../../utils/postActions";
import CropImageModal from "./CropImageModal";

function CreatePost({ user, setPosts }) {
  const [newPost, setNewPost] = useState({ text: "", location: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [highlighted, setHighlighted] = useState(false);
  const [media, setMedia] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const inputRef = useRef();

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "media") {
      if (files && files.length > 0) {
        setMedia(files[0]);
        setMediaPreview(URL.createObjectURL(files[0]));
      }
    }

    setNewPost((prev) => ({ ...prev, [name]: value }));
  };

  const addStyles = () => ({
    textAlign: "center",
    height: "200px",
    width: "200px",
    margin: "1rem",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    paddingTop: media === null && "60px",
    cursor: "pointer",
    borderColor: highlighted ? "green" : "black",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let picUrl;

    if (media !== null) {
      picUrl = await uploadPic(media);

      if (!picUrl) {
        setLoading(false);

        return setError("Error uploading");
      }
    }

    await submitNewPost(
      newPost.text,
      newPost.location,
      picUrl,
      setPosts,
      setNewPost,
      setError
    );
    setMedia(null);
    mediaPreview && URL.revokeObjectURL(mediaPreview);
    setTimeout(() => setMediaPreview(null), 3000);
    setLoading(false);
  };

  return (
    <>
      <center>
        {showModal && (
          <CropImageModal
            mediaPreview={mediaPreview}
            setMedia={setMedia}
            showModal={showModal}
            setShowModal={setShowModal}
          />
        )}
        <Form error={error !== null} onSubmit={handleSubmit}>
          <Message error onDismiss={() => setError(null)} content={error} />
          <Form.Group>
            <Image src={user.profilePicUrl} avatar inline />
            <Form.TextArea
              placeholder="Type a nice caption..."
              name="text"
              value={newPost.text}
              onChange={handleChange}
              rows={2}
              width={14}
            />
          </Form.Group>
          <Form.Group style={{ justifyContent: "center" }}>
            <Form.Input
              value={newPost.location}
              name="location"
              onChange={handleChange}
              label="Location"
              icon="map marker alternate"
              placeholder="e.g. Kuala Lumpur"
            />
            <input
              ref={inputRef}
              onChange={handleChange}
              name="media"
              style={{ display: "none" }}
              type="file"
              accept="image/*"
            />
          </Form.Group>
          <div
            onClick={() => inputRef.current.click()}
            style={addStyles()}
            onDragOver={(e) => {
              e.preventDefault();
              setHighlighted(true);
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              setHighlighted(false);
            }}
            onDrop={(e) => {
              e.preventDefault();
              setHighlighted(true);

              const droppedFile = Array.from(e.dataTransfer.files);

              setMedia(droppedFile[0]);
              setMediaPreview(URL.createObjectURL(droppedFile[0]));
            }}
          >
            {media === null ? (
              <Icon name="image" size="big" />
            ) : (
              <Image
                style={{ height: "150px", width: "150px" }}
                src={mediaPreview}
                alt="PostImage"
                centered
                size="medium"
              />
            )}
          </div>

          {mediaPreview !== null && (
            <>
              <Divider hidden />
              <Button
                content="Crop first"
                type="button"
                primary
                circular
                onClick={() => setShowModal(true)}
              />
            </>
          )}
          <Divider hidden />
          <Button
            circular
            disabled={newPost.text === "" || loading}
            content={<strong>Post</strong>}
            style={{ backgroundColor: " #DB222A", color: "white" }}
            loading={loading}
          />
        </Form>
        <Divider />
      </center>
    </>
  ); 
}

export default CreatePost;