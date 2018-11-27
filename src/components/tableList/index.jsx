import React ,{ Component} from 'react'

export default class TableList extends Component {
  constructor(props){
    super(props)

    this.state = {
        isFirstLoading: true
    }
  }

  componentWillReceiveProps(){
      //列表只有第一次挂在的时候为true
      this.setState({
          isFirstLoading: false
      })
  }
  render(){
    //   const {current, total, onChange } = this.props;
    const tableHeader = this.props.tableHeader.map((item,index) => {
        if(typeof item === 'object'){
            return <th key={index} width={item.width}>{item.name}</th>
        }else{
            return <th key={index}>{item}</th>
        }
    });

    const listBody = this.props.children;

    const ListInfo = (
        <tr>
            <td colSpan={this.props.tableHeader.length}>{ this.state.isFirstLoading ? '暂无数据' : '没有找到相应结果!'}</td>
        </tr>
    )
    return (
        <div className="row">
            <div className="col-md-12">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>{tableHeader}</tr>
                    </thead>
                    <tbody>
                        {listBody.length ? listBody : ListInfo}
                    </tbody>
                </table>
            </div>
        </div>
    )
  }
}