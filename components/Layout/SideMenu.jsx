import { List } from "semantic-ui-react";
import {
  MdHome,
  MdMessage,
  MdNotificationsActive,
  MdAccountCircle,
  MdArrowForward,
} from "react-icons/md";
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
            <MdHome size="3rem" />
          </List.Item>
        </Link>
        <br />

        <List.Item active={isActive("/messages")} as="a" href="/messages">
          <MdMessage size="3rem" />
        </List.Item>

        <br />

        <Link href="/notifications">
          <List.Item active={isActive("/notifications")}>
            <MdNotificationsActive size="3rem" />
          </List.Item>
        </Link>
        <br />

        <Link href={`/${username}`}>
          <List.Item active={router.query.username === username}>
            <MdAccountCircle size="3rem" />
          </List.Item>
        </Link>
        <br />

        <List.Item onClick={() => logoutUser(email)}>
          <MdArrowForward size="3rem" />
        </List.Item>
      </List>
    </>
  );
}

export default SideMenu;
