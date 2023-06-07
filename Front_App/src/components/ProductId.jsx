import React, { useContext } from "react";
import {
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBIcon,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { useCart } from "react-use-cart";
import { useDispatch } from "react-redux";
import { AddCart } from "./cartSystem";
import axios from "axios";

import { toast, ToastContainer } from 'react-toastify';


function ProductId({ product, price }) {
  const dispatch = useDispatch();
  const { addItem } = useCart();
  const addClicked = (id) => {
    axios
      .put("http://127.0.0.1:8080/api/product/add/clicked/" + id)
      .then((response) => {});
  };
  const addTocart = (product) => {
    
    dispatch(AddCart(product));
    
  };
  return (
    <>
      {product.detail.quantity == 0 ? (
        <MDBCol md="12" lg="4" className="mb-4 mb-lg-0 mt-5 shadow-regular">
          <MDBCard className="shadow product-card">
            <div className="none-opacity w-100 text-center">
              <span className="text-danger rounded w-100 text-center d-flex justify-content-center">
                <b>Out of stock</b>
              </span>
            </div>

            <div className="d-flex justify-content-between p-3 -50 opacity-50 ">
              <p className="lead mb-0">Today's Combo Offer</p>
              <div
                className="bg-info rounded-circle d-flex align-items-center justify-content-center shadow-1-strong"
                style={{ width: "35px", height: "35px" }}
              >
                <img
                  src="https://www.aperturephoto.it/wp-content/uploads/2016/09/samsung-logo-300x300.png"
                  alt=""
                  width={40}
                />
              </div>
            </div>
            <div className="justify-content-center d-flex">
              <MDBCardImage
                onClick={() => addClicked(product.id)}
                src={product.productImage}
                position="top"
                className="out-of-stock"
                alt="Laptop"
                style={{ width: "250px", minHeight: "202.37px" }}
              />
            </div>

            <MDBCardBody>
              <div className="d-flex justify-content-between opacity-50">
                <p className="small"></p>
                <p className="small text-danger"></p>
              </div>

              <div className="d-flex justify-content-between mb-3 opacity-50">
                <h5 className="mb-0">{product.productName}</h5>
                <h5 className="text-dark mb-0">
                  {product.productPrice + " €"}
                </h5>
              </div>

              <div class="d-flex justify-content-between mb-2">
                <p class="text-muted mb-0 opacity-50">
                  Available:{" "}
                  <span class="fw-bold">{product.detail.quantity}</span>
                </p>
                <div class="ms-auto text-warning">
                  <MDBIcon fas icon="star" />
                  <MDBIcon fas icon="star" />
                  <MDBIcon fas icon="star" />
                  <MDBIcon fas icon="star" />
                  <MDBIcon fas icon="star" />
                </div>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      ) : (
        <>
          <MDBCol md="12" lg="4" className="mb-4 mb-lg-0 mt-5">
            <MDBCard className="shadow product-card">
              <div className="d-flex justify-content-between p-3">
                <p className="lead mb-0">Today's Combo Offer</p>
                <div
                  className="bg-info rounded-circle d-flex align-items-center justify-content-center shadow-1-strong"
                  style={{ width: "35px", height: "35px" }}
                >
                  <img
                    src="https://www.aperturephoto.it/wp-content/uploads/2016/09/samsung-logo-300x300.png"
                    alt=""
                    width={40}
                  />
                </div>
              </div>
              <Link to={"/product/" + product.id}>
                <div className="d-flex justify-content-center">
                  <MDBCardImage
                    onClick={() => addClicked(product.id)}
                    src={product.productImage}
                    position="top"
                    alt="Laptop"
                    style={{ width: "250px", minHeight: "202.37px" }}
                  />
                </div>
              </Link>

              <MDBCardBody>
                <div className="d-flex justify-content-between">
                  <p className="small">
                    <a
                      href={
                        "http://127.0.0.1:8080/api/warranty/generate/pdf/" +
                        product.warranty.warrantyID
                      }
                      className="text-muted"
                    >
                      Warranty
                    </a>
                  </p>
                  <p className="small text-danger"></p>
                </div>

                <div className="d-flex justify-content-between mb-3">
                  <h5 className="mb-0">{product.productName}</h5>
                  <h5 className="text-dark mb-0">
                    {product.productPrice + " €"}
                  </h5>
                </div>

                <div class="d-flex justify-content-between mb-2">
                  <div>
                    Available:{" "}
                    <span class="fw-bold">{product.detail.quantity}</span>
                  </div>
                  <div className="d-flex text-center mb-3">
                    <h5 className="text-dark mb-0">
                      <button
                        className="btn btn-danger text-center order-button-product"
                        onClick={() => addTocart(product)}
                      >
                        <i className="bi bi-cart "></i>
                        <b className="bold">Add to cart</b>
                      </button>
                    </h5>
                  </div>
                  <div class="ms-auto text-warning">
                    <MDBIcon fas icon="star" />
                    <MDBIcon fas icon="star" />
                    <MDBIcon fas icon="star" />
                    <MDBIcon fas icon="star" />
                    <MDBIcon fas icon="star" />
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>
            <ToastContainer />

          </MDBCol>
        </>
      )}
    </>
  );
}

export default ProductId;
