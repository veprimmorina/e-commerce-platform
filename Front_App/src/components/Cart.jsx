import React from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { carts } = useSelector((item) => item.user);
  console.log(carts);
  const navigate = useNavigate();
  return (
    <div>
      <h1>All items</h1>
      <Button
        className="p-button-rounded p-button-secondary"
        onClick={() => navigate("/")}
        label="shop"
      ></Button>
    </div>
  );
}

export default Cart;
