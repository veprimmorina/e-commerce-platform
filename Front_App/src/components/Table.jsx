import React, { Component, useContext, createContext } from 'react';
import PropTypes from 'prop-types';
import { Menu, MenuItem, ProSidebarProvider, Sidebar, SubMenu } from 'react-pro-sidebar';
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css';
export const Context = createContext();


function Table () {
    const [categories, setCategories] = useState();
    const [products, setProducts] = useState('');
    const [showEdit, setShowEdit] = useState(false);
    const [showSave, setShowSave] = useState(false);
  
  
  
  useEffect(()=>{
    axios.get("http://127.0.0.1:8080/api/category/get/all").then(response=>{
      setCategories(response.data);
      console.log(response.data)
    })
  },[products])
  function getSubCategoryProducts(id){
    axios.get("http://127.0.0.1:8080/api/subCategory/get/by/subcategory/"+id).then(response=>{
      console.log(response.data)
      setProducts(response.data)
    })
  }
  const findOutOfStock = (product) =>{
    var sId;
   product.map(product=>(
      sId = product.subCategoryId
    ))
    axios.get('http://127.0.0.1:8080/api/subCategory/get/outOfStock/products/'+sId).then(response=>{
      setProducts(response.data);
    })
  }
  const sortByQuantity = (product) => {
    var sId;
    product.map(product=>{
      sId = product.subCategoryId
    })
    axios.get('http://127.0.0.1:8080/api/subCategory/sort/by/quantity/'+sId).then(response=>{
      setProducts(response.data)
    })
  }
  const showEditQuantity = (product) => {
    setShowEdit(true)
  }
    return(
        <>
        {products!='' ? 
        <>
        
        --
        <div class="main-content pb-5 mb-5">
    <div class="container mt-7">  
      <div class="row mt-5 pt-5">
        <div class="col">
          <div class="card shadow" id="card-color">
            <div class="card-header border-0 bg-dark">
              <h3 class="mb-0 text-light text-center"><b>Product Stock</b></h3>
            </div>   
            <div class="table-responsive">
              <table class="table align-items-center table-flush">
                <thead class="thead-light">
                  <tr className=''> 
                    <td variant='danger'  className="clickable" onClick={()=>findOutOfStock(products)}> <i className="bi bi-filter" />Out of stock products</td>
                    <td>  <i className="bi bi-filter-circle-fill clickable" />All Products</td>
                    <td onClick={()=>sortByQuantity(products)}><i className='bi bi-cart-check clickable' /><span className='ml-5' >Filter by quantity</span></td>
                    </tr>
                  <tr style={{backgroundColor : "#3e4396"}} className='text-white'>
                  
                    <th scope="col">Product Name</th>
                    <th scope="col">Product Quantity</th>
                    <th>Edit quantity</th>
                  </tr>
                </thead>
                <tbody class="" id="table-body">
                  {products.map(product => (
                    <>
                    <tr>
                      <th scope="row">
                        <div class="media align-items-center">
                        {
                        product.detail.quantity==0 ? 
                          <div class="text-danger" >
                            <td>{product.productName}</td>
                          </div>
                        : <div class="media-body">
                        <td>{product.productName}</td>
                      </div>}
                        </div>
                      </th>
                      {
                        product.detail.quantity==0 ? 
                      <td className="mb-0 text-sm text-danger">
                        {showEdit==false ? 
                        product.detail.quantity
                        : <input type='text' value={product.detail.quantity} size={3}/>}
                      </td>
                        : <td className="mb-0 text-sm">
                        {product.detail.quantity}
                      </td> }
                      <td>
                        <Button variant='primary' onClick={()=>showEditQuantity(product)}><i className='bi bi-pen' /></Button>
                      </td>
                    
                    </tr>
                
                    </>
                  ))}
                  
                 
               
                </tbody>
                
                
              </table>
            </div> 
          </div>
        </div>
      </div>
    </div>
  </div>
  
        --
        
        </>
   : ""}
   </>
    )
};

export default Table;