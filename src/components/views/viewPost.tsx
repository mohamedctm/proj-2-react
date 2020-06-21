import React from 'react';
import { getPostById, updatePost, deletingPost } from '../../api/LibraryClient';
import { FormGroup, Input, Form } from 'reactstrap';
import { Post } from '../../models/Post';



export  class Postview extends React.Component<any,any> {
    constructor(props:any){
        super(props);
        this.state= {
            viewPost:false,
            editPost:false,
            postValue: this.props.postid,
            data:[],
            text:this.props.postText,
        description: this.props.postDescription,
        type: this.props.postType,
        field: this.props.postField,
        title: this.props.postTitle,
        keys: this.props.keywords,
        text1:this.props.postText,
        description1: this.props.postDescription,
        type1: this.props.postType,
        field1: this.props.postField,
        title1: this.props.postTitle,
        keys1: this.props.keywords,
        date1: this.props.dateSubmitted,
        status1: this.props.status,
        published: this.props.published,
        thereIsApost:true,
        }

    }
    async getPost(){
        this.setState({
            data:  await getPostById(1),
        });
  }
  deletePost = async (event: any) => {
    event.preventDefault();
    console.log(event);
    
      const statusz : Post = await deletingPost(this.props.id);
      this.setState({
        thereIsApost: false
      });
      this.props.action()

  }
  attemptUpdate = async (event: any) => {
    event.preventDefault();
    console.log(event);
    try {
      const levelup : Post = await updatePost(this.props.id,this.props.author,this.state.title,this.state.description,this.state.text,"2020-06-22T14:45:15","2020-06-22T14:45:15",this.state.type,this.state.field,this.state.keys,'pending',0,0);
      this.setState({
        editPost: false,
        text1:this.state.text,
        description1: this.state.description,
        type1: this.state.type,
        field1: this.state.field,
        title1: this.state.title,
        keys1: this.state.keys,
      });
      this.props.action()
    
    } catch (error) {
      this.setState({
        editPost: true,
        // text1:this.props.postText,
        // description1: this.props.postDescription,
        // type1: this.props.postType,
        // field1: this.props.postField,
        // title1: this.props.postTitle,
        // keys1: this.props.keywords,
        // date1: this.props.dateSubmitted,
        // status1: this.props.status
      })
    }
  }

  setText= (pw: any) => {
    this.setState({
      text: pw.currentTarget.value,
    })
  }
  setDescription = (pw: any) => {
    this.setState({
        description: pw.currentTarget.value,
    })
  }
  setType= (pw: any) => {
    this.setState({
      type: pw.currentTarget.value,
    })
  }
  setField= (pw: any) => {
    this.setState({
      field: pw.currentTarget.value,
    })
  }
  setTitle= (pw: any) => {
    this.setState({
      title: pw.currentTarget.value,
    })
  }

  setKeys= (pw: any) => {
    this.setState({
      keys: pw.currentTarget.value,
    })
  }
    disable = () => {
        this.setState({
          viewPost: false,
          editPost:false,
          info:false
        })
      }
       enable = () =>{
            this.setState({
                viewPost: true
            });
    
      }
       enableE = () =>{
            this.setState({
                editPost: true
            });
    
      }
    render(){
        return(
            <>
           {this.state.thereIsApost &&  <div key={Math.floor(Math.random() * 10)} className="box">
            {(this.state.status1 === "pending" && this.state.published === 0) &&<button className="deletePost" onClick={this.deletePost}>&times;</button>}
            <div className="boxrow dateFormat"> created: {this.state.date1}</div>  
            <div className="boxrow"><span>{this.state.status1}</span></div>  
            <div className="boxrow"><h1>{this.state.title1}</h1></div>  
            <div className="spacer">&nbsp;</div>
            <div className="boxrow">
                <button onClick={this.enable}>Preview</button>
        {(this.state.published === 0) && <button onClick={this.enableE}>Edit</button>}</div>  
          </div>}
          {this.state.viewPost && <div className="overlay">
            <span className="close" onClick={this.disable}>&times;</span>
            <div className="viewHolder">
        <h1>{this.state.title1}</h1>
        <p className="desc">{this.state.description1}</p>
        <p className="body">{this.state.text1}</p>
        <p className="keys"> {this.state.type1} / &nbsp;  {this.state.field1}: <br/>keywords: {this.state.keys1}</p>
            </div>
        </div>}
        {this.state.editPost && <div className="overlay">
            <span className="close" onClick={this.disable}>&times;</span>
            <div className="viewHolder">
            <Form onSubmit={this.attemptUpdate}>
        <span className="tag"> Edit</span>
            <FormGroup>
          <Input onChange={this.setTitle} value={this.state.title} type="text" name="title"
           id="posttitle" placeholder="set title"
           required/>
           </FormGroup>
           <FormGroup>
           <Input onChange={this.setDescription} value={this.state.description} type="text" name="description"
           id="description" placeholder="set description"
           required/>
           </FormGroup>
           <FormGroup>
           <Input onChange={this.setKeys} value={this.state.keys} type="text" name="keywrods"
           id="keywords" placeholder="set key words"
           required/>
           </FormGroup>
           <FormGroup>
        <textarea name="text" onChange={this.setText}>{this.state.text}</textarea>
            
          </FormGroup>
          
            <FormGroup>
            <select onChange={this.setField} name="filed" required>
            <option value={this.state.field1} selected>{this.state.field1}</option>
            <option value="Politics">Politics</option>
            <option value="Sport">Sport</option>
            <option value="Economics">Economics</option>
            </select>
            </FormGroup><FormGroup>
            <select onChange={this.setType} name="type" required>
        <option value={this.state.type1} selected>{this.state.type1}</option>
            <option value="Article">Article</option>
            <option value="News">News</option>
            <option value="Story">Story</option>
            </select>
          </FormGroup>
          <FormGroup className="notdiv">
            <Input type="submit" value="submit" />
          </FormGroup>
      </Form>
         </div>
        </div>}
            </>
        )
    }
}
