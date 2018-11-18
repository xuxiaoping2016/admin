import React, {Component} from "react"
import ReactDom from 'react-dom'
// import 'font-awesome/css/font-awesome.min.css'
import {BrowserRouter as Router, Switch, Route, Link ,Redirect} from  'react-router-dom'

import Login from 'page/login/index.jsx'
import Layout from 'components/layout/index.jsx'
import Home from 'page/home/index.jsx'
import UserList from 'page/user/index.jsx'
import ProductRouter from 'page/product/index/router.jsx'
import Error from 'page/error/index.jsx'

class LayoutRouter extends Component {
  render(){
    return (
      <Layout {...this.props}>
        <Switch>
          <Route exact path="/" component = {Home}/>
          <Route path="/product" component = {ProductRouter}/>
          <Route exact path="/product-category" component = {Home}/>
          <Route path="/order" component = {Home}/>
          <Route exact path="/user/index" component = {UserList}/>
          <Redirect form="/user" to="/user/index"></Redirect>
          <Route component = {Error}/>
        </Switch>
      </Layout>
    )
  }
}

class App extends Component {
  render(){
    return (
    <Router>
      <Switch>
        <Route exact path="/login" component = { Login }/>
        <Route path="/" render = {props => {
          return (
            <LayoutRouter {...props}/>
          )
        }}/>
      </Switch>
    </Router>
    )
  }
}

ReactDom.render(
  <App/>,
  document.getElementById("app")
)