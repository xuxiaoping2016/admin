import React, {Component} from "react"
import ReactDom from 'react-dom'
import 'font-awesome/css/font-awesome.min.css'
import './index.css'
import './index.scss'

import img1 from './images/2.png'

ReactDom.render(
  <div>hello wored
    <img src={img1} />
    <div className="bg"></div>
    <i className="fa fa-address-book"></i>
  </div>,
  document.getElementById("app")
)