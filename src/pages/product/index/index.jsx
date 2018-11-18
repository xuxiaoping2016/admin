import React ,{ Component} from 'react'
import { Link } from 'react-router-dom'
import PageTitle from 'components/page-title/index.jsx'
import Pagination from 'components/pagination/index.jsx'
import TableList from 'components/tableList/index.jsx'

import _product from 'service/product-service.jsx'
import MUtil from 'util/mm.jsx'
const _mm = new MUtil();

export default class UserList extends Component {
  constructor(props){
    super(props)

    this.state = {
        pageNum : 1,
        total: 0,
        list: []
    }
  }

  componentDidMount(){
    this.loadUserList(this.state.pageNum);
  }

  loadUserList(page){
    _product.getProductList(page).then(res => {
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

  onChange = (page) =>{
    this.loadUserList(page);
  }
  render(){
      const {pageNum, total, list} = this.state;
    
    return (
      <div id="page-wrapper">
        <PageTitle title="商品列表"/>
        <TableList tableHeader={["商品ID","商品信息","价格","状态","操作"]}>
            {
                list.map(item => {
                    return (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>
                                <p>{item.name}</p>
                                <p>{item.subtitle}</p>
                            </td>
                            <td>￥{item.price}</td>
                            <td><span>{item.status ==1 ? "在售" :"已下架"}</span></td>
                            <td>
                                <Link to={`/product/detail/${item.id}`}>查看详情</Link>
                                <Link to={`/product/save/${item.id}`}>编辑</Link>
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