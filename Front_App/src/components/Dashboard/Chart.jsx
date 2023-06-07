import React from 'react'
import { CanvasJSChart } from "canvasjs-react-charts";


function Chart() {
    const options1 = {
        animationEnabled: true,
        exportEnabled: true,
        theme: "", // "light1", "dark1", "dark2"
        title: {
          text: "Trip Expenses",
        },
        data: [
          {
            type: "pie",
            indexLabel: "{label}: {y}%",
            startAngle: -90,
            dataPoints: [
              { y: 20, label: "Airfare" },
              { y: 24, label: "Food & Drinks" },
              { y: 20, label: "Accommodation" },
              { y: 14, label: "Transportation" },
              { y: 12, label: "Activities" },
              { y: 10, label: "Misc" },
            ],
          },
        ],
      };
  return (
    <CanvasJSChart options={options1} />
  )
}

export default Chart