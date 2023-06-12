import axios from "axios";
import React from "react";
import { createContext } from "react";
import { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "universal-cookie";
export const MessageContext = createContext();
function Checkout(props) {
  const location = useLocation();
  const [cardNumber, setcardNumber] = useState("");
  const [amount, setamount] = useState();
  const [expMonth, setexpMonth] = useState("");
  const [expYear, setexpYear] = useState("");
  const [cvc, setcvc] = useState("");
  const [customerId, setcustomerId] = useState("");
  const [userEmail, setuserEmail] = useState("");
  const [addressLine1, setaddressLine1] = useState("");
  const [addressLine2, setaddressLine2] = useState("");
  const [state, setstate] = useState("");
  const [postalCode, setpostalCode] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setcountry] = useState("");
  const [name, setname] = useState("");
  const [cart, setCart] = (location.state?.cart) ;
  const [totalPrice, setTotalPrice] = useState(0);
  const [message, setMessage] = useState("Please Wait");
  const [showMessage, setShowMessage] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [validate, setValidate] = useState("");
  const [checkOutButton, setCheckOutButton] = useState(true);
  const img = require("../Images/visa.png");
  const masterCard = require("../Images/master.png");
  const ae = require("../Images/ae.png");
  const discover = require("../Images/Discover-logo.png");
  const logo = require("../Images/logo1.png");
  const cookie = new Cookies()
  const [user, setUser] = useState()
  useEffect(() => {
    let totalPrice = 0;
    cart.forEach((element) => {
      totalPrice += element.productPrice * element.quantity;
    });
    setTotalPrice(totalPrice);
  }, [cart]);

  useEffect(()=> {
    axios
      .get("http://127.0.0.1:9192/decode", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookie.get("jwt_authorization"),
        },
        params: {
          jwtToken: cookie.get("jwt_authorization"),
        },
      })
      .then((response) => {
        console.log(response.data)
        setUser(response.data);
        setFirstName(response.data.name)
        setLastName(response.data.lastName)
        setuserEmail(response.data.sub)
      })
      .catch((error) => {
        console.error("LoginError",error);
      });
  },[])
  const navigate = useNavigate();

  const verifyCheckout = () => {
    if (
      name === "" ||
      firstName === "" ||
      lastName === "" ||
      addressLine1 === "" ||
      addressLine2 === "" ||
      expMonth === "" ||
      expYear === "" ||
      country === "" ||
      postalCode === "" ||
      state === "" ||
      cvc === "" ||
      userEmail === ""
    ) {
      setValidate("Please fill out all necessary fields!");
    } else {
      setCheckOutButton(false);
      setValidate("");
      setMessage("");
      toast.promise(
        new Promise((resolve, reject) => {
          const CheckOutModel = {
            cardNumber: cardNumber,
            amount: totalPrice,
            expMonth: 0 + expMonth,
            expYear: 0 + expYear,
            description: "Order Payment",
            customerId: customerId,
            cvc: 0 + cvc,
            userEmail: user!==undefined ? user.sub : userEmail,
            addressLine1: addressLine1,
            addressLine2: addressLine2,
            city: country,
            state: state,
            postalCode: postalCode,
            country: country,
            name: name,
            productVOList: cart,
          };

          axios
            .post("http://127.0.0.1:7000/api/payments/charge", CheckOutModel)
            .then((response) => {
              toast.success("Completed");
              navigate("/success");
              resolve();
            })
            .catch((error) => {
              setCheckOutButton(true);
              reject(error.response.data);
              toast.error(error.response.data);
            });
        }),
        {
          pending: "Processing...",
          success: "Promise resolved ",
          error: (error) => `Rejected: ${error.message}`,
        }
      );
    }
  };

  return (
    <>
      <div className="container">
        {showMessage && <p>{message}</p>}
        <div className="py-5 text-center">
          <img
            className="d-block mx-auto mb-4"
            src={logo}
            alt=""
            width={120}
          />
          <h2>Checkout form</h2>

          <p className="lead">
            Please confirm your order by filling all nessecary fields
          </p>
        </div>

        <div className="row">
          <div className="col-md-4 order-md-2 mb-4">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted">
                {" "}
                <i className="bi bi-cart"></i> Your cart
              </span>
              <span className="badge badge-secondary badge-pill text-dark">
                {cart.length} products
              </span>
            </h4>
            <ul className="list-group mb-3 sticky-top shadow">
              {cart?.map((item) => (
                <li
                  className="list-group-item d-flex justify-content-between lh-condensed"
                  key={item.id}
                >
                  <img src={item.productImage} alt="product-image" width={80} />
                  <div>
                    <h6 className="my-0">{item.productName}</h6>
                    <small className="text-muted">
                      {item.quantity}X{item.productPrice + " €"}
                    </small>
                  </div>
                  <span className="text-muted">
                    {item.productPrice * item.quantity + " €"}
                  </span>
                </li>
              ))}

              <li className="list-group-item d-flex justify-content-between bg-light">
                <div className="text-success">
                  <h6 className="my-0">Promo code</h6>
                  <small>EXAMPLECODE</small>
                </div>
                <span className="text-success">-$5</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Total </span>
                <strong className="text-success">{totalPrice + " €"}</strong>
              </li>
            </ul>
            <form className="card p-2">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Promo code"
                />
                <div className="input-group-append">
                  <button type="submit" className="btn btn-secondary">
                    Redeem
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="col-md-8 order-md-1 checkout-div shadow-lg">
            <div className="d-flex justify-content-between mt-3 mb-4">
              <img
                src={img}
                alt="visa"
                className="img-fluid payment-methods"
                width={70}
              />
              <img
                src={masterCard}
                alt=""
                className="img-fluid payment-methods"
                width={70}
              />
              <img
                src={ae}
                alt=""
                className="img-fluid payment-methods"
                width={70}
              />
              <img
                src={discover}
                alt=""
                className="img-fluid payment-methods"
                width={70}
              />
            </div>
            <h4 className="mb-3">Billing address</h4>
            <form className="needs-validation" novalidate="">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="firstName">First name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    placeholder=""
                    defaultValue={user?.name}
                    disabled={user!==undefined ? true : false}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />

                  <div className="invalid-feedback">
                    You must agree before submitting.
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="lastName">Last name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    placeholder=""
                    disabled={user!==undefined ? true : false}
                    defaultValue={user?.lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required=""
                  />
                  <div className="invalid-feedback">
                    {" "}
                    Valid last name is required.{" "}
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="username">Email Address</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">@</span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="you@example.com"
                    required
                    defaultValue={user?.sub}
                    disabled={user!==undefined ? true : false}
                    onChange={(e) => setuserEmail(e.target.value)}
                  />
                  <div className="invalid-feedback" style={{ width: "100%" }}>
                    {" "}
                    Your username is required.{" "}
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <div className="invalid-feedback">
                  {" "}
                  Please enter a valid email address for shipping updates.{" "}
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  placeholder="1234 Main St"
                  required=""
                  onChange={(e) => setaddressLine1(e.target.value)}
                />
                <div className="invalid-feedback">
                  {" "}
                  Please enter your shipping address.{" "}
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="address2">
                  Address 2 
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="address2"
                  placeholder="Apartment or suite"
                  onChange={(e) => setaddressLine2(e.target.value)}
                />
              </div>
              <div className="row">
                <div className="col-md-5 mb-3">
                  <label htmlFor="country">Country</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setcountry(e.target.value)}
                  />
                  <div className="invalid-feedback">
                    {" "}
                    Please select a valid country.{" "}
                  </div>
                </div>

                <div className="col-md-4 mb-3">
                  <label htmlFor="state">State</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setstate(e.target.value)}
                  />
                  <div className="invalid-feedback">
                    {" "}
                    Please provide a valid state.{" "}
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <label htmlFor="zip">Zip</label>
                  <input
                    type="text"
                    className="form-control"
                    id="zip"
                    placeholder=""
                    required=""
                    onChange={(e) => setpostalCode(e.target.value)}
                  />
                  <div className="invalid-feedback"> Zip code required. </div>
                </div>
              </div>

              
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="save-info"
                />
                <label className="custom-control-label" htmlFor="save-info">
                  Save this information for next time
                </label>
              </div>

              <h4 className="mt-4">Payment</h4>
              <div className="d-block my-3">
                <div className="custom-control custom-radio"></div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="cc-name">Name on card</label>
                  <input
                    type="text"
                    className="form-control"
                    id="cc-name"
                    placeholder=""
                    required=""
                    onChange={(e) => setname(e.target.value)}
                  />
                  <small className="text-muted">
                    Full name as displayed on card
                  </small>
                  <div className="invalid-feedback"> Name on card is required </div>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="cc-number">Credit card number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="cc-number"
                    placeholder=""
                    required=""
                    onChange={(e) => setcardNumber(e.target.value)}
                  />
                  <div className="invalid-feedback">
                    {" "}
                    Credit card number is required{" "}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-3 mb-3">
                  <label htmlFor="cc-expiration">Expiration Month</label>
                  <input
                    type="text"
                    className="form-control"
                    id="cc-expiration"
                    placeholder="ex. 12"
                    required=""
                    onChange={(e) => setexpMonth(e.target.value)}
                  />
                  <div className="invalid-feedback"> Expiration date required </div>
                </div>
                <div className="col-md-3 mb-3">
                  <label htmlFor="cc-expiration">Expiration Year</label>
                  <input
                    type="text"
                    className="form-control"
                    id="cc-expiration"
                    placeholder="ex. 2024"
                    required=""
                    onChange={(e) => setexpYear(e.target.value)}
                  />
                  <div className="invalid-feedback"> Expiration date required </div>
                </div>
                <div className="col-md-3 mb-3">
                  <label htmlFor="cc-cvv">CVC</label>
                  <input
                    type="text"
                    className="form-control"
                    id="cc-cvv"
                    placeholder=""
                    required=""
                    onChange={(e) => setcvc(e.target.value)}
                  />
                  <div className="invalid-feedback"> Security code required </div>
                </div>
              </div>
              {checkOutButton && (
                <div className="d-flex justify-content-center pt-3 pb-5">
                  <i
                    className="btn btn-dark btn-lg btn-block shadow-lg order-button"
                    onClick={() => verifyCheckout()}
                  >
                    Confirm Order
                  </i>
                  <b className="ml-5 text-danger">{validate}</b>
                </div>
              )}
              {!checkOutButton && (
                <div className="d-flex justify-content-center pt-3 pb-5">
                <Spinner animation="border" role="status"></Spinner>
                </div>
              )}
            </form>
          </div>
        </div>
        <footer className="my-5 pt-5 text-muted text-center text-small">
          <p className="mb-1">© 2017-2019 Company Name</p>
          <ul className="list-inline">
            <li className="list-inline-item">
              <a href="#">Privacy</a>
            </li>
            <li className="list-inline-item">
              <a href="#">Terms</a>
            </li>
            <li className="list-inline-item">
              <a href="#">Support</a>
            </li>
          </ul>
        </footer>
      </div>
      <ToastContainer />
    </>
  );
}

export default Checkout;
