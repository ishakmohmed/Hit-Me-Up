import { useState } from "react";
import { Comment, Icon } from "semantic-ui-react";

import calculateTime from "../../utils/calculateTime";
import { deleteComment } from "../../utils/postActions";

function PostComments({ comment, user, setComments, postId }) {
  const [disabled, setDisabled] = useState(false);

  return (
    <>
      <Comment.Group>
        <Comment>
          <Comment.Content>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div>
                <Comment.Author as="a" href={`/${comment.user.username}`}>
                  {comment.user.name}
                </Comment.Author>
                <Comment.Metadata>
                  {calculateTime(comment.date)}
                </Comment.Metadata>
                <Comment.Text style={{ fontStyle: "italic" }}>
                  {comment.text}
                </Comment.Text>
              </div>
              <div style={{ marginLeft: "1rem" }}>
                <Comment.Actions>
                  <Comment.Action>
                    {(user.role === "root" ||
                      comment.user._id === user._id) && (
                      <Icon
                        disabled={disabled}
                        color="red"
                        name="trash alternate"
                        onClick={async () => {
                          setDisabled(true);
                          await deleteComment(postId, comment._id, setComments);
                          setDisabled(false);
                        }}
                      />
                    )}
                  </Comment.Action>
                </Comment.Actions>
              </div>
            </div>
          </Comment.Content>
        </Comment>
      </Comment.Group>
    </>
  );
}

export default PostComments;
