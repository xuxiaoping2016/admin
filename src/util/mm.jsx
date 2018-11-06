import { resolve } from "upath";

class MUtil{
  request(param){
    return new Promise((resolve,reject) => {
      $.ajax({
        type: param.type || "get",
        url: param.url || '',
        data: param.data || {},
        dataType : param.dataType || "json",
        success(res){
          resolve(res)
        },
        error(err){
          reject(err)
        }
      })
    })
  }
}

export default MUtil;