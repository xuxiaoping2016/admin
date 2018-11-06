import React, { Component } from 'react'
import TopNav from 'components/topNav/index.jsx';
import SideNav from 'components/sideNav/index.jsx';
import './index.css'

class Layout extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <div id="wrapper">
        <TopNav/>
        <SideNav/>
        {this.props.children}
      </div>
    )
  }
}

export default Layout;