import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBIcon,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AddCart } from "./cartSystem";
import axios from "axios";

import { useState } from "react";
import { useEffect } from "react";
import Carousel from "react-multi-carousel";


function BestSoldedSlider() {
  const [products, setproducts] = useState([]);
  const dispatch = useDispatch();
  const addClicked = (id) => {
    axios
      .put("http://127.0.0.1:8080/api/product/add/clicked/" + id)
      .then((response) => {});
  };
  const addTocart = (product) => {
    
    dispatch(AddCart(product));
    
  };
  useEffect(() => {
    axios.get("http://127.0.0.1:8080/api/detail/get/top/10").then((response) => {
      setproducts(response.data);
      console.log(response.data)
    });
  },[]);
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
     <>
     <h3 className="text-center mt-4">Best Solded Products</h3>
    <Carousel
      swipeable={false}
      draggable={false}
      showDots={true}
      responsive={responsive}
      ssr={true} // means to render carousel on server-side.
      infinite={true}
      autoPlaySpeed={1000}
      keyBoardControl={true}
      customTransition="all .5"
      transitionDuration={500}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
      className="mt-5"
    >
      {products.length > 0 ? (
        products.map((product) => (
         
          product.detail.quantity === 0 ? (
              <MDBCard className="shadow product-card" style={{maxWidth: "400px"}}>
                <div className="none-opacity w-100 text-center">
                  <span className="text-white rounded w-100">
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
          ) : (
            <>
                <MDBCard className="shadow product-card" style={{maxWidth: "400px"}}>
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
                            className="btn btn-primary text-center order-button-product"
                            onClick={() => addTocart(product)}
                          >
                            <i className="bi bi-cart"></i>
                            Add to cart
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
    
            </>
          )
          
        ))
      ) : (
        <div>Loading...</div>
      )}
    </Carousel>
    </>
  );
}

export default BestSoldedSlider;
