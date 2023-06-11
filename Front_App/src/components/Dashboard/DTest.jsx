import React, { createContext } from "react";
import {
  Menu,
  MenuItem,
  ProSidebarProvider,
  Sidebar,
  SubMenu,
} from "react-pro-sidebar";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import NavBar from "../NavBar";
import ProductsTable from "./ProductsTable";
import AllProductsTable from "./AllProductsTable";
import DashboardCard from "./DashboardCard";
import Stats from "./Stats";
import MostSoldedTable from "./MostSoldedTable";
import Categories from "./Categories";
import { MDBCheckbox } from "mdb-react-ui-kit";
import CategoriesTable from "./CategoriesTable";
import MostClickedProductTable from "./MostClickedProductTable";
import { useNavigate } from "react-router-dom";

export const SubCategory = createContext();
export const AllProducts = createContext();
function DTest() {
  const [categories, setCategories] = useState();
  const [products, setProducts] = useState();
  const [subCategory, setSubcategory] = useState("");
  const [showTable, setShowTable] = useState(false);
  const [showAllProductsTable, setShowAllProductsTable] = useState(false);
  const [showCards, setshowCards] = useState(true);
  const [showMostSolded, setShowMostSolded] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [treeView, setTreeView] = useState(true);
  const [checkedTreeView, setCheckedTreeView] = useState(true);
  const [isLogedIn, setIsLogedIn] = useState();
  const [admin, setadmin] = useState();
  const navigate = useNavigate();
  const [showMostClickedProductTable, setShowMostClickedProductTable] =
    useState(false);

  useEffect(() => {
    if (!localStorage.getItem("jwt_authorization")) {
      navigate("/");
    } else {
    }
    setIsLogedIn(localStorage.getItem("jwt_authorization"));

    axios
      .get("http://127.0.0.1:9192/decode", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt_authorization"),
        },
        params: {
          jwtToken: localStorage.getItem("jwt_authorization"),
        },
      })
      .then((response) => {
        console.log(response.data);
        setadmin(response.data);
        if(response.data.role!==1){
          navigate('/')
        }
      })
      .catch((error) => {
        console.error("LoginError", error);
      });
      
    axios.get("http://127.0.0.1:8080/api/category/get/all").then((response) => {
      setCategories(response.data);
      console.log(response.data);
    });
  }, []);

  const showAllProducts = () => {
    setShowAllProductsTable(true);
    setShowTable(false);
    setshowCards(false);
    setShowMostSolded(false);
    setShowCategories(false);
    setShowMostClickedProductTable(false);
  };
  const showMostSoldedTable = () => {
    setShowMostSolded(true);
    setShowAllProductsTable(false);
    setShowTable(false);
    setshowCards(false);
    setShowCategories(false);
    setShowMostClickedProductTable(false);
  };
  const showCategoriesDiv = () => {
    setShowMostSolded(false);
    setShowAllProductsTable(false);
    setShowTable(false);
    setshowCards(false);
    setShowCategories(true);
    setShowMostClickedProductTable(false);
  };
  const showMostClicked = () => {
    setShowMostSolded(false);
    setShowAllProductsTable(false);
    setShowTable(false);
    setshowCards(false);
    setShowCategories(false);
    setShowMostClickedProductTable(true);
  };
  const logOut = () => {
    localStorage.clear("jwt_authorization");
    navigate("/");
  };
  const setContext = () => {};
  return (
    <>
      {localStorage.getItem("jwt_authorization") && admin?.role===1 ?   <div className="d-flex">
         <div>
           <ProSidebarProvider>
             <Sidebar style={{ height: "940px" }} className="shadow">
               <Menu>
                 <img
                   src='https://www.logodesignteam.com/images/portfolio-images/ecommerce-websites-logo-design/ecommerce-websites-logo-design20.jpg'
                   alt="logo"
                   width={150}
                   className="ml-5 pl- "
                   style={{marginLeft: "40px"}}
                 />
                 <SubMenu label="Products" className="mt-5">
                   <MenuItem onClick={() => showAllProducts()}>
                     {" "}
                     <i className="bi bi-cart-fill mr-2"></i>All Products{" "}
                   </MenuItem>
                   <MenuItem onClick={() => showMostSoldedTable()}>
                     <i className="bi bi-award-fill"></i> Best solded products{" "}
                   </MenuItem>
                   <MenuItem>
                     <i className="bi bi-arrow-up-square-fill mr-2"></i>New
                     products
                   </MenuItem>
                   <MenuItem onClick={() => showMostClicked()}>
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
                               onClick={() => {
                                 setSubcategory(subCategory.id);
                                 setShowTable(true);
                                 setShowAllProductsTable(false);
                                 setshowCards(false);
                               }}
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
                 <MenuItem onClick={() => showCategoriesDiv()}>
                   {" "}
                   <i className="bi bi-tag mr-3 ml-2"></i>
                   Categories/SubCategories
                 </MenuItem>
                 <MenuItem>
                   <i className="bi bi-person-heart mr-3"></i>Best customers
                 </MenuItem>
                 <MenuItem>
                   <i className="bi bi-receipt mr-2"></i>Invoices
                 </MenuItem>
                 <MenuItem>
                   <i className="bi bi-envelope mr-2"></i>Feedbacks
                 </MenuItem>
                 <MenuItem className="text-center mt-5">
                   <Button variant="danger" onClick={() => logOut()}>
                     Log out
                   </Button>
                 </MenuItem>
               </Menu>
             </Sidebar>
           </ProSidebarProvider>
         </div>
         <div className="w-100">
           <NavBar />
           <SubCategory.Provider value={subCategory}>
             {showTable && <ProductsTable />}
           </SubCategory.Provider>
           <AllProducts.Provider value={subCategory}>
             {showAllProductsTable && <AllProductsTable />}
           </AllProducts.Provider>
           {showCards && (
             <>
               <DashboardCard />
               <Stats />
             </>
           )}
           {showMostClickedProductTable && <MostClickedProductTable />}
           {showMostSolded && <MostSoldedTable />}
           {showCategories && (
             <>
               <div className="row">
                 <div className="col-md">
                   <MDBCheckbox
                     name="flexCheck"
                     value=""
                     id="flexCheckDefault"
                     label="Table"
                     checked={!checkedTreeView}
                     className=""
                     onClick={() => {
                       setTreeView(false);
                       setCheckedTreeView(false);
                     }}
                   />
                 </div>
                 <div className="col-md">
                   <MDBCheckbox
                     name="flexCheck"
                     value=""
                     id="flexCheckChecked"
                     label="Tree view"
                     checked={checkedTreeView}
                     className="ml-3"
                     onClick={() => {
                       setTreeView(true);
                       setCheckedTreeView(true);
                     }}
                   />
                 </div>
               </div>
               {treeView === true ? <Categories /> : <CategoriesTable />}
             </>
           )}
         </div>
       </div> : "" } 
      
    </>
  );
}

export default DTest;
