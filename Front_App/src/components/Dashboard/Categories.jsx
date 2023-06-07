import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import ChangeProductSubCategory from "./ChangeProductSubCategory";
import { createContext } from "react";
export const ProductId = createContext();
const TreeNode = ({ icon, title, children, opened }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`tree-node ${isOpen ? "opened" : ""}`}>
      <div className="tree-node-label" onClick={handleToggle}>
        {icon && <i className={` ml-3 far fa-${icon}`}></i>}
        {isOpen ? (
          <i className="fas fa-caret-down arrow"></i>
        ) : (
          <i className="fas fa-caret-right arrow"></i>
        )}
        {title}
      </div>
      {isOpen && <div className="tree-node-children">{children}</div>}
    </div>
  );
};

const Categories = () => {
  const [categories, setCategories] = useState();
  const [showModal, setShowModal] = useState(false);
  const [productId, setProductId] = useState();

  useEffect(() => {
    axios.get("http://127.0.0.1:8080/api/category/get/all").then((response) => {
      setCategories(response.data);
      console.log(response.data);
    });
  }, []);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="tree-view">
      <>
        {categories?.map((category) => (
          <div className="tree-view">
            <TreeNode icon="tag" title={category.categoryname} opened>
              {category?.subCategories.map((subcategory) => (
                <>
                  <div className="tree-view">
                    <TreeNode icon="" title={subcategory.subCategoryName}>
                      {subcategory?.productList.map((product) => (
                        <div className="tree-view d-flex">
                          <i
                            className="bi bi-dash-circle-fill text-danger"
                            role="button"
                            onClick={()=>{openModal(); setProductId(product.id)}}
                          />
                          <TreeNode icon="" title={product.productName} />
                        </div>
                      ))}
                    </TreeNode>
                  </div>
                </>
              ))}
            </TreeNode>
          </div>
        ))}
      </>
      <ProductId.Provider value={productId}>
        <ChangeProductSubCategory show={showModal} handleClose={closeModal} />
      </ProductId.Provider>
    </div>
  );
};

export default Categories;
