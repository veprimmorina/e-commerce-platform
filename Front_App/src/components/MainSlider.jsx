import React from 'react'
import { Button, Carousel } from 'react-bootstrap'

function MainSlider() {
  return (
    <Carousel>
          <Carousel.Item className="mt-5">
          <Carousel.Caption className="text-dark">
              <b>#YouMake</b>
              <h1>Make it your way</h1>
              <p>A better way of living with us</p>
              <Button variant="dark" className="border-radius text-white">Buy Now</Button>
            </Carousel.Caption>
            <img
              src="https://images.samsung.com/is/image/samsung/assets/us/smartphones/04052023/SDSAC-5716-A54-HP-Hero-Carousel-DT-1440x640.jpg?imwidth=1366"
              alt=""
            />
          </Carousel.Item>

          <Carousel.Item className="text-dark">
            <Carousel.Caption className="text-dark">
              <b>#YouMake</b>
              <h1>Make it your way</h1>
              <p>A better way of living with us</p>
              <Button variant="dark" className="border-radius text-white">Buy Now</Button>
            </Carousel.Caption>

            <img
              src="https://images.samsung.com/is/image/samsung/assets/us/2302/pcd/smartphones/01282023/CarrierOffers-hp-cut-d.jpg?imwidth=1366"
              alt=""
            />
          </Carousel.Item>
        </Carousel>
  )
}

export default MainSlider