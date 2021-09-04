import { Menu, Container, Icon, Dropdown } from "semantic-ui-react";
import { useRouter } from "next/router";
import Link from "next/link";

import { logoutUser } from "../../utils/authUser";

function MobileHeader({
  user: { unreadNotification, email, unreadMessage, username },
}) {
  const router = useRouter();
  const isActive = (route) => router.pathname === route;

  return (
    <>
      <Menu fluid borderless>
        <Container text>
          <Link href="/">
            <Menu.Item active={isActive("/")}>
              <p>Home</p>
            </Menu.Item>
          </Link>
          <Link href="/messages">
            <Menu.Item active={isActive("/messages") || unreadMessage}>
              <p>Mail</p>
            </Menu.Item>
          </Link>
          <Link href="/notifications">
            <Menu.Item
              active={isActive("/notifications") || unreadNotification}
            >
              <p>Alerts</p>
            </Menu.Item>
          </Link>
          <Dropdown item icon="bars" direction="left">
            <Dropdown.Menu>
              <Link href={`/${username}`}>
                <Dropdown.Item active={isActive(`/${username}`)}>
                  Account
                </Dropdown.Item>
              </Link>
              <Link href="/search">
                <Dropdown.Item active={isActive("/search")}>
                  Search
                </Dropdown.Item>
              </Link>
              <Dropdown.Item onClick={() => logoutUser(email)}>
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Container>
      </Menu>
    </>
  );
}

export default MobileHeader;
