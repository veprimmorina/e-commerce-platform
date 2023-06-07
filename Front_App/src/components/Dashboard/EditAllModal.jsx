import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import axios from "axios";
import { ProductId } from "./AllProductsTable";
import {  toast } from "react-toastify";
import { type } from "@testing-library/user-event/dist/type";

function EditAllModal({ show, handleClose }) {
  const productId = useContext(ProductId);
  const [product, setProduct] = useState();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [weight, setWeight] = useState("");
  const [dimension, setDimension] = useState("");
  const [warrantyLength, setWarrantyLength] = useState("");
  const [warrantyDescription, setWarrantyDescription] = useState("");
  const [subCategories, setSubcategories] = useState([]);
  const [warrantyCoverageDetails, setWarrantyCoverageDetails] = useState("");

  const handleSaveChanges = () => {
    const newProduct = {
      productName: name,
      productImage: "",
      productPrice: price,
      subCategoryId: typeof subcategory==='object' && subcategory!=null ? subcategory.id : subcategory,
      detail: {
        id: product?.detail.id,
        description: description,
        quantity: quantity,
        weight: weight,
        dimensions: dimension,
      },
      warranty: {
        warrantyID: product?.warranty.warrantyID,
        warrantyDescription: warrantyDescription,
        warrantyLength: warrantyLength,
        warrantyCoverageDetails: warrantyCoverageDetails,
      },
    };

    // Send the newProduct object to the server
    axios
      .put("http://127.0.0.1:8080/api/product/update/" + productId, newProduct)
      .then((response) => {
        toast.success("Successfully updated!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        handleClose();
      })
      .catch((error) => {
        console.error(error);
        toast.error("An error occurred", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8080/api/product/get/product/by/id/" + productId)
      .then((response) => {
        setProduct(response.data);
        setQuantity(response.data.productDetails?.quantity);
        axios
          .get(
            "http://127.0.0.1:8080/api/subCategory/get/subcategory/by/id/" +
              response.data.subCategoryId
          )
          .then((response) => {
            setSubcategory(response.data);
            console.log(response.data)
          });
      });
    axios
      .get("http://127.0.0.1:8080/api/subCategory/get/all")
      .then((response) => {
        setSubcategories(response.data);
      });
  }, [productId]);

  useEffect(() => {
    // Reset the product state when the modal is closed
    if (!show) {
      setProduct(null);
      setQuantity("");
    }
  }, [show]);

  useEffect(() => {
    // Set initial values when the product state is defined
    if (product) {
      setName(product.productName);
      setImage(product.productImage);
      setPrice(product.productPrice);
      setDescription(product.detail?.description);
      setQuantity(product.detail?.quantity);
      setWeight(product.detail?.weight);
      setDimension(product.detail?.dimensions);
      setWarrantyLength(product.warranty?.warrantyLength);
      setWarrantyDescription(product.warranty?.warrantyDescription);
      setWarrantyCoverageDetails(product.warranty?.warrantyCoverageDetails);
    }
  }, [product]);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      className="fadeInDown"
      dialogClassName="modal-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>Create new product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-md border-right ">
            <b> Product: </b>
            <Form>
              <Form.Label>Product Image: </Form.Label>
              <Form.Control type="file"></Form.Control>
              <Form.Label>Product Name: </Form.Label>
              <Form.Control
                defaultValue={product?.productName}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
              <Form.Label>Product Price: </Form.Label>
              <Form.Control
                defaultValue={product?.productPrice}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
              <Form.Label>Product Subcategory</Form.Label>

              <Form.Select onChange={(e) => setSubcategory(e.target.value)}>
                <option value={subcategory?.id}>
                  {subcategory?.subCategoryName}
                </option>
                {subCategories?.map((dbSubcategory) => (
                  <>
                    {dbSubcategory?.id != subcategory?.id ? (
                      <option value={dbSubcategory?.id}>
                        {dbSubcategory.subCategoryName}
                      </option>
                     ) : (
                      ""
                    )} 
                  </>
                ))}
              </Form.Select>
            </Form>
          </div>
          <div className="col-md">
            <b> Product Details: </b>
            <Form>
              <Form.Label>Product Description: </Form.Label>
              <textarea
                className="form-control"
                defaultValue={product?.detail.description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              <Form.Label>Product Quantity: </Form.Label>
              <Form.Control
                defaultValue={product?.detail?.quantity}
                onChange={(e) => setQuantity(e.target.value)}
              ></Form.Control>
              <Form.Label>Product Weight: </Form.Label>
              <Form.Control
                defaultValue={product?.detail.weight}
                onChange={(e) => setWeight(e.target.value)}
              ></Form.Control>
              <Form.Label>Product Dimension: </Form.Label>
              <Form.Control
                defaultValue={product?.detail.productDimensions}
                onChange={(e) => setDimension(e.target.value)}
              ></Form.Control>
            </Form>
          </div>
          <div className="col-md">
            <b> Product Warranty: </b>
            <Form>
              <Form.Label>Wararnty length (In months): </Form.Label>
              <Form.Control
                defaultValue={product?.warranty.warrantyLength}
                onChange={(e) => setWarrantyLength(e.target.value)}
              ></Form.Control>
              <Form.Label>Wararnty Description: </Form.Label>
              <textarea
                className="form-control"
                defaultValue={product?.warranty.warrantyDescription}
                onChange={(e) => setWarrantyDescription(e.target.value)}
              ></textarea>
              <Form.Label>Warranty Coverage Details: </Form.Label>
              <textarea
                className="form-control"
                defaultValue={product?.warranty.warrantyCoverageDetails}
                onChange={(e) => setWarrantyCoverageDetails(e.target.value)}
              ></textarea>
            </Form>
          </div>
        </div>
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

export default EditAllModal;
