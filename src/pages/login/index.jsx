import React, { Component} from 'react'
import './index.scss'

export default class PageTitle extends Component {
  constructor(props){
    super(props)

    this.state = {
      userName:'',
      passWord:''
    }
  }
  
  onInputChange(e){
     this.setState({
       [e.target.name] : e.target.value
     },() => {
       console.log(this.state)
     })
  }

  submit(e){
    console.log("den")
  }

  render(){
    return (
        <div className="col-md-4 col-md-offset-4">
            <div className="panel panel-default login-panel">
              <div className="panel-heading">欢迎登录 - MMALL管理系统</div>
              <div className="panel-body">
                <div>
                  <div className="form-group">
                    <input
                    name = "userName"
                    type="text" 
                    className="form-control" 
                    placeholder="请输入用户名"
                    onChange = { e => {this.onInputChange(e)}}/>
                  </div>
                  <div className="form-group">
                    <input
                    name = "passWord"
                    type="password"
                    className="form-control"
                    placeholder="请输入密码"
                    onChange = { e => {this.onInputChange(e)}}/>
                  </div>
                  <button
                  className="btn btn-block btn-primary"
                  onClick = { e => {this.submit(e)}}>登录</button>
                </div>
              </div>
            </div>
        </div>
    )
  }
}