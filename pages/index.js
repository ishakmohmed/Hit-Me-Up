import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import axios from "axios";
import { Segment } from "semantic-ui-react";
import { parseCookies } from "nookies";
import InfiniteScroll from "react-infinite-scroll-component";
import cookie from "js-cookie";

import baseUrl from "../utils/baseUrl";
import CreatePost from "../components/post/CreatePost";
import CardPost from "../components/post/CardPost";
import { NoPosts } from "../components/layout/NoData";
import { PostDeleteToastr } from "../components/layout/Toastr";
import {
  PlaceHolderPosts,
  EndMessage,
} from "../components/layout/PlaceHolderGroup";
import getUserInfo from "../utils/getUserInfo";
import MessageNotificationModal from "../components/home/MessageNotificationModal";
import newMsgSound from "../utils/newMsgSound";
import NotificationPortal from "../components/home/NotificationPortal";

function Index({ user, postsData, errorLoading }) {
  const [posts, setPosts] = useState(postsData || []);
  const [showToastr, setShowToastr] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [pageNumber, setPageNumber] = useState(2);
  const [newMessageReceived, setNewMessageReceived] = useState(null);
  const [newMessageModal, showNewMessageModal] = useState(false);
  const [newNotification, setNewNotification] = useState(null);
  const [notificationPopup, showNotificationPopup] = useState(false);
  const socket = useRef();

  useEffect(() => {
    if (!socket.current) socket.current = io(baseUrl);
    if (socket.current) {
      socket.current.emit("join", { userId: user._id });
      socket.current.on("newMsgReceived", async ({ newMsg }) => {
        const { name, profilePicUrl } = await getUserInfo(newMsg.sender);

        if (user.newMessagePopup) {
          setNewMessageReceived({
            ...newMsg,
            senderName: name,
            senderProfilePic: profilePicUrl,
          });
          showNewMessageModal(true);
        }

        newMsgSound(name);
      });
    }

    document.title = `Welcome, ${user.name.split(" ")[0]}`;
  }, []);

  useEffect(() => {
    showToastr && setTimeout(() => setShowToastr(false), 3000);
  }, [showToastr]);

  const fetchDataOnScroll = async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/posts`, {
        headers: { Authorization: cookie.get("token") },
        params: { pageNumber },
      });

      if (res.data.length === 0) setHasMore(false);

      setPosts((prev) => [...prev, ...res.data]);
      setPageNumber((prev) => prev + 1);
    } catch (error) {
      alert("Error loading posts");
    }
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on(
        "newNotificationReceived",
        ({ name, profilePicUrl, username, postId }) => {
          setNewNotification({ name, profilePicUrl, username, postId });
          showNotificationPopup(true);
        }
      );
    }
  }, []);

  return (
    <>
      {notificationPopup && newNotification !== null && (
        <NotificationPortal
          newNotification={newNotification}
          notificationPopup={notificationPopup}
          showNotificationPopup={showNotificationPopup}
        />
      )}

      {showToastr && <PostDeleteToastr />}

      {newMessageModal && newMessageReceived !== null && (
        <MessageNotificationModal
          socket={socket}
          showNewMessageModal={showNewMessageModal}
          newMessageModal={newMessageModal}
          newMessageReceived={newMessageReceived}
          user={user}
        />
      )}

      <Segment>
        <CreatePost user={user} setPosts={setPosts} />

        {posts.length === 0 || errorLoading ? (
          <NoPosts />
        ) : (
          <InfiniteScroll
            hasMore={hasMore}
            next={fetchDataOnScroll}
            loader={<PlaceHolderPosts />}
            endMessage={<EndMessage />}
            dataLength={posts.length}
          >
            {posts.map((post) => (
              <CardPost
                socket={socket}
                key={post._id}
                post={post}
                user={user}
                setPosts={setPosts}
                setShowToastr={setShowToastr}
              />
            ))}
          </InfiniteScroll>
        )}
      </Segment>
    </>
  );
}

Index.getInitialProps = async (ctx) => {
  try {
    const { token } = parseCookies(ctx);
    const res = await axios.get(`${baseUrl}/api/posts`, {
      headers: { Authorization: token },
      params: { pageNumber: 1 },
    });

    return { postsData: res.data };
  } catch (error) {
    return { errorLoading: true };
  }
};

export default Index;
