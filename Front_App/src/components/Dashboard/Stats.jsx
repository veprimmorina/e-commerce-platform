import { CanvasJSChart } from "canvasjs-react-charts";
import { CDBContainer } from "cdbreact";
import React, { useState } from "react";
import Chart from "./Chart";
import ColumnChart from "./ColumnChart";

function Stats() {
  


  return (
    <div className="row">
      <div className="col-md">
        <ColumnChart />
      </div>
      <div className="col-md">
        <Chart />
      </div>
    </div>
  );
}

export default Stats;
