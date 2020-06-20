import React from 'react';
import { NavLink } from 'react-router-dom';


export class NavbarComponent extends React.Component<any,any> {



  render() {

    return (
      
    <>
        <ul>     
          <li><NavLink to="/hello" >Home</NavLink></li>
          { this.props.User && <li><NavLink to="/posts"> Posts</NavLink></li>}
          { (this.props.role === 2) && <li><NavLink to="/editor"> Editor</NavLink></li>}
          { (this.props.role === 1) && <li><NavLink to="/control"> Control</NavLink></li>}
          <li className="last">&nbsp;</li>
          { !this.props.User && <li><NavLink to="/login">Login</NavLink></li>}          
          { this.props.User && <li><NavLink to="/logout">Logout</NavLink></li>}
        </ul>
    </>
    )
    }
}