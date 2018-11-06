import React, { Component } from 'react'
import { Link, NavLink} from 'react-router-dom'

class SideNav extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <nav className="navbar-default navbar-side">
            <div className="sidebar-collapse">
                <ul className="nav">
                    <li>
                        <NavLink exact activeClassName="active-menu" to="/">
                            <i className="fa fa-dashboard"></i>首页
                        </NavLink>
                    </li>
                    <li className="active">
                        <NavLink to="/product">
                            <i className="fa fa-sitemap"></i> 
                            <span>商品</span>
                            <span className="fa arrow"></span>
                        </NavLink>
                        <ul className="nav nav-second-level collapse in">
                            <li>
                                <NavLink activeClassName="active-menu" to="/product">商品管理</NavLink>
                            </li>
                            <li>
                                <NavLink activeClassName="active-menu" to="/product-category">品类管理</NavLink>
                            </li>
                        </ul>
                    </li>
                    <li className="active">
                        <NavLink to="/order">
                            <i className="fa fa-sitemap"></i> 
                            <span>订单</span>
                            <span className="fa arrow"></span>
                        </NavLink>
                        <ul className="nav nav-second-level collapse in">
                            <li>
                                <NavLink activeClassName="active-menu" to="/order">订单管理</NavLink>
                            </li>
                        </ul>
                    </li>
                    <li className="active">
                        <NavLink to="/user">
                            <i className="fa fa-user"></i> 
                            <span>用户</span>
                            <span className="fa arrow"></span>
                        </NavLink>
                        <ul className="nav nav-second-level collapse in">
                            <li>
                                <NavLink activeClassName="active-menu" to="/user">用户管理</NavLink>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>

        </nav>
    )
  }
}

export default SideNav;