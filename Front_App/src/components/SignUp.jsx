import axios from "axios";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBIcon,
  MDBInput,
  MDBRow,
} from "mdb-react-ui-kit";
import React, { useState } from "react";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

function SignUp() {
  const cookies = new Cookies();
  const [name, setName] = useState("");
  const [surname, setsurname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, setError] = useState("");
  const [errorClass, setErrorClass] = useState("");
  const [userCookie, setUserCookie] = useState(
    cookies.get("jwt_authorization")
  );
  const navigate = useNavigate();
  const signUp = () => {
    setErrorClass("");
    setError("");
    const UserEntity = {
      emailId: email,
      password: password,
      firstName: name,
      lastName: surname,
    };
    axios
      .post("http://localhost:9192/api/user/register", UserEntity)
      .then((response) => {
        if (response.data == "Email has been sent") {
          navigate("/email/" + email);
        } else {
          setError(response.data);
          setErrorClass("error-checkout");
        }
      });
  };
  useEffect(() => {
    if(userCookie==undefined||userCookie==""){
 
    }else{
     navigate('/')
    }
     
   }, [])
  return (
    <>
      {userCookie == undefined || userCookie == "" ? (
        <div
          className="bg-light login-div"
          style={{
            backgroundImage:
              "url('https://wallpaperaccess.com/full/2331715.jpg')",
          }}
        >
          <MDBRow className="d-flex justify-content-center align-items-center h-100 shadow">
            <MDBCol col="12" className="mt-5">
              <MDBCard
                className="bg-dark text-white my-5 mx-auto"
                style={{ borderRadius: "1rem", maxWidth: "600px" }}
              >
                <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100 shadow">
                  <h2 className="fw-bold mb-2 text-uppercase">Sign up</h2>
                  <p className="text-white-50 mb-5">
                    Please enter your details in order to sign up!
                  </p>

                  <MDBInput
                    wrapperClass="mb-4 mx-5 w-100"
                    labelClass="text-white"
                    label="Name"
                    id="formControlLg"
                    type="text"
                    size="lg"
                    onChange={(e) => setName(e.target.value)}
                  />
                  <MDBInput
                    wrapperClass="mb-4 mx-5 w-100"
                    labelClass="text-white"
                    label="Last Name"
                    id="formControlLg"
                    type="text"
                    size="lg"
                    onChange={(e) => setsurname(e.target.value)}
                  />
                  <MDBInput
                    wrapperClass="mb-4 mx-5 w-100"
                    labelClass="text-white"
                    label="Email"
                    id="formControlLg"
                    type="email"
                    size="lg"
                    onChange={(e) => setemail(e.target.value)}
                  />
                  <MDBInput
                    wrapperClass="mb-4 mx-5 w-100"
                    labelClass="text-white"
                    label="Password"
                    id="formControlLg"
                    type="password"
                    size="lg"
                    onChange={(e) => setpassword(e.target.value)}
                  />
                  <b className={"mb-4 text-danger " + errorClass}>{error}</b>
                  <Button
                    outline
                    className="mx-2 px-5"
                    color="white"
                    size="lg"
                    onClick={() => signUp()}
                  >
                    Sign up
                  </Button>

                  <div className="d-flex flex-row mt-3 mb-5">
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
                    <p className="mb-0">
                      Already have an account ?{" "}
                      <Link to="/login" classname="text-white-50 fw-bold">
                        Login
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

export default SignUp;
