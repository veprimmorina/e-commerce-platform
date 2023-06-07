
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import EditAllModal from "./EditAllModal";
import DetailsModal from "./DetailsModal";
import CreateProduct from "./CreateProduct";
import DeleteModal from "./DeleteModal";

export const ProductId = createContext();

function MostClickedProductTable() {
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [productId, setProductId] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const handleDeleteClose = () => {
    setShowDelete(false);
    setProductId("");
  };

  const handleClose = () => {
    setShow(false);
    setProductId("");
  };

  const handleCloseCreate = () => {
    setShowCreateModal(false);
  };

  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);
    setProductId("");
  };

  const setEditModal = (product) => {
    setProductId(product.id);
    setShow(true);
  };

  const setEditShowDetailsModal = (product) => {
    setProductId(product.id);
    setShowDetailsModal(true);
  };

  const setDeleteModal = (product) => {
    setProductId(product.id);
    setShowDelete(true);
  };

  const setShowCreate = () => {
    setShowCreateModal(true);
  };

  useEffect(() => {
    axios.get("http://127.0.0.1:8080/api/detail/get/most/watched").then((response) => {
      setProducts(response.data);
    });
  }, []);

  const findOutOfStock = () => {
    axios
      .get("http://127.0.0.1:8080/api/detail/get/all/outOfStock")
      .then((response) => {
        setProducts(response.data);
      });
  };

  const sortByQuantity = () => {
    axios
      .get("http://127.0.0.1:8080/api/detail/filter/all")
      .then((response) => {
        setProducts(response.data);
      });
  };

  const handleSearch = () => {
    const filteredProducts = products.filter(
      (p) =>
        p.productName.toLowerCase().includes(searchInput.toLowerCase()) ||
        p.productPrice.toString().includes(searchInput)
    );
    setProducts(filteredProducts);
  };

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div class="main-content pb-5 mb-5">
        <div class="container mt-7">
          <div class="row mt-5">
            <div class="col">
              <div class="card shadow" id="card-color">
                <div class="card-header border-0 bg-dark shadow">
                  <h3 class="mb-0 text-light text-center">
                    <b>Product Stock</b>
                  </h3>
                </div>
                <div class="table-responsive">
                  <table class="table align-items-center table-flush">
                    <thead class="thead-light">
                      <tr className="">
                        <td
                          variant="danger"
                          className="clickable"
                          onClick={() => findOutOfStock()}
                        >
                          <i className="bi bi-filter" />
                          Out of stock products
                        </td>
                        <td>
                          <i className="bi bi-filter-circle-fill clickable" />
                          All Products
                        </td>
                        <td onClick={() => sortByQuantity()}>
                          <i className="bi bi-cart-check clickable" />
                          <span className="ml-5">Filter by quantity</span>
                        </td>
                        <td>
                          <input
                            type="search"
                            size={10}
                            className="rounded"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                          />
                          <button
                            className="rounded bg-primary"
                            onClick={handleSearch}
                          >
                            <i className="bi bi-search text-white"></i>
                          </button>
                        </td>
                        <td></td>
                       
                      </tr>
                      <tr style={{ backgroundColor: "#3e4396" }} className="text-white">
                        <th scope="col">Product Image</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Product Quantity</th>
                        <th>Price</th>
                        <th>Clicked</th>
                      
                      </tr>
                    </thead>
                    <tbody class="" id="table-body">
                      {currentProducts !== undefined &&
                        currentProducts.map((product) => (
                          <tr key={product.id}>
                            <td>
                              <img src={product.productImage} width={60} alt="" />
                            </td>
                            <th scope="row">
                              <div class="media align-items-center">
                                {product.detail !== null && product.detail.quantity === 0 ? (
                                  <div class="text-danger">
                                    <td>{product.productName}</td>
                                  </div>
                                ) : (
                                  <div class="media-body">
                                    <td>{product.productName}</td>
                                  </div>
                                )}
                              </div>
                            </th>
                            {product.detail !== null && product.detail.quantity === 0 ? (
                              <td className="mb-0 text-sm text-danger">0</td>
                            ) : (
                              <td className="mb-0 text-sm">{product.detail.quantity}</td>
                            )}
                            <td>{product.productPrice + " €"}</td>
                            <td>
                             {product.detail.clicked}
                            </td>
                          
                        
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col">
              <nav>
                <ul className="pagination justify-content-center">
                  <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                    <button
                      className="page-link"
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>
                  </li>
                  {[...Array(Math.ceil(products.length / productsPerPage)).keys()].map((pageNumber) => (
                    <li className={`page-item ${currentPage === pageNumber + 1 ? "active" : ""}`} key={pageNumber + 1}>
                      <button className="page-link" onClick={() => paginate(pageNumber + 1)}>
                        {pageNumber + 1}
                      </button>
                    </li>
                  ))}
                  <li
                    className={`page-item ${currentPage === Math.ceil(products.length / productsPerPage) ? "disabled" : ""}`}
                  >
                    <button
                      className="page-link"
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === Math.ceil(products.length / productsPerPage)}
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    
     
    </>
  );
}

export default MostClickedProductTable;

 
