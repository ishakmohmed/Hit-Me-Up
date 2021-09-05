import { List } from "semantic-ui-react";
import Link from "next/link";
import { useRouter } from "next/router";

import { logoutUser } from "../../utils/authUser";

function SideMenu({ user: { email, username } }) {
  const router = useRouter();
  const isActive = (route) => router.pathname === route;

  return (
    <>
      <List style={{ paddingTop: "1rem" }} selection>
        <Link href="/">
          <List.Item active={isActive("/")}>
            <p style={{ textAlign: "center" }}>Home</p>
          </List.Item>
        </Link>
        <br />

        <List.Item active={isActive("/messages")} as="a" href="/messages">
          <p style={{ textAlign: "center" }}>Chat</p>
        </List.Item>
        <br />

        <Link href="/notifications">
          <List.Item active={isActive("/notifications")}>
            <p style={{ textAlign: "center" }}>Alerts</p>
          </List.Item>
        </Link>
        <br />

        <Link href={`/${username}`}>
          <List.Item active={router.query.username === username}>
            <p style={{ textAlign: "center" }}>Profile</p>
          </List.Item>
        </Link>
        <br />

        <List.Item onClick={() => logoutUser(email)}>
          <p style={{ textAlign: "center" }}>Logout</p>
        </List.Item>
      </List>
    </>
  );
}

export default SideMenu;
