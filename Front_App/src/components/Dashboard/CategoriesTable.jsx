import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import EditCategory from "./EditCategory";
import AddCategoryModal from "./AddCategoryModal";
import AddSubCategoryModal from "./AddSubCategoryModal";
import { toast } from "react-toastify";

export const CategoryId = createContext();

function CategoriesTable() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddSubcategoryModal, setShowAddSubcategoryModal] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [categories, setCategories] = useState();
  const [categoryId, setCategoryId] = useState();
  const [categoryName, setCategoryName] = useState();
  const [editedCategoryId, setEditedCategoryId] = useState(null);

  const setShowCreate = () => {
    setShowCreateModal(true);
  };

  const handleCloseCreate = () => {
    setShowCreateModal(false);
  };

  const handleEdit = (category) => {
    setCategoryId(category?.categoryID);
    setShowEditModal(true);
  };

  const setShowAddSubcategory = () => {
    setShowAddSubcategoryModal(true);
  };

  const handleCloseAddSubcategory = () => {
    setShowAddSubcategoryModal(false);
  };

  const showEditCategoryName = (categoryId) => {
    setEditedCategoryId(categoryId);
  };

  const hideEditCategoryName = () => {
    setEditedCategoryId(null);
  };

  const saveEditName = (categoryID) => {
    const Category = {
      categoryName: categoryName
    } 
    axios.put("http://127.0.0.1:8080/api/category/edit/by/id/"+categoryID,Category).then((response) => {
      toast.success("Successfully edited!", toast.POSITION.TOP_RIGHT)
      hideEditCategoryName()
    }).catch(error=>{
      toast.error("An error ocurred!", toast.POSITION.TOP_RIGHT)
    })
    
  }
  useEffect(() => {
    axios.get("http://127.0.0.1:8080/api/category/get/all").then((response) => {
      setCategories(response.data);
      console.log(response.data);
    });
  }, []);

  const handleSearch = () => {
    const filteredCategories = categories.filter((c) =>
      c.categoryname.toLowerCase().includes(searchInput.toLowerCase())
    );
    setCategories(filteredCategories);
  };

  return (
    <>
      <div className="main-content pb-5 mb-5">
        <div className="container mt-7">
          <div className="row mt-5">
            <div className="col">
              <div className="card shadow" id="card-color">
                <div className="card-header border-0 bg-dark shadow">
                  <h3 className="mb-0 text-light text-center">
                    <b>Manage Categories</b>
                  </h3>
                </div>
                <div className="table-responsive">
                  <table className="table align-items-center table-flush">
                    <thead className="thead-light">
                      <tr className="">
                        <td>
                          <input
                            type="search"
                            size={10}
                            className="rounded"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                          />
                          <button
                            className="rounded bg-primary"
                            onClick={handleSearch}
                          >
                            <i className="bi bi-search text-white"></i>
                          </button>
                        </td>
                        <td>
                          <Button
                            className="btn btn-primary"
                            role="button"
                            onClick={() => setShowCreate()}
                          >
                            Add new Category
                          </Button>
                        </td>
                        <td>
                          <Button
                            className="btn btn-success"
                            role="button"
                            onClick={() => setShowAddSubcategory()}
                          >
                            Add new Subcategory
                          </Button>
                        </td>
                      </tr>
                      <tr
                        style={{ backgroundColor: "#3e4396" }}
                        className="text-white"
                      >
                        <th scope="col">Category Name</th>
                        <th>Manage Subcategories</th>
                        <th>Delete</th>
                        <th>Edit</th>
                      </tr>
                    </thead>
                    <tbody className="" id="table-body">
                      {categories?.map((category) => (
                        <tr key={category.categoryID}>
                          <td>
                            {editedCategoryId === category.categoryID ? (
                              <input
                                type="text"
                                id={category.categoryID}
                                defaultValue={category.categoryname}
                                onChange={(e) => setCategoryName(e.target.value)}
                              />
                            ) : (
                              <p>{category.categoryname}</p>
                            )}
                          </td>
                          <td>
                            {" "}
                            <Button
                              variant="primary"
                              onClick={() => handleEdit(category)}
                            >
                              <i className="bi bi-list-task"></i>
                            </Button>
                          </td>
                          <td>
                            <div className="d-flex">
                              <Button variant="danger">
                                <i className="bi bi-trash"></i>
                              </Button>
                            </div>
                          </td>
                          <td>
                            {editedCategoryId === category.categoryID ? (
                              <>
                              <Button
                                variant="danger"
                                onClick={() => hideEditCategoryName()}
                              >
                                X
                              </Button>
                              <Button
                                variant="success"
                                onClick={() => saveEditName(category.categoryID)}
                              >
                                Save
                              </Button>
                              </>
                            ) : (
                              <Button
                                variant="dark"
                                onClick={() =>
                                  showEditCategoryName(category.categoryID)
                                }
                              >
                                Edit
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CategoryId.Provider value={categoryId}>
        <EditCategory
          show={showEditModal}
          handleClose={() => setShowEditModal(false)}
        />
      </CategoryId.Provider>

      <AddCategoryModal
        show={showCreateModal}
        handleCloseAdd={handleCloseCreate}
      />

      <AddSubCategoryModal
        show={showAddSubcategoryModal}
        handleCloseAddSubactegory={handleCloseAddSubcategory}
      />
    </>
  );
}

export default CategoriesTable;
