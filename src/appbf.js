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
    const { params } = this.props.match
    return <div>
      Component A
      参数：{ params.id}
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
        <Link to="/a">不带参数的组件A</Link>
        <Link to="/a/123">带参数的组件A</Link>
        <Link to="/b/123">内页</Link>
        {this.props.children} 
      </div>
    )
  }
}

class App extends Component{
  render(){
    return (
      <Router>
        <Wrapper>
          <Switch>
          <Route exact path="/a" component={Home}/>
          {/* <Redirect from="" to="/"/> */}
          <Route path="/b/:id" component={Home2}/>
          </Switch>
        </Wrapper>
      </Router>
    )
  }
}

ReactDom.render(
  <Router>
    <Wrapper>
      <Switch>
        {/* <Route exact path="/a" component={A}/> */}
        <Route exact path="/a/:id?" component={A}/>
        {/* <Redirect from="" to="/"/> */}
        <Route path="/b/:id" component={B}/>
      </Switch>
    </Wrapper>
  </Router>,
  document.getElementById("app")
)