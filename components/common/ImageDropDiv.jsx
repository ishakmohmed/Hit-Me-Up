import { Button, Form, Segment, Image, Icon, Header } from "semantic-ui-react";

function ImageDropDiv({
  highlighted,
  setHighlighted,
  inputRef,
  handleChange,
  mediaPreview,
  setMediaPreview,
  setMedia,
}) {
  return (
    <>
      <Form.Field>
        <Segment placeholder basic secondary>
          <input
            style={{ display: "none" }}
            type="file"
            accept="image/*"
            onChange={handleChange}
            name="media"
            ref={inputRef}
          />
          <div
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
              if (droppedFile.length > 0) {
                setMedia(droppedFile[0]);
                setMediaPreview(URL.createObjectURL(droppedFile[0]));
              }
            }}
          >
            {mediaPreview === null ? (
              <>
                <Segment
                  {...(highlighted && { color: "green" })}
                  placeholder
                  basic
                >
                  <Header icon>
                    <Icon
                      name="camera"
                      color="grey"
                      style={{ cursor: "pointer" }}
                      onClick={() => inputRef.current.click()}
                    />
                    <Button
                      type="button"
                      color="green"
                      onClick={() => inputRef.current.click()}
                    >
                      Add picture
                    </Button>
                    <h4 style={{ color: "gray" }}>Drag and drop supported</h4>
                  </Header>
                </Segment>
              </>
            ) : (
              <>
                <Segment color="green" placeholder basic>
                  <Image
                    src={mediaPreview}
                    size="medium"
                    centered
                    style={{ cursor: "pointer" }}
                    onClick={() => inputRef.current.click()}
                  />
                </Segment>
              </>
            )}
          </div>
        </Segment>
      </Form.Field>
    </>
  );
}

export default ImageDropDiv;
