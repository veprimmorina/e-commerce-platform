import React from "react";
import { useEffect } from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function SuccessMessage() {
    const history = useNavigate();
    useEffect(() => {
        const redirectTimer = setTimeout(() => {
          history('/',{state:{cart: ""}});
        }, 5000);
        return () => clearTimeout(redirectTimer);
      
      }, [history]);

  return (
  
    <div className="container d-flex justify-content-center mt-5 pt-5 align-items-center ">
  <Card className="w-50 shadow">
    <Card.Body className="text-center">
      <Card.Img src="https://img.freepik.com/premium-vector/green-check-mark-icon-symbol-logo-circle-tick-symbol-green-color-vector-illustration_685751-503.jpg?w=2000" style={{ width: '220px', height: '200px' }} />
      <Card.Title>Succesfully Purchased</Card.Title>
      <Card.Text>This message is being shown to you as a confirmation for your order and your purchase.</Card.Text>
      <Card.Text>Please check your email to see invoice and other purchase details.</Card.Text>
    </Card.Body>
  </Card>
</div>

  );
}

export default SuccessMessage;
