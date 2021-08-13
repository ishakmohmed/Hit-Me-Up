import { Comment, Icon, List } from "semantic-ui-react";
import { useRouter } from "next/router";

function Chat({ chat, connectedUsers, deleteChat }) {
  const router = useRouter();
  const isOnline =
    connectedUsers.length > 0 &&
    connectedUsers.filter((user) => user.userId === chat.messagesWith).length >
      0;

  return (
    <>
      <List selection>
        <List.Item
          active={router.query.message === chat.messagesWith}
          onClick={() =>
            router.push(`/messages?message=${chat.messagesWith}`, undefined, {
              shallow: true,
            })
          }
        >
          <Comment>
            <Comment.Avatar src={chat.profilePicUrl} />
            <Comment.Content>
              <Comment.Author as="a">
                {chat.name.length > 10
                  ? `${chat.name.substring(0, 10)}... `
                  : `${chat.name}`}
                {isOnline && <Icon name="circle" size="small" color="green" />}
              </Comment.Author>

              <Comment.Metadata>
                <div
                  style={{
                    position: "absolute",
                    right: "0",
                    cursor: "pointer",
                  }}
                >
                  <Icon
                    name="trash"
                    color="red"
                    size="large"
                    onClick={() => deleteChat(chat.messagesWith)}
                  />
                </div>
              </Comment.Metadata>

              <Comment.Text style={{ fontColor: "gray" }}>
                {chat.lastMessage.length > 20
                  ? `${chat.lastMessage.substring(0, 20)}...`
                  : chat.lastMessage}
              </Comment.Text>
            </Comment.Content>
          </Comment>
        </List.Item>
      </List>
    </>
  );
}

export default Chat;
