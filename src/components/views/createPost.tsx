import React from 'react';
import { createPost } from '../../api/LibraryClient';
import { Route, Switch, Redirect } from 'react-router';
import { Form, FormGroup, Input } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { Post } from '../../models/Post';



export class NewPost extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
        sucsess:false,
        text:'',
        description: '',
        type: '',
        field: '',
        title: '',
        keys: '',
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

  clearError = () => {
    this.setState({
      errorMessage: '',
      isError: false,
      success: false,
      id: '',
      amount: '',
      description: '',
      type: '',
    })
  }

  attemptUpdate = async (event: any) => {
    event.preventDefault();
    console.log(event);
    try {
      const levelup : Post = await createPost(this.props.id,this.state.title,this.state.description,this.state.text,"2020-06-22T14:45:15","2020-06-22T14:45:15",this.state.type,this.state.field,this.state.keys,'pending',0,0);
      this.setState({
        success: true
      });
      console.log(levelup);
    
    } catch (error) {
      this.setState({
        isError: true,
        success:false,
        errorMessage: error.message,
      })
    }
  }

  render() {
    if(!this.state.success){
    return (
      <div>
     <NavLink to="/posts"><button>Back to posts</button></NavLink>
      <Form onSubmit={this.attemptUpdate}>
      {<h3>{this.state.errorMessage}</h3>}
        <span className="tag"> new post</span>
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
            <textarea name="text" onChange={this.setText} value={this.state.text}/>
            
          </FormGroup>
          
            <FormGroup>
            <select onChange={this.setField} name="filed" required>
            <option >select type</option>
            <option value="Politics">Politics</option>
            <option value="Sport">Sport</option>
            <option value="Economics">Economics</option>
            </select>
            </FormGroup><FormGroup>
            <select onChange={this.setType} name="type" required>
            <option >select Field</option>
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
    );
    }
    else{  
        return (
      <>
    <Switch>
        <Route>
        <Redirect to="/posts"/>
        </Route>
      </Switch>
    </>
     ) 
    }
  }

}