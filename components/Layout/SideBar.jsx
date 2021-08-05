import { List } from "semantic-ui-react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  MdHome,
  MdMessage,
  MdNotifications,
  MdPerson,
  MdCancel,
} from "react-icons/md";

import { logoutUser } from "../../utils/authUser";

function SideBar({
  user: { unreadNotification, email, unreadMessage, username },
}) {
  const router = useRouter();
  const isActive = (route) => router.pathname === route;

  return (
    <>
      <List
        style={{ paddingTop: "1rem" }}
        size="big"
        verticalAlign="middle"
        selection
      >
        <Link href="/">
          <List.Item active={isActive("/")}>
            <MdHome fontSize="2rem" color="#1E555C" />
          </List.Item>
        </Link>
        <br />

        <Link href="/messages">
          <List.Item active={isActive("/messages")}>
            <MdMessage fontSize="2rem" color="#1E555C" />
          </List.Item>
        </Link>
        <br />

        <Link href="/notifications">
          <List.Item active={isActive("/notifications")}>
            <MdNotifications fontSize="2rem" color="#1E555C" />
          </List.Item>
        </Link>
        <br />

        <Link href={`/${username}`}>
          <List.Item active={router.query.username === username}>
            <MdPerson fontSize="2rem" color="#1E555C" />
          </List.Item>
        </Link>
        <br />

        <List.Item onClick={() => logoutUser(email)}>
          <MdCancel fontSize="2rem" color="#1E555C" />
        </List.Item>
      </List>
    </>
  );
}

export default SideBar;
