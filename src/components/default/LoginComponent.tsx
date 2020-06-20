import React from 'react';
import { User } from '../../models/User';
import { login } from '../../api/LibraryClient';
import { Route, Switch, Redirect} from 'react-router';


//the updateUser prop takes a function that takes a user and returns voide
// it will match updateUser in App.
interface ILoginComponentProps {
  updateUser: (user:User) => void;
}

interface ILoginComponentState {
  username: string;
  password: string;
  isError: boolean;
  errorMessage: string;
  success:boolean;
}

export class LoginComponent extends React.Component<ILoginComponentProps, ILoginComponentState> {

  constructor(props: ILoginComponentProps) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isError: false,
      errorMessage: '',
      success:false
    }
  }

  //We'll need a few functions to modify individual pieces of our state
  // These take change events
  setUsername = (un: any) => {
    this.setState({
      username: un.currentTarget.value,
    })
  }

  setPassword = (pw: any) => {
    this.setState({
      password: pw.currentTarget.value,
    })
  }

  clearError = () => {
    this.setState({
      errorMessage: '',
      isError: false,
      success: false
    })
  }

  attemptLogin = async (event: any) => {
    event.preventDefault();
    console.log(event);
    try {
      const loggedInUser : User = await login(this.state.username,this.state.password);
      this.props.updateUser(loggedInUser);
      this.setState({
        username: '',
        password: '',
        success: true
      });
      console.log(loggedInUser);
    
    } catch (error) {
      this.setState({
        password: '',
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
      <form onSubmit={this.attemptLogin}>
      <span className="tag"> Login</span>
        <div>
          <label>Username</label>
          <input onChange={this.setUsername} value={this.state.username} type="text" name="username"
           id="username" placeholder="your username"
           autoComplete={this.state.username} required/>
          </div>
          <div>
          <label>Password</label>
            <input onChange={this.setPassword} value={this.state.password} type="password" name="password" id="password" 
            placeholder="password" autoComplete={this.state.password} required />
          </div>
          <div className="notdiv">
            <input type="submit" value="submit" />
          </div>
      </form>
     { this.state.isError && <h3>{this.state.errorMessage}</h3>}
      </div>
    );
    }
    else{ return (
      <>
    <h3>you've logged in successfuly</h3>
    <Switch>
      <Route>
      <Redirect to="/hello"/>
      </Route>
    </Switch>
    </>
     ) 
    }
  }

}