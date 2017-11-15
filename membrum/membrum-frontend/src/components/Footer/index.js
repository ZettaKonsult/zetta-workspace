import React from "react"

import "./style.css"

const Footer = () => (
  <div className="Footer">
    <div className="FooterCopyRight">&copy;{new Date().getFullYear()}</div>
    <div className="FooterContent" />
    <div className="FooterSocialMedia">
      <a
        className="FooterSocialMediaIcon"
        href="https://www.facebook.com/Studentlund/"
      >
        <span className="fa-stack fa-2x ">
          <i className="fa fa-circle fa-stack-2x" />
          <i className="fa fa-facebook fa-inverse fa-stack-1x" />
        </span>
      </a>
      <a
        className="FooterSocialMediaIcon"
        href="https://twitter.com/studentlund?lang=en"
      >
        <span className="fa-stack fa-2x ">
          <i className="fa fa-circle fa-stack-2x" />
          <i className="fa fa-twitter fa-inverse fa-stack-1x" />
        </span>
      </a>
      <a
        className="FooterSocialMediaIcon"
        href="https://www.instagram.com/studentlund/"
      >
        <span className="fa-stack fa-2x ">
          <i className="fa fa-circle fa-stack-2x" />
          <i className="fa fa-instagram fa-inverse fa-stack-1x" />
        </span>
      </a>
    </div>
  </div>
)

export default Footer
