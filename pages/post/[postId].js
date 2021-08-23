import { useState } from "react";
import axios from "axios";
import { parseCookies } from "nookies";
import {
  Card,
  Icon,
  Image,
  Divider,
  Segment,
  Container,
} from "semantic-ui-react";
import Link from "next/link";

import PostComments from "../../components/post/PostComments";
import CommentInputField from "../../components/post/CommentInputField";
import LikesList from "../../components/post/LikesList";
import { likePost } from "../../utils/postActions";
import calculateTime from "../../utils/calculateTime";
import baseUrl from "../../utils/baseUrl";
import { NoPostFound } from "../../components/layout/NoData";

function PostPage({ post, errorLoading, user }) {
  if (errorLoading) return <NoPostFound />;

  const [likes, setLikes] = useState(post.likes);
  const isLiked =
    likes.length > 0 &&
    likes.filter((like) => like.user === user._id).length > 0;
  const [comments, setComments] = useState(post.comments);

  return (
    <Container text>
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
              onClick={() =>
                likePost(post._id, user._id, setLikes, isLiked ? false : true)
              }
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
              comments.map((comment) => (
                <PostComments
                  key={comment._id}
                  comment={comment}
                  postId={post._id}
                  user={user}
                  setComments={setComments}
                />
              ))}
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
    </Container>
  );
}

PostPage.getInitialProps = async (ctx) => {
  try {
    const { postId } = ctx.query;
    const { token } = parseCookies(ctx);
    const res = await axios.get(`${baseUrl}/api/posts/${postId}`, {
      headers: { Authorization: token },
    });

    return { post: res.data };
  } catch (error) {
    return { errorLoading: true };
  }
};

export default PostPage;
