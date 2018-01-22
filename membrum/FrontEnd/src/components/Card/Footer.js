import React from 'react'

const Footer = props => (
  <div className="CardFooter">
    <span>View Details</span>
    <span>
      <i className="fa fa-arrow-circle-right" />
    </span>
  </div>
)

Footer.defaultProps = {
  link: '/'
}
export default Footer
