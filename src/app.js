import React, {Component} from "react"
import ReactDom from 'react-dom'
import 'font-awesome/css/font-awesome.min.css'
import {BrowserRouter as Router, Switch, Route, Link ,Redirect} from  'react-router-dom'
import './index.css'
import './index.scss'

import Home from 'page/home/index.jsx'
import Home2 from 'page/home/index2.jsx'

class A extends Component{
  render(){
    const { match } = this.props
    return <div>
      Component A
      <Switch>
        <Route exact path={`${match.path}`} render = {(router) =>{
          console.log(router)
          return (<div>
            不带参数的组件A
          </div>)
        }}/>
        <Route path={`${match.path}/sub`} render = {(router) =>{
          console.log(router)
          return (<div>当前组件 SUB</div>)
        }}/>
        <Route path={`${match.path}/:id`} render = {(router) =>{
          console.log(router)
          return (<div>
            带参数的组件A<br/>
            参数：{router.match.params.id}
          </div>)
        }}/>
      </Switch>
      </div>
  }
}

class B extends Component{
  render(){
    return <div>Component B</div>
  }
}

class Wrapper extends Component{
  constructor(props){
    super(props)
  }

  render(){
    return (
      <div className="naves">
        <Link to="/a">组件A</Link>
        <Link to="/a/123">带参数的组件A</Link>
        <Link to="/a/sub">组件Sub</Link>
        <Link to="/b/123">内页</Link>
        {this.props.children} 
      </div>
    )
  }
}



ReactDom.render(
  <Router>
    <Wrapper>
      <Switch>
        <Route path="/a" component={A}/>
        {/* <Route exact path="/a/:id?" component={A}/> */}
        {/* <Redirect from="" to="/"/> */}
        <Route path="/b/:id" component={B}/>
      </Switch>
    </Wrapper>
  </Router>,
  document.getElementById("app")
)