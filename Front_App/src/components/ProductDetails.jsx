import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import Warranty from "./Warranty";
import HomeNavBar from "./HomeNavBar";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { AddCart } from "./cartSystem";
import { ToastContainer } from "react-toastify";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setproduct] = useState();
  const addTocart = (product) => {
    dispatch(AddCart(product));
  };
  useEffect(() => {
    console.log("1", id);
    axios
      .get("http://127.0.0.1:8080/api/product/get/product/by/id/" + id)
      .then((response) => {
        setproduct(response.data);
        console.log(response.data);
      });
  }, [id]);

  return (
    <>
      <HomeNavBar />
      {product != undefined ? (
        <>
          <MDBContainer fluid>
            <MDBRow className="justify-content-center mb-0">
              <MDBCol md="12" xl="10">
                <MDBCard className="shadow border rounded-3 mt-5 mb-3">
                  <MDBCardBody>
                    <MDBRow>
                      <MDBCol md="12" lg="3" className="mb-4 mb-lg-0">
                        <img
                          src={product.productImage}
                          className="w-100 fluid"
                        />
                        <a href="#!">
                          <div
                            className="mask"
                            style={{
                              backgroundColor: "rgba(251, 251, 251, 0.15)",
                            }}
                          ></div>
                        </a>
                      </MDBCol>
                      <MDBCol md="6">
                        <div className="row justify-content-between">
                          <div className="col-md">
                            <h5>{product.productName}</h5>
                            <div className="d-flex flex-row">
                              <div className="text-danger mb-1 me-2">
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                              </div>
                              <span>310</span>
                            </div>
                            <div className="mt-1 mb-0">
                              <span className="text-muted small">
                                Quantity:{" "}
                              </span>
                              <p className="text-truncate mb-4 mb-md-0">
                                {product.detail.quantity}
                              </p>
                              <span className="text-muted small">Weight: </span>
                              <p className="text-truncate mb-4 mb-md-0">
                                {product.detail.weight}
                              </p>
                              <span className="text-muted small">
                                dimensions:{" "}
                              </span>
                              <p className="text-truncate mb-4 mb-md-0">
                                {product.detail.productDimensions}
                              </p>
                              <span className="text-muted small">
                                Quantity:{" "}
                              </span>
                              <p className="text-truncate mb-4 mb-md-0">
                                {product.detail.quantity}
                              </p>
                            </div>
                          </div>
                          <div className="col-md">
                            <p className="mt-5">
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Voluptate sed placeat alias, qui optio aut
                              fuga voluptas dolor nisi. Doloremque in
                              voluptatibus excepturi natus, incidunt reiciendis
                              nesciunt provident soluta impedit.
                              {product.detail.description}
                            </p>
                          </div>
                        </div>
                      </MDBCol>

                      <MDBCol
                        md="6"
                        lg="3"
                        className="border-sm-start-none border-start"
                      >
                        <div className="d-flex flex-row align-items-center mb-1">
                          <h4 className="mb-1 me-1">{product.productPrice}$</h4>
                          <span className="text-danger"></span>
                        </div>

                        <h6 className="text-success">Free shipping</h6>
                        <div className="d-flex flex-column mt-4">
                          <a
                            className="ripple ripple-surface ripple-surface-light btn btn-primary btn-sm"
                            href={
                              "http://127.0.0.1:8080/api/product/generate/pdf/" +
                              product.id
                            }
                            color="primary"
                            size="sm"
                          >
                            Details PDF
                          </a>
                          <a
                            className="ripple ripple-surface btn btn-outline-primary btn-sm mt-2"
                            href={
                              "http://127.0.0.1:8080/api/warranty/generate/pdf/" +
                              product.warranty.warrantyID
                            }
                            color="primary"
                            size="sm"
                          >
                            Warranty PDF
                          </a>

                          {product?.detail.quantity === 0 ? (
                            <Button variant="danger" className="mt-4"> Out of Stock</Button>
                          ) : (
                            <Button
                              variant="success"
                              onClick={() => addTocart(product)}
                              className="mt-5"
                            >
                              {" "}
                              <i className="bi bi-cart"></i> Add to cart{" "}
                            </Button>
                          )}
                        </div>
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                  <div className="mt-5">
                    <Warranty warranty={product.warranty} />
                  </div>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
          <ToastContainer />
        </>
      ) : (
        "a"
      )}
    </>
  );
}

export default ProductDetails;
