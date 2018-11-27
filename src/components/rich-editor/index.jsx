import React, { Component} from 'react'
import Simditor from 'simditor'
import 'simditor/styles/simditor.scss'

//依赖jquery
export default class RichEditor extends Component {
  constructor(props){
    super(props)
  }
  
  componentDidMount(){
      this.loadEditor();
  }

  componentWillReceiveProps(nextProps){
    let detailChange = this.props.defaultDetail != nextProps.defaultDetail;
    if(!detailChange){
        return;
    }
    this.simditor.setValue(nextProps.defaultDetail)
  }

  loadEditor(){
      let ele = this.refs.textarea;
      this.simditor = new Simditor({
          textarea: $(ele),
          defaultValue: this.props.placeholder || "请输入",
          upload:{
              url:'/manage/product/richtext_img_upload.do',
              defaultImage:'',
              fileKey:"upload_file"
          }
      })
      this.bindEditorEvent();
  }

  // 初始化文本编辑器的事件
  bindEditorEvent(){
    this.simditor.on('valuechanged', e => {
        this.props.onValueChange(this.simditor.getValue())
    })
  }

  render(){
    return (
        <div className="rich-editor">
          <textarea ref="textarea"></textarea>
        </div>
    )
  }
}