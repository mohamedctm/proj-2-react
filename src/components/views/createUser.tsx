import React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { Form, FormGroup, Input } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { User } from '../../models/User';
import { madeUser } from '../../api/LibraryClient';



export class NewUser extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
        sucsess:false,
        username:'',
        password: '',
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        permission:3,
    }
  }

  setUsername= (pw: any) => {
    this.setState({
      username: pw.currentTarget.value,
    })
  }
  setPassword = (pw: any) => {
    this.setState({
        password: pw.currentTarget.value,
    })
  }
  setType= (pw: any) => {
    this.setState({
      type: pw.currentTarget.value,
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
  setPhone= (pw: any) => {
    this.setState({
      phone: pw.currentTarget.value,
    })
  }
  setPermission= (pw: any) => {
    this.setState({
      permission: pw.currentTarget.value,
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
      const levelup : User = await madeUser(this.state.username,this.state.password,this.state.firstname,this.state.lastname,this.state.email,
        this.state.phone,this.state.permission);
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
     <NavLink to="/control"><button>Back to control</button></NavLink>
      <Form onSubmit={this.attemptUpdate}>
      {<h3>{this.state.errorMessage}</h3>}
        <span className="tag"> Register</span>
            <FormGroup>
          <Input onChange={this.setUsername} value={this.state.username} type="text" name="username"
           id="username" placeholder="set username"
           required/>
           </FormGroup>
           <FormGroup>
           <Input onChange={this.setPassword} value={this.state.password} type="text" name="password"
           id="password" placeholder="set password"
           required/>
           </FormGroup>
           <FormGroup>
           <Input onChange={this.setFirstname} value={this.state.keys} type="text" name="firstname"
           id="firstname" placeholder="set firstname"
           required/>
           </FormGroup>
           <FormGroup>
           <Input onChange={this.setLastname} value={this.state.keys} type="text" name="lastname"
           id="lastname" placeholder="set lastname" required/>
           </FormGroup>
           <FormGroup>
           <Input onChange={this.setEmail} value={this.state.keys} type="email" name="email"
           id="email" placeholder="set email"
           required/>
           </FormGroup>
           <FormGroup>
           <Input onChange={this.setPhone} value={this.state.phone} type="tel" name="phone"
           id="phone" placeholder="set phone"
           required/>
           </FormGroup>
            <FormGroup>
            <select onChange={this.setPermission} name="filed" required>
            <option value="3">writer</option>
            <option value="2">editor</option>
            <option value="1">admin</option>
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
        <Redirect to="/control"/>
        </Route>
      </Switch>
    </>
     ) 
    }
  }

}