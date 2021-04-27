import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container } from "react-bootstrap";

function Header() {
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

              <LinkContainer
                to="/login"
                style={{ fontSize: "1.5rem", marginRight: "0.5rem" }}
              >
                <Nav.Link>
                  <i class="fas fa-user-tie"></i>
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
