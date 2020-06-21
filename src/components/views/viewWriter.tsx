import React from 'react';
import { updateSelf, deleteUser } from '../../api/LibraryClient';
import { FormGroup, Input, Form } from 'reactstrap';
import { User } from '../../models/User';


export  class Writerview extends React.Component<any,any> {
    constructor(props:any){
        super(props);
        this.state= {
          username: this.props.username,
        password:this.props.password,
        firstname: this.props.firstname,
        lastname: this.props.lastname,
        email: this.props.email,
        phone:this.props.phone,
        permission:this.props.permission,
        usernamex: this.props.username,
        passwordx:this.props.password,
        firstnamex: this.props.firstname,
        lastnamex: this.props.lastname,
        emailx: this.props.email,
        phonex:this.props.phone,
        permissionx:this.props.permission,
        views:false,
        exists:true,
        iduser: this.props.id,
        }

    }
    deletethis = async () => {
      try {
        const levelup : User = await deleteUser(this.state.iduser);
        this.setState({
          exists: false,      
        });
      
      } catch (error) {
        this.setState({
          exists: true,
        })
      }
    }

    view= (pw: any) => {
      this.setState({
        views:true,
      })
    }
    unview= (pw: any) => {
      this.setState({
        views: false,
      })
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
        firstname: pw.currentTarget.value,
      })
    }
    setLastname= (pw: any) => {
      this.setState({
        lastname: pw.currentTarget.value,
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
    setPermission = (pw: any) => {
      this.setState({
        permission: pw.currentTarget.value,
      })
    }

    attemptUpdate = async (event: any) => {
      event.preventDefault();
      console.log(event);
      try {
        const levelup : User = await updateSelf(this.props.id,this.state.usernamex,this.state.passwordx,this.state.firstnamex,
          this.state.lastnamex,this.state.emailx,this.state.phonex,this.state.permission);
        this.setState({
          views: false,  
          userinfo: levelup, 
          usernamex: this.state.username,
          passwordx:this.state.password,
          firstnamex: this.state.firstname,
          lastnamex: this.state.lastname,
          emailx: this.state.email,
          phonex:this.state.phone,
          permissionx:this.state.permission     
        });
        console.log(levelup);
      
      } catch (error) {
        this.setState({
          views: true,
        })
      }
    }
    render(){
        return(
            
            <>
           {this.state.exists && (<div className="rowss">
            <div>
            <span className="profile">{this.state.permissionx}</span>
            <span>{this.state.firstnamex + " " + this.state.lastnamex}</span>
            <span>{this.state.emailx}</span>
            <span className="id">{this.props.id}</span>
            </div>
            <div>
            { (this.state.permissionx === 3) &&<button onClick={this.deletethis}>Delete</button>}
            { !this.state.views &&<button onClick={this.view}>update information</button>}
            {this.state.views &&<button onClick={this.unview}>cancel</button>}
            </div>
            { this.state.views && <div>
            <Form onSubmit={this.attemptUpdate}>
                <p>Update {this.props.lastname}'s profile information</p>
        <span className="tag"> update </span>
            <FormGroup>
          <Input onChange={this.setUsername} value={this.state.username} type="text" name="username"
           id="set username" placeholder={"username:  "+ this.state.usernamex}
           />
           </FormGroup>
           <FormGroup>
           <Input onChange={this.setPassword} value={this.state.password} type="password" name="password"
           id="password" placeholder="password:  (*******)"
           />
           </FormGroup>
           <FormGroup>
           <Input onChange={this.setFirstname} value={this.state.firstname} type="text" name="firstname"
           id="firstname" placeholder={"firstname: "+ this.state.firstnamex}
           />
           </FormGroup>
           <FormGroup>
           <Input onChange={this.setLastname} value={this.state.lastname} type="text" name="lastname"
           id="lastname" placeholder={ "lastname:  "+this.state.lastnamex}
           />
           </FormGroup>
           <FormGroup>
           <Input onChange={this.setEmail} value={this.state.email} type="text" name="email"
           id="email" placeholder={"email: "+this.state.emailx}
           />
           </FormGroup>
           <FormGroup>
           <Input onChange={this.setPhone} value={this.state.phone} type="text" name="phone"
           id="phone" placeholder={"phone: " +this.state.phonex}
           /> 
          </FormGroup>
          <FormGroup>

          <select onChange={this.setPermission} id="permission" name="permission" required>
            <option value={this.state.permissionx} selected>selected</option>
          <option value="3">writer</option>
            <option value="2">editor</option>
            <option value="1">admin</option>
            </select>
            </FormGroup>
          <FormGroup className="notdiv">
            <Input type="submit" value="submit" />
          </FormGroup>
      </Form>
            </div>}
            </div>
           )}</>
        )
    }
}
