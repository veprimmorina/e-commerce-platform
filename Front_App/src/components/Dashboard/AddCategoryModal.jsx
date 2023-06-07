import React from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'


function AddCategoryModal({show, handleCloseAdd}) {
    
    
   const [category, setCategory] = useState()
 
    const handleSaveChanges = () => {
        const Category = {
            categoryName: category
        }
        axios.post("http://127.0.0.1:8080/api/category/create/category", Category ).then(response=>{
            toast.success("Succesfully Added Category: "+category, toast.POSITION.TOP_RIGHT)
            handleCloseAdd()
        }).catch(error=>{
            toast.error("An error ocurred ", toast.POSITION.TOP_RIGHT)
        })
    }

  

  return (
    <>
    <Modal show={show} onHide={handleCloseAdd} >
      <Modal.Header closeButton>
        <Modal.Title>Add new category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
            <Form.Label>
                Category Name: 
            </Form.Label>
            <Form.Control onChange={(e)=> setCategory(e.target.value)}>

            </Form.Control>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseAdd}>
          Close
        </Button>
        <Button variant="outlined" onClick={handleSaveChanges} className='btn btn-primary'>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
    <ToastContainer />
    </>
  )
}

export default AddCategoryModal