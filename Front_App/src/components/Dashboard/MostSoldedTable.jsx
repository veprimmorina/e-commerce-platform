import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

function MostSoldedTable() {
  const [products, setProducts] = useState();
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8080/api/detail/get/most/solded")
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
      });
  }, []);
  return (
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
                      <td variant="danger" className="clickable">
                        {" "}
                        <i className="bi bi-filter" />
                        Out of stock products
                      </td>
                      <td>
                        {" "}
                        <i className="bi bi-filter-circle-fill clickable" />
                        All Products
                      </td>
                      <td>
                        <i className="bi bi-cart-check clickable" />
                        <span className="ml-5">Filter by quantity</span>
                      </td>
                      <td>
                        <input type="search" size={10} className="rounded" />
                        <button className="rounded bg-primary">
                          <i className="bi bi-search text-white"></i>
                        </button>
                      </td>
                    

                      <td>
                        <Button className="btn btn-primary" role="button">
                          Add New Product
                        </Button>
                      </td>
                    </tr>
                    <tr
                      style={{ backgroundColor: "#3e4396" }}
                      className="text-white"
                    >
                      <th scope="col">Product Image</th>
                      <th scope="col">Product Name</th>
                      <th scope="col">Product Quantity</th>
                      <th>Price</th>
                      <th>Sold</th>
                    </tr>
                  </thead>
                  <tbody class="" id="table-body">
                    {products != undefined
                      ? products?.map((product) => (
                          <>
                            <tr>
                              <td>
                                {" "}
                                <img
                                  src={product.productImage}
                                  width={60}
                                  alt=""
                                />
                              </td>
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
                                <td className="mb-0 text-sm text-danger">0</td>
                              ) : (
                                <td className="mb-0 text-sm">
                                  {product.detail.quantity}
                                </td>
                              )}
                              <td>{product.productPrice + " €"}</td>
                              <td>
                              {product?.detail.sold}  
                              </td>
                              
                             
                            </tr>
                          </>
                        ))
                      : ""}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MostSoldedTable;
