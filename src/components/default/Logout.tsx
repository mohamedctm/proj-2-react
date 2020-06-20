import React from 'react';
import { User } from '../../models/User';
import { destroy } from '../../api/LibraryClient';
// import { Route, Redirect, Switch} from 'react-router'


interface ILoginComponentProps {
  updateUser: (user:User) => void;
  // emptyMembers: (user:User) =>void;
}


export class Logout extends React.Component<ILoginComponentProps> {

  logout = async (event: any) =>  {
    event.preventDefault();
    try {
      const loggedInUser : any = null;
      // const members : any = null;
      this.props.updateUser(loggedInUser); 
      await destroy(); 
      // this.props.emptyMembers(members) 
      // const notLogedIn = true;
      // window.location.replace('/hello');
      console.log(loggedInUser);
      // return(<Switch><Route><Redirect to="/hello" /></Route></Switch>);
    } catch (error) {
      console.log('not logged In')
    }
  }

  render() {
    return (
      <div>
      <form onSubmit={this.logout}>
          <span>Are you sure, you wanna leave</span>
          <div className="notdiv">
            <input type="submit" value="YES" />
          </div>
      </form>
      </div>
    );
  }

}