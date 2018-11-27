import React ,{ Component} from 'react'
import { Link } from 'react-router-dom'
import PageTitle from 'components/page-title/index.jsx'
import Pagination from 'components/pagination/index.jsx'
import TableList from 'components/tableList/index.jsx'

import _product from 'service/product-service.jsx'
import MUtil from 'util/mm.jsx'
import './index.scss'

const _mm = new MUtil();

export default class CategorySelect extends Component {
  constructor(props){
    super(props)

    this.state = {
        firstCategoryList:[],
        firstCategoryId:0,
        secondCategoryList:[],
        secondCategoryId:''
    }
  }

  componentDidMount(){
      this.loadFirstCategory();
  }

  loadFirstCategory(){
    _product.getCategoryList().then(res => {
        this.setState({firstCategoryList:res})
    },err => {
        _mm.errorMsg(err)
    })
  }

  loadSecondCategory(){
    _product.getCategoryList(this.state.firstCategoryId).then(res => {
        this.setState({secondCategoryList:res})
    },err => {
        _mm.errorMsg(err)
    })
  }

  onFirstCategoryChange = (e) => {
      this.setState({
        firstCategoryId: e.target.value.trim() || 0,
        secondCategoryId: 0,
        secondCategoryList: []
      },() => {
          // 更新二级品
          this.loadSecondCategory();
          this.onPropsCategoryChange();
      })
  }
  onSecondCategoryChange = (e) => {
    this.setState({
      secondCategoryId: e.target.value.trim() || 0
    },() => {
        this.onPropsCategoryChange();
    })
}
  // 传给父组件选中的结果
  onPropsCategoryChange = () => {
    const { onCategoryChange } = this.props;
    const {firstCategoryId, secondCategoryId} = this.state;
    let categoryChangable = typeof this.props.onCategoryChange == 'function';
    categoryChangable && onCategoryChange([firstCategoryId, secondCategoryId])
  }

  componentWillReceiveProps(nextProps){
      let categoryIdChange = this.props.categoryId != nextProps.categoryId;
      let parentCategoryIdChange = this.props.parentCategoryId != nextProps.parentCategoryId;
      if(!categoryIdChange && !parentCategoryIdChange){
          return;
      }
    
    //   假如只有一级品类
    if(nextProps.parentCategoryId === 0){
        this.setState({
            firstCategoryId:nextProps.categoryId,
            secondCategoryId: 0
        })
    }else{
        this.setState({
            firstCategoryId:nextProps.parentCategoryId,
            secondCategoryId: nextProps.categoryId
        }, () => {
            this.loadSecondCategory();
        })
    }
      
  }
//   static getDerivedStateFromProps(props,state){
//     if(props.categoryId != state.secondCategoryId || props.parentCategoryId != state.firstCategoryId){
//         return {
//             categoryId : props.categoryId,
//             parentCategoryId : props.parentCategoryId
//         }
//     }
//     return null;
//   }


  render(){
      const { firstCategoryList, secondCategoryList} = this.state;
      const { readOnly } = this.props;
    return (
        <div className="category-select-wrap">
            <select 
                disabled={readOnly}
                className="form-control" 
                style={{width:"200px",display:"inline-block",marginRight:"10px"}}
                value={this.state.firstCategoryId}
                onChange={e => this.onFirstCategoryChange(e)}
            >
                <option key="0" value={0}>请选择一级分类</option>
                {firstCategoryList.map(item => {
                    return <option key={item.id} value={item.id}>{item.name}</option>
                })}
            </select>
            {
                secondCategoryList.length > 0 ?
                <select 
                    disabled={readOnly}
                    className="form-control"
                    style={{width:"200px",display:"inline-block"}}
                    value={this.state.secondCategoryId}
                    onChange={e => this.onSecondCategoryChange(e,"firstCategoryId")}
                >
                    <option key="0" value={0}>请选择二级分类</option>
                    {secondCategoryList.map(item => {
                        return <option key={item.id} value={item.id}>{item.name}</option>
                    })}
                </select>
                : null
            }
        </div>
    )
  }
}