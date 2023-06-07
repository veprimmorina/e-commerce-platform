import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

function AddSubCategoryModal({ show, handleCloseAddSubactegory }) {
  const [subCategoryName, setSubCategoryName] = useState();
  const [category, setCategory] = useState();
  const [categories, setCategories] = useState();
  const handleSaveChanges = () => {
    const Subcategory = {
      subCategoryName: subCategoryName,
      categoryId: category,
    };
    axios
      .post(
        "http://127.0.0.1:8080/api/subCategory/create/subcategory",
        Subcategory
      )
      .then((response) => {
        toast.success(
          "Succesfully Added Subcategory: " + subCategoryName,
          toast.POSITION.TOP_RIGHT
        );
        handleCloseAddSubactegory();
      })
      .catch((error) => {
        toast.error("An error ocurred ", toast.POSITION.TOP_RIGHT);
      });
  };

  useEffect(() => {
    axios.get("http://127.0.0.1:8080/api/category/get/all").then((response) => {
      setCategories(response.data);
      console.log(response.data);
    });
  }, []);

  return (
    <>
      <Modal show={show} onHide={handleCloseAddSubactegory}>
        <Modal.Header closeButton>
          <Modal.Title>Add new Subcategory</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Label>Subcategory Name:</Form.Label>
            <Form.Control
              onChange={(e) => setSubCategoryName(e.target.value)}
            ></Form.Control>
            <Form.Label>Select Category: </Form.Label>
            <Form.Select onChange={(e) => setCategory(e.target.value)}>
              <option value=""></option>
              {categories?.map((category) => (
                <option value={category.categoryID}>
                  {category.categoryname}
                </option>
              ))}
            </Form.Select>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddSubactegory}>
            Close
          </Button>
          <Button
            variant="outlined"
            onClick={handleSaveChanges}
            className="btn btn-primary"
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </>
  );
}

export default AddSubCategoryModal;
