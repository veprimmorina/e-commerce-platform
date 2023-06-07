import React from "react";
import {
  Menu,
  MenuItem,
  ProSidebarProvider,
  Sidebar,
  SubMenu,
} from "react-pro-sidebar";
import { Button } from "react-bootstrap";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import Table from "../Table";

function DashboardSidebar() {
  const [categories, setCategories] = useState();
  const [products, setProducts] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [showTable, setShowTable] = useState(false)

  useEffect(() => {
    axios.get("http://127.0.0.1:8080/api/category/get/all").then((response) => {
      setCategories(response.data);
      console.log(response.data);
    });
  }, [products]);
  function getSubCategoryProducts(id) {
    setShowTable(true)
    axios
      .get("http://127.0.0.1:8080/api/subCategory/get/by/subcategory/" + id)
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
      });
  }
  const findOutOfStock = (product) => {
    var sId;
    product.map((product) => (sId = product.subCategoryId));
    axios
      .get(
        "http://127.0.0.1:8080/api/subCategory/get/outOfStock/products/" + sId
      )
      .then((response) => {
        setProducts(response.data);
      });
  };
  const sortByQuantity = (product) => {
    var sId;
    product.map((product) => {
      sId = product.subCategoryId;
    });
    axios
      .get("http://127.0.0.1:8080/api/subCategory/sort/by/quantity/" + sId)
      .then((response) => {
        setProducts(response.data);
      });
  };
  const showEditQuantity = (product) => {
    setShowEdit(true);
  };
  const setContext = () => {};
  return (
    <>
      <div>
        <ProSidebarProvider>
          <Sidebar style={{ height: "940px" }} className="bg-primary">
            <Menu>
              <img
                src="https://1000logos.net/wp-content/uploads/2017/06/Samsung-Logo-2.png"
                alt="logo"
                width="130px"
                className="ml-5 pl-3 mt-3"
              />
              <SubMenu label="Products" className="mt-5">
                <MenuItem className=" bg-primary">
                  {" "}
                  <i className="bi bi-cart-fill mr-2"></i>All Products{" "}
                </MenuItem>
                <MenuItem>
                  <i className="bi bi-award-fill"></i> Best solded products{" "}
                </MenuItem>
                <MenuItem>
                  <i className="bi bi-arrow-up-square-fill mr-2"></i>New
                  products
                </MenuItem>
                <MenuItem>
                  <i className="bi bi-hand-index-fill mr-2"></i>Most clicked
                  products
                </MenuItem>
              </SubMenu>
              <SubMenu label="Catalog/Stock">
                {categories != undefined
                  ? categories.map((category) => (
                      <SubMenu
                        label={category.categoryname}
                        onClick={() => setContext()}
                      >
                        {category.subCategories.map((subCategory) => (
                          <MenuItem
                            onClick={() =>
                              getSubCategoryProducts(subCategory.id)
                            }
                          >
                            {subCategory.subCategoryName}
                          </MenuItem>
                        ))}
                      </SubMenu>
                    ))
                  : ""}
              </SubMenu>
              <MenuItem>
                {" "}
                <i className="bi bi-activity mr-3"></i> Stats{" "}
              </MenuItem>
              <MenuItem>
                {" "}
                <i className="bi bi-person-fill mr-3"></i>Users{" "}
              </MenuItem>
              <MenuItem>
                <i className="bi bi-person-heart mr-3"></i>Best customers
              </MenuItem>
              <MenuItem>
                <i className="bi bi-receipt mr-2"></i>Invoices
              </MenuItem>
              <MenuItem>
                <i className="bi bi-envelope mr-2"></i>Contacs
              </MenuItem>
              <MenuItem className="text-center mt-5"></MenuItem>
            </Menu>
          </Sidebar>
        </ProSidebarProvider>
      </div>
    </>
  );
}

export default DashboardSidebar;
