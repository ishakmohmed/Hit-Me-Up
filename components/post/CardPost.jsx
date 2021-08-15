import { useState } from "react";
import {
  Card,
  Icon,
  Image,
  Divider,
  Segment,
  Button,
  Popup,
  Header,
  Modal,
} from "semantic-ui-react";
import Link from "next/link";

import PostComments from "./PostComments";
import CommentInputField from "./CommentInputField";
import calculateTime from "../../utils/calculateTime";
import { deletePost, likePost } from "../../utils/postActions";
import LikesList from "./LikesList";
import ImageModal from "./ImageModal";
import NoImageModal from "./NoImageModal";

function CardPost({ post, user, setPosts, setShowToastr, socket }) {
  const [likes, setLikes] = useState(post.likes);
  const isLiked =
    likes.length > 0 &&
    likes.filter((like) => like.user === user._id).length > 0;
  const [comments, setComments] = useState(post.comments);
  const [showModal, setShowModal] = useState(false);
  const addPropsToModal = () => ({
    post,
    user,
    setLikes,
    likes,
    isLiked,
    comments,
    setComments,
  });

  return (
    <>
      {showModal && (
        <Modal
          open={showModal}
          closeIcon
          closeOnDimmerClick
          onClose={() => setShowModal(false)}
        >
          <Modal.Content>
            {post.picUrl ? (
              <ImageModal {...addPropsToModal()} />
            ) : (
              <NoImageModal {...addPropsToModal()} />
            )}
          </Modal.Content>
        </Modal>
      )}

      <Segment basic>
        <Card color="red" fluid>
          {post.picUrl && (
            <Image
              src={post.picUrl}
              style={{ cursor: "pointer" }}
              floated="left"
              wrapped
              ui={false}
              alt="PostImage"
              onClick={() => setShowModal(true)}
            />
          )}

          <Card.Content>
            <Image
              floated="left"
              src={post.user.profilePicUrl}
              avatar
              circular
            />

            {(user.role === "root" || post.user._id === user._id) && (
              <>
                <Popup
                  on="click"
                  position="top right"
                  trigger={
                    <Icon
                      color="red"
                      size="large"
                      name="trash alternate"
                      style={{ float: "right" }}
                    />
                  }
                >
                  <Header as="h4" content="Confirm?" />
                  <Button
                    color="red"
                    content="Delete"
                    onClick={() =>
                      deletePost(post._id, setPosts, setShowToastr)
                    }
                  />
                </Popup>
              </>
            )}

            <Card.Header>
              <Link href={`/${post.user.username}`}>
                <h4>
                  <a style={{ color: "#3943B7" }}>{post.user.name}</a>
                </h4>
              </Link>
            </Card.Header>
            <Card.Meta>{calculateTime(post.createdAt)}</Card.Meta>

            {post.location && (
              <Card.Meta
                style={{ fontStyle: "italic" }}
                content={post.location}
              />
            )}

            <Card.Description
              style={{
                fontSize: "1.25rem",
                fontWeight: "bold",
                color: "black",
              }}
            >
              {post.text}
            </Card.Description>
          </Card.Content>

          <Card.Content extra>
            <Icon
              name={isLiked ? "heart" : "heart outline"}
              color="red"
              size="large"
              style={{ cursor: "pointer" }}
              onClick={() => {
                if (socket.current) {
                  socket.current.emit("likePost", {
                    postId: post._id,
                    userId: user._id,
                    like: isLiked ? false : true,
                  });

                  socket.current.on("postLiked", () => {
                    if (isLiked)
                      setLikes((prev) =>
                        prev.filter((like) => like.user !== user._id)
                      );
                    else setLikes((prev) => [...prev, { user: user._id }]);
                  });
                } else {
                  likePost(
                    post._id,
                    user._id,
                    setLikes,
                    isLiked ? false : true
                  );
                }
              }}
            />
            <LikesList
              postId={post._id}
              trigger={
                likes.length > 0 && (
                  <span className="spanLikesList">
                    {`${likes.length} ${likes.length === 1 ? "like" : "likes"}`}
                  </span>
                )
              }
            />

            {comments.length > 0 &&
              comments.map(
                (comment, i) =>
                  i < 3 && (
                    <PostComments
                      key={comment._id}
                      comment={comment}
                      postId={post._id}
                      user={user}
                      setComments={setComments}
                    />
                  )
              )}

            {comments.length > 3 && (
              <Button
                content="More"
                color="blue"
                circular
                onClick={() => setShowModal(true)}
              />
            )}

            <Divider hidden />
            <CommentInputField
              user={user}
              postId={post._id}
              setComments={setComments}
            />
          </Card.Content>
        </Card>
      </Segment>
      <Divider hidden />
    </>
  );
}

export default CardPost;
