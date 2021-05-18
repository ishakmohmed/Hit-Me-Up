import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { logout } from "../actions/user";

function Header() {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar
        collapseOnSelect
        className="navbar navbar-expand-lg navbar-light bg-light"
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>UNITAR MerchHouse</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <LinkContainer
                to="/cart"
                style={{ fontSize: "1.5rem", marginRight: "0.5rem" }}
              >
                <Nav.Link>
                  <i class="fas fa-shopping-bag"></i>
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name}>
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer
                  to="/login"
                  style={{ fontSize: "1.5rem", marginRight: "0.5rem" }}
                >
                  <Nav.Link>
                    <i class="fas fa-user-tie"></i>
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
