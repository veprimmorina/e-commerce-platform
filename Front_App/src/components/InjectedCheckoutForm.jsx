import { ElementsConsumer } from "@stripe/react-stripe-js";
import axios from "axios";
import React from "react";
import { createContext } from "react";
import { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import StripeComponent from "./StripeComponent";
export const MessageContext = createContext();

function InjectedCheckoutForm() {
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
    const [cart, setCart] = useState(location.state?.cart || []);
    const [totalPrice, setTotalPrice] = useState(0);
    const [message, setMessage] = useState("Please Wait");
    const [showMessage, setShowMessage] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [validate, setValidate] = useState("");
    const [checkOutButton, setCheckOutButton] = useState(true)
    const img = require('../Images/visa.png')
    const masterCard = require('../Images/master.png')
    const ae = require('../Images/ae.png')
    const discover = require('../Images/Discover-logo.png')
  
    useEffect(() => {
      let totalPrice = 0;
      cart.forEach((element) => {
        totalPrice += element.productPrice * element.quantity;
      });
      setTotalPrice(totalPrice);
    }, [cart]);
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
        setCheckOutButton(false)
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
              userEmail: userEmail,
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
              }).catch(error=>{
                setCheckOutButton(true)
                reject(error.response.data);
                toast.error(error.response.data)
              });
          }),
          {
            pending: 'Processing...',
            success: 'Promise resolved ',
            error: (error) => `Rejected: ${error.message}`
          }
        );
      }
    };
  return (
    <>
    <div class="container">
        {showMessage && <p>{message}</p>}
        <div class="py-5 text-center">
          <img
            class="d-block mx-auto mb-4"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/2560px-Samsung_Logo.svg.png"
            alt=""
            width="200"
            height="72"
          />
          <h2>Checkout form</h2>

          <p class="lead">
            Please confirm your order by filling all nessecary fields
          </p>
        </div>
        
        <div class="row">
          <div class="col-md-4 order-md-2 mb-4">
            <h4 class="d-flex justify-content-between align-items-center mb-3">
              <span class="text-muted">
                {" "}
                <i className="bi bi-cart"></i> Your cart
              </span>
              <span class="badge badge-secondary badge-pill text-dark">
                {cart.length} products
              </span>
            </h4>
            <ul class="list-group mb-3 sticky-top shadow">
              {cart?.map((item) => (
                <li class="list-group-item d-flex justify-content-between lh-condensed" key={item.id}>
                  <img src={item.productImage} alt="product-image" width={80} />
                  <div>
                    <h6 class="my-0">{item.productName}</h6>
                    <small class="text-muted">
                      {item.quantity}X{item.productPrice + " €"}
                    </small>
                  </div>
                  <span class="text-muted">
                    {item.productPrice * item.quantity + " €"}
                  </span>
                </li>
              ))}

              <li class="list-group-item d-flex justify-content-between bg-light">
                <div class="text-success">
                  <h6 class="my-0">Promo code</h6>
                  <small>EXAMPLECODE</small>
                </div>
                <span class="text-success">-$5</span>
              </li>
              <li class="list-group-item d-flex justify-content-between">
                <span>Total </span>
                <strong className="text-danger">{totalPrice + " €"}</strong>
              </li>
            </ul>
            <form class="card p-2">
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Promo code"
                />
                <div class="input-group-append">
                  <button type="submit" class="btn btn-secondary">
                    Redeem
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div class="col-md-8 order-md-1">
          <div className="d-flex justify-content-between mt-3 mb-4">
          <img src={img} alt="visa" className="img-fluid payment-methods" width={70} />
          <img src={masterCard} alt="" className='img-fluid payment-methods' width={70}/>
          <img src={ae} alt="" className='img-fluid payment-methods' width={70}/>
          <img src={discover} alt="" className='img-fluid payment-methods' width={70}/>
        </div>
            <h4 class="mb-3">Billing address</h4>
            <form class="needs-validation" novalidate="">
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label htmlFor="firstName">First name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="firstName"
                    placeholder=""
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                
                <div class="invalid-feedback">You must agree before submitting.</div>
                </div>
                <div class="col-md-6 mb-3">
                  <label htmlFor="lastName">Last name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="lastName"
                    placeholder=""
                    onChange={(e) => setLastName(e.target.value)}
                    required=""
                  />
                  <div class="invalid-feedback">
                    {" "}
                    Valid last name is required.{" "}
                  </div>
                </div>
              </div>
              <div class="mb-3">
                <label htmlFor="username">Username</label>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">@</span>
                  </div>
                  <input
                    type="text"
                    class="form-control"
                    id="username"
                    placeholder="you@example.com"
                    required=""
                    onChange={(e) => setuserEmail(e.target.value)}
                  />
                  <div class="invalid-feedback" style={{ width: "100%" }}>
                    {" "}
                    Your username is required.{" "}
                  </div>
                </div>
              </div>
              <div class="mb-3">
                <div class="invalid-feedback">
                  {" "}
                  Please enter a valid email address for shipping updates.{" "}
                </div>
              </div>
              <div class="mb-3">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  class="form-control"
                  id="address"
                  placeholder="1234 Main St"
                  required=""
                  onChange={(e) => setaddressLine1(e.target.value)}
                />
                <div class="invalid-feedback">
                  {" "}
                  Please enter your shipping address.{" "}
                </div>
              </div>
              <div class="mb-3">
                <label htmlFor="address2">
                  Address 2 <span class="text-muted">(Optional)</span>
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="address2"
                  placeholder="Apartment or suite"
                  onChange={(e) => setaddressLine2(e.target.value)}
                />
              </div>
              <div class="row">
                <div class="col-md-5 mb-3">
                  <label htmlFor="country">Country</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setcountry(e.target.value)}
                  />
                  <div class="invalid-feedback">
                    {" "}
                    Please select a valid country.{" "}
                  </div>
                </div>

                <div class="col-md-4 mb-3">
                  <label htmlFor="state">State</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setstate(e.target.value)}
                  />
                  <div class="invalid-feedback">
                    {" "}
                    Please provide a valid state.{" "}
                  </div>
                </div>
                <div class="col-md-3 mb-3">
                  <label htmlFor="zip">Zip</label>
                  <input
                    type="text"
                    class="form-control"
                    id="zip"
                    placeholder=""
                    required=""
                    onChange={(e) => setpostalCode(e.target.value)}
                  />
                  <div class="invalid-feedback"> Zip code required. </div>
                </div>
              </div>

              <div class="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  id="same-address"
                />
                <label class="custom-control-label" htmlFor="same-address">
                  Shipping address is the same as my billing address
                </label>
              </div>
              <div class="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  id="save-info"
                />
                <label class="custom-control-label" htmlFor="save-info">
                  Save this information for next time
                </label>
              </div>

              <h4 class="mt-4">Payment</h4>
              <div class="d-block my-3">
                <div class="custom-control custom-radio"></div>
              </div>
              <div class="row">
              <ElementsConsumer>
      {({stripe, elements}) => (
        <StripeComponent stripe={stripe} elements={elements} />
      )}
    </ElementsConsumer>
                <div class="col-md-6 mb-3">
                
                  <label htmlFor="cc-name">Name on card</label>
                  <input
                    type="text"
                    class="form-control"
                    id="cc-name"
                    placeholder=""
                    required=""
                    onChange={(e) => setname(e.target.value)}
                  />
                  <small className="text-muted">
                    Full name as displayed on card
                  </small>
                  <div class="invalid-feedback"> Name on card is required </div>
                </div>
                <div class="col-md-6 mb-3">
                  <label htmlFor="cc-number">Credit card number</label>
                  <input
                    type="text"
                    class="form-control"
                    id="cc-number"
                    placeholder=""
                    required=""
                    onChange={(e) => setcardNumber(e.target.value)}
                  />
                  <div class="invalid-feedback">
                    {" "}
                    Credit card number is required{" "}
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-3 mb-3">
                  <label htmlFor="cc-expiration">Expiration Month</label>
                  <input
                    type="text"
                    class="form-control"
                    id="cc-expiration"
                    placeholder=""
                    required=""
                    onChange={(e) => setexpMonth(e.target.value)}
                  />
                  <div class="invalid-feedback"> Expiration date required </div>
                </div>
                <div class="col-md-3 mb-3">
                  <label htmlFor="cc-expiration">Expiration Year</label>
                  <input
                    type="text"
                    class="form-control"
                    id="cc-expiration"
                    placeholder=""
                    required=""
                    onChange={(e) => setexpYear(e.target.value)}
                  />
                  <div class="invalid-feedback"> Expiration date required </div>
                </div>
                <div class="col-md-3 mb-3">
                  <label htmlFor="cc-cvv">CVC</label>
                  <input
                    type="text"
                    class="form-control"
                    id="cc-cvv"
                    placeholder=""
                    required=""
                    onChange={(e) => setcvc(e.target.value)}
                  />
                  <div class="invalid-feedback"> Security code required </div>
                </div>
                
              </div>
              {  checkOutButton &&
              <div className="d-flex justify-content-between">
                <i
                  class="btn btn-primary btn-lg btn-block"
                  onClick={() => verifyCheckout()}
                >
                  Confirm Order
                </i>
                <b className="ml-5 text-danger">{validate}</b>
              </div>
              }
              {
                !checkOutButton &&  <Spinner animation="border" role="status"></Spinner>
              }
            </form>
          </div>
        </div>
        <footer class="my-5 pt-5 text-muted text-center text-small">
          <p class="mb-1">© 2017-2019 Company Name</p>
          <ul class="list-inline">
            <li class="list-inline-item">
              <a href="#">Privacy</a>
            </li>
            <li class="list-inline-item">
              <a href="#">Terms</a>
            </li>
            <li class="list-inline-item">
              <a href="#">Support</a>
            </li>
          </ul>
        </footer>
      </div>
      <ToastContainer />
   
    </>
  )
}

export default InjectedCheckoutForm

