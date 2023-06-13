import React from 'react'
import { useState } from 'react';
import { Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DecreaseQuantity, IncreaseQuantity, RemoveCart } from './cartSystem';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

function CartModal({showCart, handleCloseCart}) {
    const [totalPrice, setTotalPrice] = useState(0);
  const [limitMessage, setLimitMessage] = useState('')
  const { cart } = useSelector((item) => item.user);
  const dispatch = useDispatch();
  const access = useSelector((state) => state.user.totalPrice);
  const redirect = useNavigate()

  function handleRemove(product) {
    setLimitMessage('')
    dispatch(RemoveCart(product.id));
    setTotalPrice(totalPrice - product.productPrice);
  }

  const handleIncreaseQuantity = (product) => {
    if(product.quantity==product.productDetails.quantity){
      setLimitMessage("Maximum of order for "+product.productName+" is "+product.productDetails.quantity)
      toast.error("Maximum of order for "+product.productName+" is "+product.productDetails.quantity);
    }
    
    else{
     
      setLimitMessage('')
    dispatch(IncreaseQuantity(product.id));
    setTotalPrice(totalPrice + product.productPrice);
    
  }
  };

  const handleDecreaseQuantity = (product) => {
    setLimitMessage('')
    dispatch(DecreaseQuantity(product.id));
    setTotalPrice(totalPrice - product.productPrice);
  };

  const orderProducts = () => {
/*
    axios
      .post("http://127.0.0.1:8080/api/product/order", cart)
      .then((response) => {
        console.log(response.data);
      });
      */
      redirect("/checkout",{state:{cart: [cart]}})
  };
  useEffect(() => {
  
    console.log(access, " ss", cart);
    if (cart.length > 0) {
      cart.forEach((element) => {
        setTotalPrice(totalPrice + element.productPrice);
      });
    }
  }, [cart.length]);

  return (
    <Modal show={showCart}  onHide={handleCloseCart} class="modal fade" id="cartModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header border-bottom-0">
          <h5 class="modal-title" id="exampleModalLabel">
            Your Shopping Cart
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        {cart?.length!==0 ? 
        <>
        <div class="modal-body">
            
          <table class="table table-image">
            <thead>
              <tr>
                <th scope="col">Image</th>
                <th scope="col">Product</th>
                <th scope="col">Quantity</th>
                <th scope="col">Price</th>
                <th scope="col">Total</th>
                <th scope="col">Remove</th>
              </tr>
            </thead>
            <tbody>
              
              { cart?.map(item=>(
                <tr>
                    <td>
                        <img src={item.productImage} alt="" width={80}  class="img-fluid img-thumbnail"/>
                     </td>
                     <td>{item.productName}</td>
                     <td className='w-25'>
             
              {item.quantity > 1 ? (
                <i
                  className="bi bi-dash-circle text-danger cursor"
                  onClick={() => handleDecreaseQuantity(item)}
                />
              ) : (
                ""
              )}
              {item.quantity}{" "}
              <i
                className="bi bi-plus-circle cursor"
                onClick={() => handleIncreaseQuantity(item)}
              />
            </td>
            <td>{item.productPrice + "€ "}</td>
            <td>{item.productPrice * item.quantity}€</td>
                    <td onClick={() => handleRemove(item)} >
                   
                  <a href="#" class="btn btn-danger btn-sm">
                    <i class="fa fa-times"></i>
                  </a>
                </td>
                </tr>
                
              ))}
               
            </tbody>
            
          </table> 
          
          <div class="d-flex justify-content-end">
            
            <h5>Total: <span class="price text-success"> {access}€</span></h5>

          </div>
        </div>
        <div class="modal-footer border-top-0 d-flex justify-content-between">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-success" onClick={() => orderProducts()}>Checkout</button>
        </div>
        </>
        : " Momentally, you do not have any product in cart" }
      </div>
    </div>
    <ToastContainer />
  </Modal>
  )
}

export default CartModal