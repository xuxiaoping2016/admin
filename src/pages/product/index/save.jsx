import React ,{ Component} from 'react'
import { Link } from 'react-router-dom'
import PageTitle from 'components/page-title/index.jsx'
import CategorySelect from './category-selector.jsx'
import FileUploader from  'components/file-upload/index.jsx'
import RichEditor from 'components/rich-editor/index.jsx'

import _product from 'service/product-service.jsx'
import MUtil from 'util/mm.jsx'
import './save.scss'

const _mm = new MUtil();

export default class ProductSave extends Component {
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
            res.defaultDetail = res.detail;
            this.setState(res)
          },err => {
              _mm.errorTips(err)
          });
      }
  }

//   [firstCategoryId, secondCategoryId]
  onCategoryChange = (category) => {
      console.log(category)
    this.setState({
        categoryId:category[1],
        parentCategoryId: category[0]
    })
  }

  onUploadSuccess = (res) => {
    let { subImages } = this.state;
    subImages.push(res)
    this.setState({
        subImages
    })
  }

  onUploadError = (err) => {
      _mm.errorTips(err)
  }

  onImgDelete(index){
    let { subImages } = this.state;
    subImages.splice(index,1)
    this.setState({subImages})
  }

  onRichEditorChange = (value) => {
      console.log(value)
      this.setState({detail:value})
  }

  onValueChange = (e) => {
      const target = e.target;
      this.setState({
          [target.name]: target.value.trim()
      })
  }
  
  onSubmit = () => {
      const {name, subtitle,price,stock,
        categoryId,
        parentCategoryId,
        subImages,
        detail,
        status
        } = this.state;

        let imgs = subImages.map(item => item.uri).join(",")
        const categoryId2 = parseInt(categoryId);

      let product = {name, subtitle,categoryId:categoryId2,detail,status,subImages:imgs,price:parseFloat(price),stock:parseInt(stock)}
      let productCheckResult = _product.checkProduct(product)

      if(productCheckResult.status){
          _product.saveProduct(product).then(res => {
            _mm.successTips(res);
            this.props.history.push("/product/index")
          },err => {
              _mm.errorTips(err)
          })
      }else{
          _mm.errorTips(productCheckResult.msg)
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
                    <input type="text" 
                        className="form-control" 
                        placeholder="请输入商品名称"
                        value={state.name}
                        name="name"
                        onChange={e =>this.onValueChange(e)} 
                    />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">商品描述</label>
                    <div className="col-sm-5">
                    <input type="text" className="form-control" placeholder="请输入商品描述"
                        name="subtitle"
                        value = {state.subtitle}
                        onChange={e =>this.onValueChange(e)} 
                    />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">所属分类</label>
                    <div className="col-sm-10">
                        <CategorySelect
                            categoryId = { state.categoryId}
                            parentCategoryId= { state.parentCategoryId}
                            onCategoryChange = {this.onCategoryChange}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">价格</label>
                    <div className="col-sm-3">
                        <div className="input-group">
                            <input type="number" className="form-control"
                                name="price"
                                value = {state.price}
                                onChange={e =>this.onValueChange(e)} 
                            />
                            <span className="input-group-addon">元</span>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">库存</label>
                    <div className="col-sm-3">
                    <div className="input-group">
                        <input type="number" className="form-control"
                            name="stock"
                            value = {state.stock}
                            onChange={e =>this.onValueChange(e)} 
                        />
                        <span className="input-group-addon">件</span>
                    </div>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">商品图片</label>
                    <div className="col-sm-10">
                        {
                            subImages.length ? subImages.map((item,index) => {
                                return (
                                    <div className="img-con" key={index}>
                                        <img src={item.url} />
                                        <i className="fa fa-close" onClick={this.onImgDelete.bind(this,index)}></i>
                                    </div>
                                )
                            }) : '请上传图片'
                        }
                    </div>
                    <div className="col-sm-offset-2 col-sm-10" style={{paddingTop: subImages.length ? "15px" : '0'}}>
                        <FileUploader
                            onUploadSuccess= {this.onUploadSuccess}
                            onUploadError ={this.onUploadError}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">商品详情</label>
                    <div className="col-sm-10">
                        <RichEditor
                        // detail = {state.detail}
                        defaultDetail ={ state.defaultDetail}
                         onValueChange = {this.onRichEditorChange} />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-10">
                    <button type="submit" className="btn btn-default"
                        onClick={this.onSubmit}
                    >Sign in</button>
                    </div>
                </div>
             </div>
        </div>
    )
  }
}