import { resolve } from "upath";

class MUtil{
  request(param){
    const _this = this;
    return new Promise((resolve,reject) => {
      $.ajax({
        type: param.type || "get",
        url: param.url || '',
        data: param.data || {},
        dataType : param.dataType || "json",
        success(res){
          if(res.status === 0){
            typeof resolve == "function" && resolve(res.data, res.msg)
          }else if(res.status === 10){//未登录
            _this.doLogin();
          }else{
            typeof reject == "function" && reject(res.msg, res.data)
          }
        },
        error(err){
          typeof reject == "function" && reject(err.statusText)
        }
      })
    })
  }

  doLogin(){
    window.location.href="/login?redirect="+ encodeURIComponent(window.location.pathname)
  }

  getUrlParam(name){
    var queryString = window.location.search.split("?")[1] || '';
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var result = queryString.match(reg) || [];
    return result[2] ? decodeURIComponent(result[2]) : null;
  }

  errorTips(errMsg){
    alert(errMsg ||"好像哪里不对了~~~~")
  }

  setStorage(name,data){
    const dataType = typeof data;
    if(dataType == "object"){
      localStorage.setItem(name, JSON.stringify(data))
    }else if(["number","string","boolean"].indexOf(dataType) >= 0){
      localStorage.setItem(name,data)
    }else{
      alert("该类型不适合本地存储")
    }
  }

  getStorage(name){
    let data = localStorage.getItem(name);
    return data ? JSON.parse(data) : '';
  }

  removeStorage(name){
    localStorage.removeItem(name)
  }

}

export default MUtil;