import React from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { ProductId } from './Categories'
import { useContext } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'


function ChangeProductSubCategory({show, handleClose}) {
    const handleSaveChanges = () => {
      const Product = {
        subCategoryId: subcategory
      }
      axios
          .put(
            "http://127.0.0.1:8080/api/product/change/product/subcategory/" +
              productId, Product
          ).then(response=>{
            toast.success("Succesfully changed", toast.POSITION.TOP_RIGHT)
          }).catch(error=>{
            toast.error("An error ocurred", toast.POSITION.TOP_RIGHT)
          })
    }
    const productId = useContext(ProductId)
    const [product, setProduct] = useState()
    const [subCategories,setSubcategories] = useState()
    const [subcategory, setSubcategory] = useState()

    useEffect(()=>{
        axios
      .get("http://127.0.0.1:8080/api/product/get/product/by/id/" + productId)
      .then((response) => {
        setProduct(response.data);
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
},[productId])
  return (
    <Modal show={show} onHide={handleClose} className="fadeInDown">
      <Modal.Header closeButton>
        <Modal.Title>Change Subcategory</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Label>Where do you want to place {product?.productName} : </Form.Label>
          <Form.Select onChange={(e)=> setSubcategory(e.target.value)}>
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
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSaveChanges}>
          Save Changes
        </Button>
      </Modal.Footer>
      <ToastContainer />
    </Modal>
  )
}

export default ChangeProductSubCategory