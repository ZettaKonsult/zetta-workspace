import React from "react"
import { Doughnut } from "react-chartjs-2"

export default props => (
  <div className="statisticsGroup">
    <h1>Mail</h1>
    <div className="statisticsView">
      {props.data.map((item, i) => (
        <div key={i} className="Chart">
          <Doughnut data={item} />
        </div>
      ))}
    </div>
  </div>
)
