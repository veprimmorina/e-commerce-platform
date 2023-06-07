import { MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBIcon, MDBInput, MDBRow } from 'mdb-react-ui-kit'
import React from 'react'
import { Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'

function EmailSent() {
    const {id} = useParams()

  return (
    <div
    className="bg-light login-div"
    style={{
      backgroundImage: "url('https://wallpaperaccess.com/full/2331715.jpg')",
    }}
  >
    <MDBRow className="d-flex justify-content-center align-items-center h-100 shadow">
      <MDBCol col="12" className="mt-5">
        <MDBCard
          className="bg-dark text-white my-5 mx-auto"
          style={{ borderRadius: "1rem", maxWidth: "600px" }}
        >
          <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100 shadow">
            <h2 className="fw-bold mb-2 text-uppercase">Confirmation Email</h2>
            <p className="text-white-50 mb-5">
              An confirmation email has been sent to {id}
            </p>

           

           

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
                Please confirm your email to login{" "}
                
              </p>
            </div>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  </div>
  )
}

export default EmailSent