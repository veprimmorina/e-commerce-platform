import React from 'react'
import { Card } from 'react-bootstrap'

function DashboardCard() {
  return (
    <div class="container">
    <div class="row mt-5">
        <div class="col-md-4 col-xl-3">
            <div class="card bg-c-blue order-card shadow">
                <div class="card-block">
                    <h6 class="m-b-20">Orders Received</h6>
                    <div className='d-flex justify-content-between'>
                    <h2 class="text-right"><span>999</span></h2>
                    <i class="bi bi-receipt"></i>
                    </div>
                    
                    <p class="m-b-0">Completed Orders<span class="f-right">999</span></p>
                </div>
            </div>
        </div>
        
        <div class="col-md-4 col-xl-3">
            <div class="card bg-c-green order-card">
                <div class="card-block">
                    <h6 class="m-b-20">Orders Received</h6>
                    <h2 class="text-right"><i class="fa fa-rocket f-left"></i><span>999</span></h2>
                    <p class="m-b-0">Completed Orders<span class="f-right">999</span></p>
                </div>
            </div>
        </div>
        
        <div class="col-md-4 col-xl-3">
            <div class="card bg-c-yellow order-card">
                <div class="card-block">
                    <h6 class="m-b-20">Orders Received</h6>
                    <h2 class="text-right"><i class="fa fa-refresh f-left"></i><span>999</span></h2>
                    <p class="m-b-0">Completed Orders<span class="f-right">999</span></p>
                </div>
            </div>
        </div>
        
        <div class="col-md-4 col-xl-3">
            <div class="card bg-c-pink order-card">
                <div class="card-block">
                    <h6 class="m-b-20">Orders Received</h6>
                    <h2 class="text-right"><i class="fa fa-credit-card f-left"></i><span>999</span></h2>
                    <p class="m-b-0">Completed Orders<span class="f-right">999</span></p>
                </div>
            </div>
        </div>
	</div>
</div>
  )
}

export default DashboardCard