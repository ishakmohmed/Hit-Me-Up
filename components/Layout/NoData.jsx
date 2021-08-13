import { Message } from "semantic-ui-react";

export const NoProfilePosts = () => (
  <>
    <Message compact color="black" content="User has not posted anything" />
  </>
);

export const NoFollowData = ({ followersComponent, followingComponent }) => (
  <>
    {followersComponent && (
      <Message compact color="black" content="User has no followers" />
    )}
    
    {followingComponent && (
      <Message compact color="black" content="User does not follow anyone" />
    )}
  </>
);

export const NoMessages = () => (
  <Message
    compact
    color="black"
    content="You have not message anyone, so search a user and start texting"
  />
);

export const NoPosts = () => (
  <Message
    compact
    color="black"
    content="No posts, because you have not followed anyone"
  />
);

export const NoProfile = () => (
  <Message compact color="black" content="Profile not found" />
);

export const NoNotifications = () => (
  <Message compact color="black" content="No notifications" />
);

export const NoPostFound = () => (
  <Message compact color="black" content="No post found" />
);