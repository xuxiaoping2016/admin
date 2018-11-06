import React ,{ Component} from 'react'
import PageTitle from 'components/page-title/index.jsx'
import './index.css'

export default class Home extends Component {
  constructor(props){
    super(props)
  }

  render(){
    return (
      <div id="page-wrapper">
        <PageTitle title="首页"/>
        <div className="row">
          <div className="col-middle-12">
            NDFDSF
          </div>
        </div>
        <button className="btn btn-default">test</button>
      </div>
    )
  }
}