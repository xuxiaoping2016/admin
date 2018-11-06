import React, {Component} from "react"
import ReactDom from 'react-dom'
// import 'font-awesome/css/font-awesome.min.css'
import {BrowserRouter as Router, Switch, Route, Link ,Redirect} from  'react-router-dom'

import Login from 'page/login/index.jsx'
import Layout from 'components/layout/index.jsx'
import Home from 'page/home/index.jsx'
class App extends Component {
  render(){
    return (
    <Router>
      <Switch>
        <Route exact to="/login" component = { Login }/>
        <Route to="/" render = {props => {
          return (
            <Layout>
              <Switch>
                <Route exact path="/" component = {Home}/>
                <Route exact path="/product" component = {Home}/>
                <Route exact path="/product-category" component = {Home}/>
                <Route exact path="/order" component = {Home}/>
                <Route exact path="/user" component = {Home}/>
              </Switch>
            </Layout>
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