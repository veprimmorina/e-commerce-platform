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
import React from "react";
import { useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function ForgotPasword() {
  const [email, setEmail] = useState('');
  const [showLoading, setShowLoading] = useState(false)
  const [message, setMessage] = useState()
  const [errorClass, setErrorClass] = useState('')
  const navigate = useNavigate()

  const sendEmail = () => {
    setErrorClass('')
    setShowLoading(true)
    setMessage('')
    const UserEntity = {
      emailId: email
    }
    axios.post("http://localhost:9192/api/user/reset-password",UserEntity).then(response=>{
      if(response.data=="User not found!"){
        setErrorClass("text-danger error")
        setMessage(response.data)
        setShowLoading(false)
      }else{
        navigate('/email/'+UserEntity.emailId)
      }
    });
  };
  return (
    <div
      className="bg-light login-div"
      style={{
        backgroundColor: "#ffffff",
      }}
    >
      <MDBRow className="d-flex justify-content-center align-items-center h-100 shadow">
        <MDBCol col="12" className="mt-5">
          <MDBCard
            className="bg-dark text-white my-5 mx-auto"
            style={{ borderRadius: "1rem", maxWidth: "600px" }}
          >
            <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100 shadow">
              <h2 className="fw-bold mb-2 text-uppercase">Reset Password</h2>
              <p className="text-white-50 mb-5">
                Please enter your email to recover password!
              </p>

              <MDBInput
                wrapperClass="mb-4 mx-5 w-100"
                labelClass="text-white"
                label="Email address"
                id="formControlLg"
                type="email"
                size="lg"
                onChange={(e) => {setEmail(e.target.value)}}
              />
            <b className={errorClass}>{message}</b>
            { 
                showLoading==false ?       
              <Button
                outline
                className="mx-2 px-5 mt-3"
                color="white"
                size="lg"
                onClick={() => sendEmail()}
              >
                Send email
              </Button>
              
              : <Spinner animation="border" role="status"></Spinner>
              }
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
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </div>
  );
}

export default ForgotPasword;
