import React, {Component} from "react"
import {BrowserRouter as Router, Switch, Route, Link ,Redirect} from  'react-router-dom'

import ProductList from 'page/product/index/index.jsx'

export default class ProductRouter extends Component {
  render(){
    return (
        <Switch>
            <Route exact path="/product/index" component = {ProductList}/>
            <Redirect exact from="/product" to="/product/index"/>
        </Switch>
    )
  }
}