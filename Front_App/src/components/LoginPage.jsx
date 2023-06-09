import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
} from "mdb-react-ui-kit";
import { Button } from "react-bootstrap";
import jwt from "jwt-decode";
import Cookies from "universal-cookie";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
axios.defaults.withCredentials = true;

function LoginPage() {
  const cookies = new Cookies();

  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [errorClass, setErrorClass] = useState("");
  const [userCookie, setUserCookie] = useState(
    cookies.get("jwt_authorization")
  );
  const navigate = useNavigate();

  const login = () => {
    setError("");
    setErrorClass("");
    var userAuth = {
      userName: userName,
      password: password,
    };

    axios
      .post("http://127.0.0.1:9192/authenticate", userAuth)
      .then((response) => {
        const decode = jwt(response.data);
        setUser(decode);

        cookies.set("jwt_authorization", response.data, {
          sameSite: "strict",
          expires: new Date(decode.exp * 1000),
        });
        navigate("/");
      })
      .catch((error) => {
        setError("Email address/Password wrong");
        setErrorClass("error-checkout");
      });
  };

  const handleGoogleLoginSuccess = (response) => {
    setErrorClass("");
    setError("");
    axios
      .post("http://127.0.0.1:9192/authenticate/google", {
        tokenId: response.credential,
      })
      .then((response) => {
        console.log(response);
        if (
          response.data == "You should try to log in with your Samsung account"
        ) {
          setError(
            "You are already signed up with same email. Try login in with your samsung account!"
          );
          setErrorClass("error-checkout");
        } else {
          const decode = jwt(response.data);
          setUser(decode);

          cookies.set("jwt_authorization", response.data, {
            sameSite: "strict",
            expires: new Date(decode.exp * 1000),
          });
          navigate("/");
        }
        /*
        

        // Redirect the user to the home page
      
        */
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleGoogleLoginFailure = (response) => {
    console.log(response);
  };

  useEffect(() => {
    if (userCookie == undefined || userCookie == "") {
    } else {
      navigate("/");
    }
  }, []);

  return (
    <>
      {userCookie == undefined || userCookie == "" ? (
        <div
          className="bg-light login-div"
          
        >
          <MDBRow className="d-flex justify-content-center align-items-center h-100 shadow">
            <MDBCol col="12" className="mt-5">
              <MDBCard
                className="bg-dark text-white my-5 mx-auto"
                style={{ borderRadius: "1rem", maxWidth: "600px" }}
              >
                <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100 shadow">
                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  <p className="text-white-50 mb-5">
                    Please enter your login and password!
                  </p>

                  <MDBInput
                    wrapperClass="mb-4 mx-5 w-100"
                    labelClass="text-white"
                    label="Email address"
                    id="formControlLg"
                    type="email"
                    size="lg"
                    onChange={(e) => setUserName(e.target.value)}
                  />
                  <MDBInput
                    wrapperClass="mb-4 mx-5 w-100"
                    labelClass="text-white"
                    label="Password"
                    id="formControlLg"
                    type="password"
                    size="lg"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <b className={"mb-4 text-center text-danger " + errorClass}>{error}</b>
                  <p className="small mb-3 pb-lg-2">
                    <Link
                      to={"/forgot-password"}
                      className="text-white-50"
                      href="#!"
                    >
                      Forgot password?
                    </Link>
                  </p>
                  <Button
                    outline
                    className="mx-2 px-5"
                    color="white"
                    size="lg"
                    onClick={() => login()}
                  >
                    Login
                  </Button>

                  <div className="d-flex flex-row mt-3 mb-1">
                    <MDBBtn
                      tag="a"
                      color="none"
                      className="m-3"
                      style={{ color: "white" }}
                    >
                      <MDBIcon fab icon="facebook-f" size="lg" />
                    </MDBBtn>

                    <MDBBtn
                      tag="a"
                      color="none"
                      className="m-3"
                      style={{ color: "white" }}
                    >
                      <MDBIcon fab icon="twitter" size="lg" />
                    </MDBBtn>

                    <MDBBtn
                      tag="a"
                      color="none"
                      className="m-3"
                      style={{ color: "white" }}
                    >
                      <MDBIcon fab icon="google" size="lg" />
                    </MDBBtn>
                  </div>

                  <div>
                    <GoogleLogin
                      onSuccess={handleGoogleLoginSuccess}
                      onError={handleGoogleLoginFailure}
                    />
                    <p className="mb-0 mt-5">
                      Don't have an account?{" "}
                      <Link to={"/signup"} classname="text-white-50 fw-bold">
                        Sign Up
                      </Link>
                    </p>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default LoginPage;
