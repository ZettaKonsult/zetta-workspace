import React from "react"
import { Bar } from "react-chartjs-2"

export default props => (
  <div className="statisticsGroup">
    <h1>Members</h1>
    <div className="statisticsView">
      {props.data.map((item, i) => (
        <div key={i} className="Chart">
          <Bar data={item} />
        </div>
      ))}
    </div>
  </div>
)
