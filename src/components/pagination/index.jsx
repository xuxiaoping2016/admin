import React ,{ Component} from 'react'
import RcPagination from 'rc-pagination'
import css from 'rc-pagination/dist/rc-pagination.min.css'

export default class Pagination extends Component {
  constructor(props){
    super(props)
  }

  render(){
      const {current, total, onChange } = this.props;
    return (
        <div className="row">
            <div className="col-md-12">
                <RcPagination
                    {...this.props}
                    hideOnSinglePage
                    showQuickJumper
                />
            </div>
        </div>
    )
  }
}