import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { ProductId } from "./ProductsTable";
import axios from "axios";
import Product from "../Product";
import { toast } from "react-toastify";

function EditModal({ show, handleClose }) {
  const productId = useContext(ProductId);
  const [product, setProduct] = useState();
  const [quantity, setQuantity] = useState();

  const handleSaveChanges = () => {
    const ProductDetails = {
      quantity: quantity,
    };
    axios
      .put("http://127.0.0.1:8080/api/detail/edit/by/id/" + product.id, ProductDetails)
      .then((response) => {
        toast.success("Succesfully changed", toast.POSITION.TOP_RIGHT)
        console.log(response.data);
      });
    handleClose();
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8080/api/product/get/product/by/id/" + productId)
      .then((response) => {
        setProduct(response.data);
        setQuantity(response.data.productDetails.quantity);
      });
  }, [productId]);

  useEffect(() => {
    // Reset the product state when the modal is closed
    if (!show) {
      setProduct(null);
      setQuantity(null);
    }
  }, [show]);

  return (
    <Modal show={show} onHide={handleClose} className="fadeInDown">
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Label>Product Name: </Form.Label>
          <Form.Control value={product?.productName} disabled></Form.Control>
          <Form.Label>Product Quantity: </Form.Label>
          <div className="d-flex gap-2">
            <div
              role="button"
              className="d-flex justify-content-center align-items-center "
              onClick={() => setQuantity(quantity - 1)}
            >
              <i className="bi bi-dash d-flex border rounded-circle border-dark quantity-button" />
            </div>
            <Form.Control
              defaultValue={quantity}
              size={5}
              onChange={(e) => setQuantity(e.target.value)}
            ></Form.Control>
            <div
              role="button"
              className="d-flex justify-content-center align-items-center "
              onClick={() => setQuantity(quantity + 1)}
            >
              <i className="bi bi-plus d-flex border rounded-circle border-dark quantity-button" />
            </div>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSaveChanges}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditModal;
