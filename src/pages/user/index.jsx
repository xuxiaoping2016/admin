import React ,{ Component} from 'react'
import { Link } from 'react-router-dom'
import PageTitle from 'components/page-title/index.jsx'
import Pagination from 'components/pagination/index.jsx'

import _user from 'service/user-service.jsx'
import MUtil from 'util/mm.jsx'
const _mm = new MUtil();

export default class UserList extends Component {
  constructor(props){
    super(props)

    this.state = {
        pageNum : 1,
        total: 0,
        list: [],
        firstLoading: true
    }
  }

  componentDidMount(){
    this.loadUserList(this.state.pageNum);
  }

  loadUserList(page){
    _user.getUserList(page).then(res => {
      this.setState(res,() => {
          this.setState({firstLoading:false})
      });
    },err => {
        this.setState({
            list:[],
            pageNum:1,
            total:0
        })
      _mm.errorTips(err)
    })
  }

  onChange = (page) =>{
    this.loadUserList(page);
  }
  render(){
      const {pageNum, total, list, firstLoading} = this.state;

      let listBody = list.map(item => {
        return (
            <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.username}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{new Date(item.createTime).toLocaleDateString()}</td>
            </tr>
        )
    });
    
    let listErr = (
        <tr>
            <td colSpan={5}>{ firstLoading ? '暂无数据' : '没有找到相应结果!'}</td>
        </tr>
    )

    let tableBody = list.length > 0 ? listBody : listErr;
    return (
      <div id="page-wrapper">
        <PageTitle title="用户列表"/>
        <div className="row">
            <div className="col-md-12">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>用户名</th>
                            <th>邮箱</th>
                            <th>电话</th>
                            <th>注册时间</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableBody}
                    </tbody>
                </table>
            </div>
        </div>
        <Pagination
            current= {pageNum}
            total = {total}
            onChange={this.onChange}
        />
        </div>
    )
  }
}