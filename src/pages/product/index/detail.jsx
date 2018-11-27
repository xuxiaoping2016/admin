import React ,{ Component} from 'react'
import { Link } from 'react-router-dom'
import PageTitle from 'components/page-title/index.jsx'
import CategorySelect from './category-selector.jsx'

import _product from 'service/product-service.jsx'
import MUtil from 'util/mm.jsx'
import './save.scss'

const _mm = new MUtil();

export default class Detail extends Component {
  constructor(props){
    super(props)
    
    this.state = {
        id: this.props.match.params.id,
        name:'',
        subtitle:'',
        categoryId:0,
        parentCategoryId:0,
        subImages:[],
        detail:'',
        price:'',
        stock:'',
        status:1 //商品状态1 为在售
    }
  }

  componentDidMount(){
      this.loadProduct();
  }

  loadProduct(){
      const { id } = this.state;
      if(id){
          _product.getProduct(id).then(res => {
            let images = res.subImages.split(",")
            res.subImages = images.map(uri => {
                return {
                    uri,
                    url: res.imageHost + uri
                }
            })
            this.setState(res)
          },err => {
              _mm.errorTips(err)
          });
      }
  }

  render(){
      const { subImages } = this.state;
      const { state } = this;
      console.log(state)

    return (
        <div id="page-wrapper">
            <PageTitle title="添加商品"></PageTitle>
            
            <div className="form-horizontal">
                <div className="form-group">
                    <label className="col-sm-2 control-label">商品名称</label>
                    <div className="col-sm-5">
                        <p className="form-control-static">{state.name}</p>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">商品描述</label>
                    <div className="col-sm-5">
                    <p className="form-control-static">{state.subtitle}</p>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">所属分类</label>
                    <div className="col-sm-10">
                        <CategorySelect
                            readOnly
                            categoryId = { state.categoryId}
                            parentCategoryId= { state.parentCategoryId}
                            onCategoryChange = {this.onCategoryChange}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">价格</label>
                    <div className="col-sm-3">
                    <p className="form-control-static">{state.price} 元</p>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">库存</label>
                    <div className="col-sm-3">
                    <p className="form-control-static">{state.stock} 件</p>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">商品图片</label>
                    <div className="col-sm-10">
                        {
                            subImages.map((item,index) => {
                                return (
                                    <div className="img-con" key={index}>
                                        <img src={item.url} />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">商品详情</label>
                    <div className="col-sm-10">
                    <p className="form-control-static" dangerouslySetInnerHTML={{__html:state.detail}}></p>
                    </div>
                </div>
             </div>
        </div>
    )
  }
}