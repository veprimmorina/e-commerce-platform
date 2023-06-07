import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import Cookies from "universal-cookie";

function NavBar() {

  
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
        className="shadow "
      >
        <Navbar.Brand href="#home">Admin Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav className="me-auto">
            <Nav.Link href="#features">
              <i className="bi bi-bell" />
            </Nav.Link>
            <Nav.Link href="#pricing">
              <i className="bi bi-tag-fill" />
            </Nav.Link>
            <NavDropdown title="Dropdown" className="text-white">
              <NavDropdown.Item href="#action/3.1"></NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav className="me-auto">
            <Nav.Link eventKey={2} href="#memes">
              <input type="text" className="rounded" />
              <button className="btn btn-primary " style={{height: "30px", width: "40px"}}>
                <i className="bi bi-search" />
              </button>
            </Nav.Link>
            <Nav.Link>
              <img
                src="https://www.aperturephoto.it/wp-content/uploads/2016/09/samsung-logo-300x300.png"
                alt="profile-picture"
                className="img-fluid rounded-circle"
                width={45}
              />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default NavBar;
