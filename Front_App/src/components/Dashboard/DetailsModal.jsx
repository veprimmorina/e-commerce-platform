import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import axios from "axios";
import Product from "../Product";
import { ProductId } from "./AllProductsTable";

function EditAllModal({ show, handleCloseDetailsModal }) {
  const productId = useContext(ProductId);
  const [product, setProduct] = useState();
  const [quantity, setQuantity] = useState();

  const handleSaveChanges = () => {
    const ProductDetails = {
      quantity: quantity,
    };
    axios
      .put(
        "http://127.0.0.1:8080/api/detail/edit/by/id/" + product.id,
        ProductDetails
      )
      .then((response) => {
        console.log(response.data);
      });
      handleCloseDetailsModal();
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
    <Modal show={show} onHide={handleCloseDetailsModal} className="fadeInDown">
      <Modal.Header closeButton>
        <Modal.Title>{product?.productName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <table>
            <thead>

            </thead>
            <tbody>
                <tr>
                <td>Product Description:  </td>
                <td>{product?.detail.description}</td>
                </tr>
                <tr>
                <td>Product Quantity:  </td>
                <td>{product?.detail.quantity}</td>
                </tr>
                <tr>
                <td>Product Weight:  </td>
                <td>{product?.detail.weight}</td>
                </tr>
                <tr>
                <td>Product Dimensions:  </td>
                <td>{product?.detail.dimensions}</td>
                </tr>
                <tr>
                <td>Product Clicked:  </td>
                <td>{product?.detail.clicked}</td>
                </tr>
                <tr>
                <td>Product Sold:  </td>
                <td>{product?.detail.sold}</td>
                </tr>
            </tbody>
        </table>
       
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseDetailsModal}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSaveChanges}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditAllModal;
