import React ,{ Component} from 'react'
import { Link } from 'react-router-dom'
import PageTitle from 'components/page-title/index.jsx'
import Pagination from 'components/pagination/index.jsx'
import TableList from 'components/tableList/index.jsx'

import _product from 'service/product-service.jsx'
import MUtil from 'util/mm.jsx'
import './index.scss'

const _mm = new MUtil();

export default class ListSearch extends Component {
  constructor(props){
    super(props)

    this.state = {
        searchType:'productId', // productName
        searchKeyword:''
    }
  }

  onSearch = () =>{
      this.props.onSearch(this.state.searchType,this.state.searchKeyword)
  }

  onSearchKeywordKeyUp = (e) => {
      if(e.keyCode == 13){//回车
        this.onSearch();
      }
  }

  onChange = (e,key) => {
      this.setState({
        [key]: e.target.value.trim()
      },() => {
          console.log(this.state)
      })
  }


  render(){
    return (
        <div className="row search-wrap">
            <div className="col-md-12">
                <div className="form-inline">
                    <div className="form-group">
                        <select className="form-control" onChange={e =>this.onChange(e,"searchType")}>
                            <option value="productId">按商品ID查询</option>
                            <option value="productName">按商品名称查询</option>
                        </select>
                    </div>
                    <div 
                        className="form-group">
                        <input type="text" 
                        className="form-control" 
                        onChange={e =>this.onChange(e,"searchKeyword")}
                        onKeyUp = {e => this.onSearchKeywordKeyUp(e)}
                        />
                    </div>
                    <button className="btn btn-primary" onClick={this.onSearch}>搜索</button>
                </div>
            </div>
        </div>
    )
  }
}