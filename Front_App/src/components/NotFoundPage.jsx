import React from 'react'
import HomeNavBar from './HomeNavBar'
import Footer from './Footer'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <>
   <HomeNavBar />
   <div className='container'>
    <Card className='text-center shadow mt-5 '>
        <Card.Body className='pb-5'>
            <Card.Title className='mt-5'>404</Card.Title>
            <Card.Title >Page not found!</Card.Title>
            <Card.Text className='mt-5 mb-5'>The page or file you are looking for cannot be found</Card.Text>
            <Link to={'/'} className='btn btn-primary'> <i class="bi bi-caret-left-fill"></i>Back to main page</Link>
        </Card.Body>
    </Card>
    <div className='mt-5'>
   <Footer />
   </div>
   </div>
   </>
  )
}

export default NotFoundPage