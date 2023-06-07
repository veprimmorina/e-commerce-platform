import React, { useEffect, useState } from "react";
import HomeNavBar from "./HomeNavBar";
import { CartProvider } from "react-use-cart";
import { useParams } from "react-router-dom";
import axios from "axios";
import { MDBContainer, MDBRow } from "mdb-react-ui-kit";
import ProductId from "./ProductId";
import { Button } from "react-bootstrap";
import LastProducts from "./LastProducts";
import Footer from "./Footer";
import BestSoldedSlider from "./BestSoldedSlider";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MainSlider from "./MainSlider";
import Marketing from "./Marketing";
import Pagination from "./Pagination";

function Product() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [lastProducts, setLastProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8080/api/subCategory/get/by/subcategory/" + id)
      .then((response) => {
        setProducts(response.data);
      });
    axios
      .get("http://127.0.0.1:8080/api/subCategory/get/last/products/" + id)
      .then((response) => {
        setLastProducts(response.data);
      });
  }, [id]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getPageCount = () => {
    return Math.ceil(products.length / pageSize);
  };

  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return products.slice(startIndex, endIndex);
  };

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
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
      <HomeNavBar />
      <div className="row mt-2 products-head-section border shadow">
        {lastProducts ? (
          <Carousel
            swipeable={false}
            draggable={false}
            showDots={true}
            responsive={responsive}
            ssr={true}
            infinite={true}
            autoPlaySpeed={1000}
            keyBoardControl={true}
            customTransition="all .5"
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
          >
            {lastProducts.map((product) => (
              <LastProducts key={product.id} product={product} />
            ))}
          </Carousel>
        ) : null}
      </div>
      <div className="container mt-5">
        <MainSlider />
      </div>
      <div className="container">
        <MDBContainer fluid className="my-5">
          <MDBRow>
            {getPaginatedData().map((product, index) => (
              <ProductId product={product} key={index} />
            ))}
          </MDBRow>
          <Pagination
            currentPage={currentPage}
            pageSize={pageSize}
            totalCount={products.length}
            onPageChange={handlePageChange}
          />
        </MDBContainer>
      </div>
      <Marketing />
      <BestSoldedSlider />
      <Footer />
    </>
  );
}

export default Product;
