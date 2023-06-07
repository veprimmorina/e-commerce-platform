import React from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { useContext } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { CategoryId } from "./CategoriesTable";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdb-react-ui-kit";
import { toast, ToastContainer } from "react-toastify";

function EditCategory({ show, handleClose }) {
  const categoryId = useContext(CategoryId);
  const [subCategories, setSubcategories] = useState([]);
  const [category, setCategory] = useState();
  const [categories, setCategories] = useState();
  const [subCategoriesArray, setSubCategoriesArray] = useState([]);

  const handleSaveChanges = () => {
    handleClose();
    axios
      .put(
        "http://127.0.0.1:8080/api/subCategory/change/subcategory",
        subCategoriesArray
      )
      .then((response) => {
        toast.success("Succesfully changed ", {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((error) => {
        toast.error("An error occured ", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
  const handleSubcategoryChange = (e, subcategory) => {
    const selectedCategoryId = e.target.value.split(".")[1];
    const updatedSubcategory = {
      ...subcategory,
      categoryId: selectedCategoryId,
    };
    setSubCategoriesArray((prevSubCategories) => [
      ...prevSubCategories,
      updatedSubcategory,
    ]);
    console.log(subCategoriesArray);
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8080/api/category/get/by/id/" + categoryId)
      .then((response) => {
        setCategory(response.data);
        setSubcategories(response.data.subCategories);
      });
    axios.get("http://127.0.0.1:8080/api/category/get/all").then((response) => {
      setCategories(response.data);
    });
  }, [categoryId]);
  useEffect(() => {
    console.log(subCategoriesArray);
  }, [subCategoriesArray]);
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        className="modal-lg"
        dialogClassName=""
      >
        <Modal.Header closeButton>
          <Modal.Title>Change Category {category?.categoryname}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {subCategories?.length === 0 ? (
            "Actually this category does not have any subcategory "
          ) : (
            <MDBTable striped>
              <MDBTableHead>
                <th scope="col">Subcategory</th>
                <th scope="col">Actual Category</th>
                <th scope="col">Change to</th>
                <th scope="col">Delete Subcategory</th>
              </MDBTableHead>
              <MDBTableBody>
                {subCategories?.map((subcategory) => (
                  <tr>
                    <td>{subcategory.subCategoryName}</td>
                    <td>
                      <Form.Select disabled>
                        <option>{category?.categoryname}</option>
                      </Form.Select>
                    </td>
                    <td>
                      <Form.Select
                        onChange={(e) =>
                          handleSubcategoryChange(e, subcategory)
                        }
                      >
                        <option value=""></option>
                        {categories.map((dbCategory) => (
                          <option
                            value={subcategory.id + "." + dbCategory.categoryID}
                          >
                            {dbCategory?.categoryname}
                          </option>
                        ))}
                      </Form.Select>
                    </td>
                    <td>X</td>
                  </tr>
                ))}
              </MDBTableBody>
            </MDBTable>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
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

export default EditCategory;
