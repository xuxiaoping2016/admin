import React, { Component } from 'react'
import TopNav from 'components/topNav/index.jsx';
import SideNav from 'components/sideNav/index.jsx';
import './index.css'

class Layout extends Component {
  constructor(props){
    super(props)
  }

  render() {
    console.log("layout",this.props)
    return (
      <div id="wrapper">
        <TopNav history={this.props.history}/>
        <SideNav/>
        {this.props.children}
      </div>
    )
  }
}

export default Layout;