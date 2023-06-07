import axios from "axios";
import React, { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Cookies from "universal-cookie";
import CartModal from "./CartModal";

function HomeNavBar() {
  const [categories, setCategories] = useState();
  const [user, setUser] = useState();
  const { cart } = useSelector((item) => item.user);
  const [showCart, setshowCart] = useState(false);

  const handleCloseCart = () => {
    setshowCart(false);
  };
  const cookies = new Cookies();
  const [userCookie, setUserCookie] = useState(
    cookies.get("jwt_authorization")
  );

  useEffect(() => {
    axios.get("http://127.0.0.1:8080/api/category/get/all").then((response) => {
      setCategories(response.data);
    });

    axios
      .get("http://127.0.0.1:9192/decode", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookies.get("jwt_authorization"),
        },
        params: {
          jwtToken: cookies.get("jwt_authorization"),
        },
      })
      .then((response) => {
        console.log(response.data)
        setUser(response.data);
      })
      .catch((error) => {
        console.error("LoginError",error);
      });
  }, [cart]);

  const logOut = () => {
    console.log(userCookie);
    setUser(null);
    cookies.remove("jwt_authorization");
    window.location.reload();
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" className=" container">
        <Navbar.Brand href="#home">
          <img
            src="https://www.samsung.com/etc.clientlibs/samsung/clientlibs/consumer/global/clientlib-common/resources/images/gnb-desktop-120x32.png"
            alt="logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav className="me-auto">
            {categories !== "" ? (
              <>
                {categories !== undefined
                  ? categories.map((category) => (
                      <NavDropdown
                        className="custom-dropdown"
                        title={category.categoryname}
                        id="collasible-nav-dropdown"
                      >
                        {category.subCategories.map((subcategor) => (
                          <>
                            <Link
                              to={"/products/" + subcategor.id}
                              className="navbar-subcategory"
                            >
                              {subcategor.subCategoryName}
                              <br></br>
                            </Link>
                          </>
                        ))}
                      </NavDropdown>
                    ))
                  : ""}
              </>
            ) : (
              ""
            )}
          </Nav>
          <Nav className="me-auto cart-section">
            <Nav.Link eventKey={2} href="#memes">
              <i className="bi bi-search" />
            </Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              <i className="bi bi-heart" />
            </Nav.Link>
            <i className="bi bi-cart mt-2 " />
            {cart.length !==0 ? (
              <span className="cart-span text-center text-white">
                {cart.length !==0 ? cart.length : ""}
              </span>
            ) : (
              ""
            )}
            <NavDropdown onClick={() => setshowCart(true)}></NavDropdown>

            {userCookie === undefined || userCookie === "" ? (
              <Nav.Item>
                <Link className="nav-link" to={"/login"}>
                  Log in
                </Link>
              </Nav.Item>
            ) : (
              <>
                <i className="bi bi-person mt-2"></i>
                <NavDropdown>
                  <NavDropdown.Item>{user?.name+" "+user?.lastName}</NavDropdown.Item>
                  <NavDropdown.Divider></NavDropdown.Divider>
                  <NavDropdown.Item onClick={() => logOut()}>
                    Log out
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <div className="container">
        <CartModal showCart={showCart} handleCloseCart={handleCloseCart} />
      </div>
    </>
  );
}

export default HomeNavBar;
