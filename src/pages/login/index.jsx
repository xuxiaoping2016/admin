import React, { Component} from 'react'
import user from 'service/user-service.jsx'
import './index.scss'
import MUtil from 'util/mm.jsx'
const _mm = new MUtil();

export default class PageTitle extends Component {
  constructor(props){
    super(props)

    this.state = {
      username:'',
      password:'',
      redirect:_mm.getUrlParam('redirect') || '/'
    }
  }
  
  onInputChange(e){
     this.setState({
       [e.target.name] : e.target.value
     },() => {
      //  console.log(this.state)
     })
  }

  submit(e){
    const {redirect, ...logininfo} = this.state;
    console.log(redirect)
    // this.props.history.push(redirect);
    // return;
    
    const checkResult = user.checkLoginInfo(logininfo);
    if(checkResult.status){
      user.login(logininfo).then((res) => {
        _mm.setStorage("userInfo",res)
        this.props.history.push(redirect);
      },(err) => {
        _mm.errorTips(err)
      })
    }else{
      _mm.errorTips(checkResult.msg)
    }
    
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
                    name = "username"
                    type="text" 
                    className="form-control" 
                    placeholder="请输入用户名"
                    onChange = { e => {this.onInputChange(e)}}/>
                  </div>
                  <div className="form-group">
                    <input
                    name = "password"
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