import React, {Component} from "react"

export default class Home2 extends Component{
  render(){
    const {params } = this.props.match;
console.log(this.props)
    return <h1>Home B  参数是 {params.id}</h1>
  }
}