import React from 'react'

function Marketing() {
  return (
    <div className='marketing text-center text-white'>
        <h4 className='text-white'>Explore more</h4>
        <h3>Find more on our page</h3>
        <b>From $999 or $41.62/mo. for 24 mo. before trade‑in2</b>
        <div className="d-flex justify-content-center mt-3">
            <button className='btn btn-primary buy-button' style={{borderRadius: "50px"}}>Buy</button>
             <a href="#" className='learn-more'>Learn more <i className="bi bi-caret-right-fill pt-1"></i></a>   
        </div>
    </div>
  )
}

export default Marketing