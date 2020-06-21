import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { NavbarComponent } from './components/NavbarComponent';
import { User } from './models/User';
import { LoginComponent } from './components/default/LoginComponent';
import Welcome from './components/default/Welcome';
import {Logout} from './components/default/Logout';
import Home from './components/default/Home';
import NoMatch from './components/default/NoMatch';
import Posts from './components/pComponent';
import Editor from './components/eComponent';
import Control from './components/cComponent';
import { NewPost } from './components/views/createPost';
import { NewUser } from './components/views/createUser';
import { InboxPage } from './components/views/inboxPage';
import { ComposeMessage } from './components/views/ComposeMessage';
import Message from './components/default/messageContainer';




interface IAppState {
  loggedInUser: User | null;
  id:number|any;
  // members: User | null;
}

export class App extends React.Component<any, IAppState> {

  constructor(props: any) {
    super(props);
    this.state = {
      loggedInUser: null,
      id: '',
      // members :null,
    }
  }

  updateUser = (user:User) => {
    this.setState({
      loggedInUser: user,
    })
    const cooid = this.state.loggedInUser?.writerid;
    this.setState({
      id: cooid,
    })
  }

  // emptyMembers = (m:any) => {
  //   this.setState({
  //     members: null,
  //   })
  // }

  removeUser = (u: any) => {
    this.setState({
      loggedInUser: null,
    })
  }

  render() {
    const G = this.state.loggedInUser;
    return (
    <>
    <Router>
      <div className="fixed">
    <Welcome role={G?.permission || 'visitor'} username={G?.firstname || 'Guest'}/>
    <NavbarComponent User = {this.state.loggedInUser} role={G?.permission}/>
     </div>
     <div className="wrap">
      <Switch>
      <Route path="/hello" exact>
          <Home />
        </Route>
        {G && <Route path="/create" exact>
          <NewPost id={G?.writerid} />
        </Route>}
        {G && <Route path="/register" exact>
          <NewUser id={G?.writerid} />
        </Route>}
        <Route path="/" exact>
          <Home />
        </Route>  
        {  <Route exact path="/login">
          <LoginComponent  updateUser={this.updateUser} />
        </Route>}
        { G && <Route exact path="/logout">
          <Logout updateUser={this.removeUser}/>
        </Route>}
        { G &&  <Route path='/posts' exact >
          <Posts userRole={G.permission} id={this.state.id} writerid={G?.writerid}  />
          </Route>}
        { (G?.permission === 2) &&  <Route path='/editor' exact >
          <Editor userRole={G.permission} id={this.state.id} writerid={G?.writerid}   />
          </Route>}
      { (G?.permission === 1) && <Route path='/control'  exact >
        <Control userRole={G.permission} id={this.state.id} writerid={G?.writerid} />
        </Route>}
        {G && <Route exact path="/inbox">
          <InboxPage owner={G} />
          </Route>}
        {G && <Route exact path="/inbox/compose">
          <ComposeMessage composer={G}/>
          </Route>}
        <Route><NoMatch updateUser={this.updateUser} /></Route>
      </Switch>
      </div>
      
      {  <Message writerid={G?.writerid}/>}
    </Router>
    </>
    );
  }

}