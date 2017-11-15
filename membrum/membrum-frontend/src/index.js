import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import registerServiceWorker from "./registerServiceWorker"
import Root from "./containers/Root"

import "./index.css"
import "normalize.css"

ReactDOM.render(
  <Router>
    <Root />
  </Router>,
  document.getElementById("root")
)
registerServiceWorker()
