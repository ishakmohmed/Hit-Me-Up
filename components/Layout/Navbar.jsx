import { Menu, Container } from "semantic-ui-react";
import { useRouter } from "next/router";
import Link from "next/link";

function Navbar() {
  const router = useRouter();

  const isActive = route => router.pathname === route;

  return (
    <Menu secondary style={{ marginLeft: "2rem" }}>
      <Container text style={{ margin: "2rem" }}>
        <Link href="/login">
          <Menu.Item header active={isActive("/login")}>
            Login
          </Menu.Item>
        </Link>

        <Link href="/signup">
          <Menu.Item header active={isActive("/signup")}>
            Signup
          </Menu.Item>
        </Link>
      </Container>
    </Menu>
  );
}

export default Navbar;
