import React, {Component} from "react"
import {BrowserRouter as Router, Switch, Route, Link ,Redirect} from  'react-router-dom'

import ProductList from 'page/product/index/index.jsx'
import ProductSave from 'page/product/index/save.jsx'
import ProductDetail from 'page/product/index/detail.jsx'

export default class ProductRouter extends Component {
  render(){
    return (
        <Switch>
            <Route exact path="/product/index" component = {ProductList}/>
            <Redirect exact from="/product" to="/product/index"/>
            <Route exact path="/product/save/:id?" component = {ProductSave}/>
            <Route exact path="/product/detail/:id" component = {ProductDetail}/>
        </Switch>
    )
  }
}