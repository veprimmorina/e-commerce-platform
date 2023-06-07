import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import axios from "axios";
import Product from "../Product";
import { ProductId } from "./AllProductsTable";
import { ToastContainer, toast } from 'react-toastify';

function DeleteModal({ show, handleDeleteClose }) {
  const productId = useContext(ProductId);
const [product, setProduct] = useState()

  const handleSaveChanges = () => {

      axios.delete("http://127.0.0.1:8080/api/product/delete/by/id/"+productId).then(
        response=>{
            toast.success('Succesfully deleted!', {
                position: toast.POSITION.TOP_RIGHT
              });
        }
      )
      handleDeleteClose();
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8080/api/product/get/product/by/id/" + productId)
      .then((response) => {
        setProduct(response.data)
      });
  }, [productId]);

  useEffect(() => {
    // Reset the product state when the modal is closed
    if (!show) {
      
    }
  }, [show]);

  return (
    <>
    <Modal show={show} onHide={handleDeleteClose} className="fadeInDown">
      <Modal.Header closeButton>
        <Modal.Title>Delete Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete {product?.productName}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleDeleteClose}>
          Close
        </Button>
        <Button variant="danger" onClick={handleSaveChanges}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
    <ToastContainer />
    </>
  );
}

export default DeleteModal;
