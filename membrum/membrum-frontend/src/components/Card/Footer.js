import React from "react"
import { Link } from "react-router-dom"

const Footer = props => (
  <Link to={props.link}>
    <div className="CardFooter">
      <span>View Details</span>
      <span>
        <i className="fa fa-arrow-circle-right" />
      </span>
    </div>
  </Link>
)

Footer.defaultProps = {
  link: "/"
}
export default Footer
