import React ,{ Component} from 'react'
import { Link } from 'react-router-dom'
import PageTitle from 'components/page-title/index.jsx'
import ListSearch from './index-list-search.jsx'
import Pagination from 'components/pagination/index.jsx'
import TableList from 'components/tableList/index.jsx'

import _product from 'service/product-service.jsx'
import MUtil from 'util/mm.jsx'
import './index.scss'

const _mm = new MUtil();

export default class UserList extends Component {
  constructor(props){
    super(props)

    this.state = {
        pageNum : 1,
        total: 0,
        list: [],
        listType: 'list'
    }
  }

  componentDidMount(){
    this.loadProductList();
  }

  loadProductList(){
      let listParam = {
          listType: this.state.listType,
          pageNum:this.state.pageNum,
      }

      if(this.state.listType == 'search'){
          listParam.searchType = this.state.searchType,
          listParam.searchKeyword = this.state.searchKeyword
      }
    _product.getProductList(listParam).then(res => {
      this.setState(res);
    },err => {
        this.setState({
            list:[],
            pageNum:1,
            total:0
        })
      _mm.errorTips(err)
    })
  }

  onSetProductStatus = (e,productId,status) =>{
      let newStatus = status == 1 ? 2 : 1;
      let tip = status == 1 ? '确定要下架该商品？' :" 确定要上架该商品？"
      if(window.confirm(tip)){
          _product.setProductStatus({
              productId,
              status:newStatus
            }).then(res => {
                _mm.successTips()
                this.loadProductList(this.state.pageNum);
          },err => {
            _mm.errorTips(err)
          })
      }
  }

  onChange = (pageNum) =>{
    this.setState({pageNum},()=>{
        this.loadProductList();
    })
  }

  // 搜索
  onSearch = (searchType,searchKeyword) => {
    // console.log(searchType,searchKeyword)
    let listType = searchKeyword === '' ? 'list' : 'search';
    this.setState({
        listType,
        pageNum:1,
        searchType,
        searchKeyword
    },() => {
        this.loadProductList();
    })
  }

  render(){
      const {pageNum, total, list} = this.state;
    
      let tableHeads = [
          {name:"商品ID",width:"10%"},
          {name:"商品信息",width:"40%"},
          {name:"价格",width:"15%"},
          {name:"状态",width:"15%"},
          {name:"操作",width:"20%"}
      ]
    return (
      <div id="page-wrapper">
        <PageTitle title="商品列表">
            <div className="page-header-right">
                <Link className="btn btn-primary" to="/product/save">
                    <i className="fa fa-plus"></i><span>添加商品</span>
                </Link>
            </div>
        </PageTitle>
        
        <ListSearch onSearch={this.onSearch}/>

        <TableList tableHeader={tableHeads}>
            {
                list.map(item => {
                    return (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>
                                <p>{item.name || ''}</p>
                                <p>{item.subtitle || ''}</p>
                            </td>
                            <td>￥{item.price}</td>
                            <td>
                                <p>{item.status ==1 ? "在售" :"已下架"}</p>
                                <button className="btn btn-xs btn-warning"
                                onClick={e => this.onSetProductStatus(e,item.id,item.status)}>{item.status ==1 ? "下架" :"上架"}</button>
                            </td>
                            <td>
                                <Link className="oper" to={`/product/detail/${item.id}`}>查看详情</Link>
                                <Link className="oper" to={`/product/save/${item.id}`}>编辑</Link>
                            </td>
                        </tr>
                    )
                })
            }
        </TableList>
        <Pagination
            current= {pageNum}
            total = {total}
            onChange={this.onChange}
        />
        </div>
    )
  }
}