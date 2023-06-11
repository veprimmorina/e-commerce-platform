import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreateProduct({ show, handleCloseCreate }) {

  const [image, setImage] = useState();
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [subcategory, setSubcategory] = useState();
  const [description, setDescription] = useState();
  const [quantity, setQuantity] = useState();
  const [weight, setWeight] = useState();
  const [dimension, setDimension] = useState();
  const [warrantyLength, setWarrantyLength] = useState();
  const [warrantyDescription, setWarrantyDescription] = useState();
  const [coverageDetails, setCoverageDetails] = useState();
  const [subCategories, setSubcategories] = useState();
  const [warrantyCoverageDetails, setwarrantyCoverageDetails] = useState();
  const handleSubmit = () => {
   console.log(image)
    const newProduct = {
      
      productName: name,
      productImage: "image",
      productPrice: price,
      subCategoryId: subcategory,
      detail: {
        description: description,
        quantity: quantity,
        weight: weight,
        dimensions: dimension,
        clicked: 0,
        sold: 0,
      },
      warranty: {
        warrantyDescription: warrantyDescription,
        warrantyLength: warrantyLength,
        warrantyCoverageDetails: warrantyCoverageDetails,
      },
    };

    // Send the newProduct object to the server
    axios
      .post("http://127.0.0.1:8080/api/product/create/product", newProduct)
      .then((response) => {
        console.log(response.data);
        toast.success('Succesfylly added!', {
            position: toast.POSITION.TOP_RIGHT
          });
        handleCloseCreate();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8080/api/subCategory/get/all")
      .then((response) => {
        setSubcategories(response.data);
        console.log(response.data);
      });
  }, []);

  return (
    <>
    <Modal
      show={show}
      onHide={handleCloseCreate}
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
              <Form.Control
                type="file"
                onChange={(e) => setImage(e.target.files)}
              ></Form.Control>
              <Form.Label>Product Name: </Form.Label>
              <Form.Control
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
              <Form.Label>Product Price: </Form.Label>
              <Form.Control
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
              <Form.Label>Product Subcategory</Form.Label>

              <Form.Select onChange={(e) => setSubcategory(e.target.value)}>
                <option value="null">Select one</option>
                {subCategories?.map((subcategory) => (
                  <option value={subcategory.id}>
                    {subcategory.subCategoryName}
                  </option>
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
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              <Form.Label>Product Quantity: </Form.Label>
              <Form.Control
                onChange={(e) => setQuantity(e.target.value)}
              ></Form.Control>
              <Form.Label>Product Weight: </Form.Label>
              <Form.Control
                onChange={(e) => setWeight(e.target.value)}
              ></Form.Control>
              <Form.Label>Product Dimension: </Form.Label>
              <Form.Control
                onChange={(e) => setDimension(e.target.value)}
              ></Form.Control>
            </Form>
          </div>
          <div className="col-md">
            <b> Product Warranty: </b>
            <Form>
              <Form.Label>Wararnty lenght (In months): </Form.Label>
              <Form.Control
                onChange={(e) => setWarrantyLength(e.target.value)}
              ></Form.Control>
              <Form.Label>Wararnty Description: </Form.Label>
              <Form.Control
                onChange={(e) => setWarrantyDescription(e.target.value)}
              ></Form.Control>
              <Form.Label>Warranty Coverage Details: </Form.Label>
              <textarea
                className="form-control"
                onChange={(e) => setwarrantyCoverageDetails(e.target.value)}
              ></textarea>
            </Form>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseCreate}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
    <ToastContainer />
    </>
  );
}

export default CreateProduct;
