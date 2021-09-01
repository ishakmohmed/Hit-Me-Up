import { useState } from "react";
import { Form, Modal, Segment, List, Icon } from "semantic-ui-react";
import Link from "next/link";

import calculateTime from "../../utils/calculateTime";

function MessageNotificationModal({
  socket,
  showNewMessageModal,
  newMessageModal,
  newMessageReceived,
  user,
}) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const onModalClose = () => showNewMessageModal(false);

  const formSubmit = (e) => {
    e.preventDefault();

    if (socket.current) {
      socket.current.emit("sendMsgFromNotification", {
        userId: user._id,
        msgSendToUserId: newMessageReceived.sender,
        msg: text,
      });

      socket.current.on("msgSentFromNotification", () => {
        showNewMessageModal(false);
      });
    }
  };

  return (
    <>
      <Modal
        size="small"
        open={newMessageModal}
        onClose={onModalClose}
        closeIcon
        closeOnDimmerClick
      >
        <Modal.Header
          content={`New message from ${newMessageReceived.senderName}`}
        />
        <Modal.Content>
          <div className="bubbleWrapper">
            <div className="inlineContainer">
              <img
                className="inlineIcon"
                src={newMessageReceived.senderProfilePic}
              />
            </div>
            <div className="otherBubble other">{newMessageReceived.msg}</div>
            <span className="other">
              {calculateTime(newMessageReceived.date)}
            </span>
          </div>
          <div style={{ position: "sticky", bottom: "0px" }}>
            <Segment secondary color="red" attached="bottom">
              <Form reply onSubmit={formSubmit}>
                <Form.Input
                  size="small"
                  placeholder="Reply..."
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
          <div style={{ marginTop: "5px" }}>
            <Link href={`/messages?message=${newMessageReceived.sender}`}>
              <a>Go to inbox</a>
            </Link>
            <br />
            <Instructions username={user.username} />
          </div>
        </Modal.Content>
      </Modal>
    </>
  );
}

const Instructions = ({ username }) => (
  <List>
    <List.Item>
      <List.Content>
        If you don't like to receive this annoying popup, go to
        <Link href={`/${username}`}>
          <a> Profile </a>
        </Link>
        and under the settings tab, turn off option to popup new messages
      </List.Content>
    </List.Item>
  </List>
);

export default MessageNotificationModal;