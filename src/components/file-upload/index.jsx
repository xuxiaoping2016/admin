import React, { Component } from 'react'
// import FileUpload from 'react-fileupload'
import FileUpload from './FileUpload.jsx'


class FileUploader extends Component {
    constructor(props){
        super(props)
    }

    render(){
        /*指定参数*/
        var options={
            baseUrl:'/manage/product/upload.do',
            fileFieldName:'upload_file',
            dataType:"json",
            chooseAndUpload:true,
            uploadSuccess: res => this.props.onUploadSuccess(res.data),
            uploadError: (err) => this.props.onUploadError(err.message || '上传图片失败')
        }
        /*调用FileUpload,传入options。然后在children中*/
        /*传入两个dom(不一定是button)并设置其ref值。*/
        return (
            <div>
                <FileUpload options={options}>
                    <button className="btn btn-xs btn-default" ref="chooseAndUpload">choose</button>
                </FileUpload>
            </div>
        )	        
    }
}

export default FileUploader;