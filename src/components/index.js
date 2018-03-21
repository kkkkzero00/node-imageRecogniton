import React from 'react';
import './index.less';
import axios from 'axios';
import qs from 'qs';

axios.defaults.withCredentials = true;

class Index extends React.Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      upload:'Upload +',
      recogizedWord:[],
      file:null,
      briefSrc:'',
      hasLoad:false
    }
  } 

  handleClick(e){

    // e.preventDefault();
    e.stopPropagation();

    let checkImg = document.getElementById("checkImg");

    
    this.setState({
      upload:'uploading...'
    })
    checkImg.click();
    

  }

  handleChange(e){
    let file = e.target.files[0];
    // console.log(file)
    var reader = new FileReader();  
    reader.readAsDataURL(file);  
    var self = this;
    this.setState({
      hasLoad:false
    })
    reader.onloadend  = function(){  
        self.setState({
          briefSrc:reader.result,
          hasLoad:true
        });

        reader.onloadend = null;
    }  

    this.setState({
      file
    })
  }

  handleSubmit(e){
    
    // console.log(e.target);
    let {file} = this.state;
    let url = 'http://localhost:3453/api/uploadImg'
    
    let config = {
      headers: {'Content-Type': 'multipart/form-data'}
    }
    let formData = new FormData();
    formData.append("image",file,file.name);
    let self = this;
    // console.log(formData.get('image'))
    axios.post(url,formData,config).then((res)=>{
        let {data} = res;
        // console.log(data.words_result)
        self.setState({
          recogizedWord:data.words_result
        })
        // console.log(res);
    })
  }

  render() {

    return (
      <div className="wrapper">
        <div className="upload" onClick={this.handleClick}>
            <input 
              type="file" 
              id="checkImg" 
              name="img" 
              style={{display:"none"}} 
              accept="image/*" 
              onChange={this.handleChange}
              />
            {this.state.hasLoad?
              (<img  
                className="briefImg" 
                src={this.state.briefSrc}/>):
              (<span className="title">
                 {this.state.upload}    
               </span>)}
            
        </div>

        <button 
          className="getWord" 
          onClick={this.handleSubmit}>
          Get word
        </button>

        <div className="result">
          {this.state.recogizedWord.map((item,index) => {
              return <p key={index}>{item.words}</p>;
          })}
        </div>
      </div>
    );
  }
}

export default Index;