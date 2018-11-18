import React ,{ Component} from 'react'
import { Link } from 'react-router-dom'
import PageTitle from 'components/page-title/index.jsx'
import './index.scss'

import _statistic from 'service/statistic-service.jsx'
import MUtil from 'util/mm.jsx'
const _mm = new MUtil();

export default class Home extends Component {
  constructor(props){
    super(props)

    this.state = {
      userCount : "-",
      productCount : "-",
      orderCount: "-"
    }
  }

  componentDidMount(){
    this.loadCount();
  }

  loadCount(){
    _statistic.getHomeCount().then(res => {
      this.setState(res);
    },err => {
      _mm.errorTips(err)
    })
  }

  render(){
    const { userCount, productCount, orderCount } = this.state;
    return (
      <div id="page-wrapper">
        <PageTitle title="首页"/>
        <div className="row">
          <div className="col-md-4">
            <Link to="/user" className="color-box brown">
              <p className="count">{ userCount}</p>
              <p className="desc">
                <i className="fa fa-user-o"></i>
                <span>用户总数</span>
              </p>
            </Link>
          </div>
          <div className="col-md-4">
            <Link to="/product" className="color-box green">
              <p className="count">{ productCount}</p>
              <p className="desc">
                <i className="fa fa-user-o"></i>
                <span>商品总数</span>
              </p>
            </Link>
          </div>
          <div className="col-md-4">
            <Link to="/order" className="color-box blue">
              <p className="count">{ orderCount}</p>
              <p className="desc">
                <i className="fa fa-check-square-o"></i>
                <span>订单总数</span>
              </p>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}