import React from 'react';
import {Switch, Route, Redirect} from 'react-router';
import { destroy } from '../../api/LibraryClient';
import {User} from '../../models/User';

interface ILoginComponentProps {
    updateUser: (user:User) => void;
    // emptyMembers: (user:User) =>void;
  }

export default class NoMatch extends React.Component<ILoginComponentProps,any> {

    componentDidMount(){
        const loggedInUser : any = null;
      this.props.updateUser(loggedInUser); 
      destroy();
    }

    render(){
        return(
            
            <>
            <Switch>
        <Route>
        <Redirect to="/hello"/>
        </Route>
      </Switch>
            </>
        )
    }
}