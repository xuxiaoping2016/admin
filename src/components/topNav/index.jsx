import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import _user from 'service/user-service.jsx'
import MUtil from 'util/mm.jsx'
const _mm = new MUtil();

class TopNav extends Component {
  constructor(props){
    super(props)

    this.state = {
        userInfo: _mm.getStorage("userInfo")
    }
  }

  onLogout = () => {
    _user.logout().then(res => {
        _mm.removeStorage("userInfo")
        this.props.history.push("/login")
    },errMsg => {
        _mm.errorTips(errMsg)
    })
  }

  render() {
      const { userInfo } = this.state;
    return (
      <nav className="navbar navbar-default top-navbar">
            <div className="navbar-header">
                <Link to="/" className="navbar-brand"><b>HAPPY</b>MALL</Link>
            </div>

            <ul className="nav navbar-top-links navbar-right">
                <li className="dropdown">
                    <a className="dropdown-toggle" href="javascript:;">
                        <i className="fa fa-user fa-fw"></i>
                        {
                            userInfo.username
                            ? <span>欢迎，{userInfo.username}</span>
                            :<span>欢迎您</span>
                        }
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