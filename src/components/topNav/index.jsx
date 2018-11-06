import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class TopNav extends Component {
  constructor(props){
    super(props)
  }

  // onLogout = () => {
  //   console.log("lo")
  // }

  render() {
    return (
      <nav className="navbar navbar-default top-navbar">
            <div className="navbar-header">
                <Link to="/" className="navbar-brand"><b>HAPPY</b>MALL</Link>
            </div>

            <ul className="nav navbar-top-links navbar-right">
                <li className="dropdown">
                    <a className="dropdown-toggle" href="javascript:;">
                        <i className="fa fa-user fa-fw"></i>
                        <span>欢迎，adminXXX</span>
                        <i className="fa fa-caret-down"></i>
                    </a>
                    <ul className="dropdown-menu dropdown-user">
                        <li><a href="javascript:;" onClick = {this.onLogout}><i className="fa fa-sign-out fa-fw"></i> Logout</a></li>
                    </ul>
                </li>
            </ul>
        </nav>
    )
  }
}

export default TopNav;