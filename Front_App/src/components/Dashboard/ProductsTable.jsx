import axios from 'axios';
import React, { createContext, useContext, useEffect } from 'react'
import { useState } from 'react';
import { Button } from 'react-bootstrap'

import { SubCategory } from './DTest';
import EditModal from './EditModal';
export const ProductId = createContext()

function ProductsTable() {
    const subCategory = useContext(SubCategory)
    const [product, setProducts] = useState([])
    const [show, setShow] = useState(false)
    const [productId, setProductId] = useState('')

    const handleClose = () => {
      setShow(false);
      setProductId('')
    };
    const setEditModal = (product) => {
      setProductId(product.id);
      setShow(true)
    }

    useEffect(()=>{
      axios
      .get("http://127.0.0.1:8080/api/subCategory/get/by/subcategory/" + subCategory)
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
      });
    },[subCategory])

    const findOutOfStock = () => {
      axios
        .get(
          "http://127.0.0.1:8080/api/subCategory/get/outOfStock/products/" + subCategory
        )
        .then((response) => {
          setProducts(response.data);
        });
    };
    const sortByQuantity = () => {
      axios
        .get("http://127.0.0.1:8080/api/subCategory/sort/by/quantity/" + subCategory)
        .then((response) => {
          setProducts(response.data);
        });
    };
  
    
  
  return (
        <>
          <div class="main-content pb-5 mb-5 ">
            <div class="container mt-7">
              <div class="row mt-5 ">
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
                              {" "}
                              <i className="bi bi-filter" />
                              Out of stock products
                            </td>
                            <td>
                              {" "}
                              <i className="bi bi-filter-circle-fill clickable" />
                              All Products
                            </td>
                            <td onClick={() => sortByQuantity()}>
                              <i className="bi bi-cart-check clickable" />
                              <span className="ml-5">
                                Filter by quantity
                              </span>
                            </td>
                          </tr>
                          <tr
                            style={{ backgroundColor: "#3e4396" }}
                            className="text-white"
                          >
                            <th scope="col">Product Name</th>
                            <th scope="col">Product Quantity</th>
                            <th>Edit quantity</th>
                          </tr>
                        </thead>
                        <tbody class="" id="table-body">
                          {
                            subCategory!=undefined ?
                          product?.map((product) => (
                            <>
                              <tr>
                                <th scope="row">
                                  <div class="media align-items-center">
                                    {product.detail.quantity == 0 ? (
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
                                {product.detail.quantity == 0 ? (
                                  <td className="mb-0 text-sm text-danger">
                                    0
                                  </td>
                                ) : (
                                  <td className="mb-0 text-sm">
                                    {product.detail.quantity}
                                  </td>
                                )}
                                <td>
                                  <Button variant="primary" onClick={()=> {setEditModal(product)}}>
                                    <i className="bi bi-pen" />
                                  </Button>
                                </td>
                            
                              </tr>
                            </>
                          )) : ""}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ProductId.Provider value={productId}>
              <EditModal show={show} handleClose={handleClose}/>
          </ProductId.Provider>
        </>
       
      )
}

export default ProductsTable