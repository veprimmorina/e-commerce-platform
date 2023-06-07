import React from "react";
import { useState } from "react";
import { Button, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { DecreaseQuantity, IncreaseQuantity, RemoveCart } from "./cartSystem";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CartDropdown = () => {
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

  //   const total = () => {
  //     if (cart.length > 0) {
  //       cart.forEach((element) => {
  //         setTotalPrice(totalPrice + element.productPrice);
  //       });
  //     }
  //   };
  return (
    <table>
      <thead>
        <tr className="d-flex justify-content-center mb-3">
          <th>{cart.length != 0 ? cart.length + " products on cart" : ""}</th>
        </tr>
      </thead>
      <tbody>
        
        {cart?.map((item) => (
          <tr className="dropdown-item border-bottom">
            <td className="cursor" onClick={() => handleRemove(item)}>
              x
            </td>
            <td>
              <img src={item.productImage} alt="" width={50} />
            </td>
            <td>|{item.productName}</td>
            <td>
              {"| "}
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
                className="bi bi-plus-circle text-success cursor"
                onClick={() => handleIncreaseQuantity(item)}
              />
            </td>
            <td>|{item.productPrice + "€| "}</td>
            <td>{item.productPrice * item.quantity}</td>
          </tr>
        ))}
        <tr className="d-flex justify-content-center">
          {cart != "" ? (
            <>
              <td className="mt-2">
                Total Price:{access}€{" "}
                <td>
                  {" "}
                  <Button className="mt-3" onClick={() => orderProducts()}>
                    Order
                  </Button>{" "}
                </td>{" "}
              </td>
              
              
            </>
          ) : (
            "0 product on cart"
          )}
        </tr>
        <tr className="text-center">
          <td className="text-danger">{limitMessage}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default CartDropdown;
