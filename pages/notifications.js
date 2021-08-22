import { Fragment, useEffect, useState } from "react";
import { Feed, Segment, Divider, Container } from "semantic-ui-react";
import axios from "axios";
import { parseCookies } from "nookies";
import cookie from "js-cookie";

import baseUrl from "../utils/baseUrl";
import { NoNotifications } from "../components/layout/NoData";
import LikeNotification from "../components/notifications/LikeNotification";
import CommentNotification from "../components/notifications/CommentNotification";
import FollowerNotification from "../components/notifications/FollowerNotification";

function Notifications({ notifications, userFollowStats }) {
  const [loggedUserFollowStats, setUserFollowStats] = useState(userFollowStats);

  useEffect(() => {
    const notificationRead = async () => {
      try {
        await axios.post(
          `${baseUrl}/api/notifications`,
          {},
          { headers: { Authorization: cookie.get("token") } }
        );
      } catch (error) {
        console.log(error);
      }
    };

    notificationRead();
  }, []);

  return (
    <>
      <Container style={{ marginTop: "2rem" }}>
        {notifications.length > 0 ? (
          <Segment>
            <div
              style={{
                maxHeight: "40rem",
                overflow: "auto",
                height: "40rem",
                position: "relative",
                width: "100%",
              }}
            >
              <Feed size="small">
                {notifications.map((notification) => (
                  <Fragment key={notification._id}>
                    {notification.type === "newLike" &&
                      notification.post !== null && (
                        <LikeNotification notification={notification} />
                      )}

                    {notification.type === "newComment" &&
                      notification.post !== null && (
                        <CommentNotification notification={notification} />
                      )}

                    {notification.type === "newFollower" && (
                      <FollowerNotification
                        notification={notification}
                        loggedUserFollowStats={loggedUserFollowStats}
                        setUserFollowStats={setUserFollowStats}
                      />
                    )}
                  </Fragment>
                ))}
              </Feed>
            </div>
          </Segment>
        ) : (
          <NoNotifications />
        )}
      </Container>
    </>
  );
}

Notifications.getInitialProps = async (ctx) => {
  try {
    const { token } = parseCookies(ctx);
    const res = await axios.get(`${baseUrl}/api/notifications`, {
      headers: { Authorization: token },
    });

    return { notifications: res.data };
  } catch (error) {
    return { errorLoading: true };
  }
};

export default Notifications;
