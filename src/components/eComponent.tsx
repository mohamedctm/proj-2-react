import React from 'react';
import { myInfo, updateSelf, Allposts } from '../api/LibraryClient';
import { Post } from '../models/Post';
import { Form, FormGroup, Input } from 'reactstrap';
import { User } from '../models/User';
import { Editorview } from './views/viewPostEditor';

export default class Editor extends React.Component<any,any> {

constructor(props:any){
    super(props);
    this.state = {
        data: [],
        userinfo: [],
        pending: 0,
        resolved: false,
        unresolved:false,
        all:true,
        viewPost: true,
        info: false,
        username:'',
        password:'',
        firstname1: '',
        lastname1:'',
        email: '',
        phone:'',
    }
}

async componentDidMount() {
    try {
        this.setState({
            data: await Allposts(),
            userinfo: await myInfo(this.props.writerid),
        //     username: this.state.userinfo.username,
        // password:this.state.userinfo.password,
        // firstname: this.state.userinfo.firstname,
        // lastname: this.state.userinfo.lastname,
        // email: this.state.userinfo.email,
        // phone:this.state.userinfo.phone,
            isError: false,
        })
      } catch (e) {
        this.setState({
          isError: true,
          errorMessage: e.message,
        })
    }   
}

resolvedf = () => {
    this.setState({
      resolved: true,
      unresolved: false,
      all:false
    })
  }
  unresolvedf = () => {
    this.setState({
      resolved: false,
      unresolved: true,
      all:false
    })
  }

  allf = () => {
    this.setState({
      resolved: false,
      unresolved: false,
      all:true
    })
  }
  disable = () => {
    this.setState({
      info:false
    })
  }
  enable = () =>{
    this.setState({
        info: true
    });

}

setUsername= (pw: any) => {
    this.setState({
      username: pw.currentTarget.value,
    })
  }
  setPassword= (pw: any) => {
    this.setState({
      password: pw.currentTarget.value,
    })
  }
  setFirstname= (pw: any) => {
    this.setState({
      firstname1: pw.currentTarget.value,
    })
  }
  setLastname= (pw: any) => {
    this.setState({
      lastname1: pw.currentTarget.value,
    })
  }
  setEmail= (pw: any) => {
    this.setState({
      email: pw.currentTarget.value,
    })
  }
  setPhone = (pw: any) => {
    this.setState({
      phone: pw.currentTarget.value,
    })
  }

  attemptUpdate = async (event: any) => {
    event.preventDefault();
    console.log(event);
    try {
      const levelup : User = await updateSelf(this.props.writerid,this.state.username,this.state.password,this.state.firstname1,
        this.state.lastname1,this.state.email,this.state.phone,this.state.userinfo.permission);
      this.setState({
        info: false,  
        userinfo: levelup,      
      });
      console.log(levelup);
    
    } catch (error) {
      this.setState({
        info: true,
      })
    }
  }
    render(){
        const pending = this.state.data.filter((c: { status: string; }) => c.status === "pending").length;
        const resolved = this.state.data.filter((c: { status: string; }) => c.status !== "pending").length;
        const Rolex = this.state.userinfo.permission;
        let role = '';
        switch(Rolex){
            case 1:
                role = "admin";
                break;
                case 2:
                role="editor";
                break;
                default: role ="writer";
        }

        return(
            <div className="theFrame">
                <div className="box themain">
        <div className="boxrow spacer">Hi {this.state.userinfo.firstname} &nbsp; ({role})</div>  
                <div className="boxrow spacer">&nbsp;</div>  
                <div className="boxrow"><div className="spacer"></div><label className="click" onClick={this.allf}>All posts {pending + resolved}</label> </div>  
                <div className="boxrow"><div className="spacer"></div><label className="click" onClick={this.unresolvedf}>Pending {pending}</label> </div>  
                <div className="boxrow"><div className="spacer"></div><label className="click" onClick={this.resolvedf}>Resolved {resolved}</label> </div> 
                <div className="spcaer">&nbsp;</div>
                <div className="boxrow spacer">
                 </div>  

            </div>
             { this.state.unresolved && (this.state.data.filter((c: { status: string; }) => c.status === "pending").map((u:Post|any,x:number) =>{
                return(
                    <Editorview key={x} thekey={x} id={u.postId} author={u.author} postTitle={u.postTitle}
                    postDescription={u.postDescription} postText={u.postText} keywords={u.keyWords} status={u.status}
                    resolver={u.resolver} dateSubmitted={u.dateSubmitted} postType={u.postType} postField={u.postField}
                    published={u.published} />
                    )      
                    })         
        )}
        {this.state.resolved && (this.state.data.filter((c: { status: string; }) => c.status !== "pending").map((u:Post|any,x:number) =>{
                return(
                    <Editorview key={x} thekey={x} id={u.postId} author={u.author} postTitle={u.postTitle}
                    postDescription={u.postDescription} status={u.status} postType={u.postType} postField={u.postField}
                    resolver={u.resolver} dateSubmitted={u.dateSubmitted} postText={u.postText} keywords={u.keyWords}
                    published={u.published} />
                    )      
                    })         
        )}
        {this.state.all && (this.state.data.map((u:Post|any,x:number) =>{
                return(
                    <Editorview key={x} thekey={x} id={u.postId} author={u.author} postTitle={u.postTitle}
                    postDescription={u.postDescription} status={u.status} postType={u.postType} postField={u.postField}
                    resolver={u.resolver} dateSubmitted={u.dateSubmitted} postText={u.postText} keywords={u.keyWords} 
                    published={u.published}/>
                    )      
                    })         
        )}
        {this.state.info && <div className="overlay">
            <span className="close" onClick={this.disable}>&times;</span>
            
            <Form onSubmit={this.attemptUpdate}>
                <p>Update your profile information</p>
        <span className="tag"> update </span>
            <FormGroup>
          <Input onChange={this.setUsername} value={this.state.username} type="text" name="username"
           id="set username" placeholder={"username:  "+ this.state.userinfo.username}
           />
           </FormGroup>
           <FormGroup>
           <Input onChange={this.setPassword} value={this.state.password} type="password" name="password"
           id="password" placeholder="password:  (*******)"
           />
           </FormGroup>
           <FormGroup>
           <Input onChange={this.setFirstname} value={this.state.firstname} type="text" name="firstname"
           id="firstname" placeholder={"firstname: "+ this.state.userinfo.firstname}
           />
           </FormGroup>
           <FormGroup>
           <Input onChange={this.setLastname} value={this.state.lastname} type="text" name="lastname"
           id="lastname" placeholder={ "lastname:  "+this.state.userinfo.lastname}
           />
           </FormGroup>
           <FormGroup>
           <Input onChange={this.setEmail} value={this.state.email} type="text" name="email"
           id="email" placeholder={"email: "+this.state.userinfo.email}
           />
           </FormGroup>
           <FormGroup>
           <Input onChange={this.setPhone} value={this.state.phone} type="text" name="phone"
           id="phone" placeholder={"phone: " +this.state.userinfo.phone}
           />
            
          </FormGroup>
          <FormGroup className="notdiv">
            <Input type="submit" value="submit" />
          </FormGroup>
      </Form>
         </div>
        }
        </div>
        )
    }
}