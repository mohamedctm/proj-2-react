import React from 'react';
import { getAllUsers } from '../api/LibraryClient';
import { Writerview } from './views/viewWriter';
import { User } from '../models/User';
import { NavLink } from 'react-router-dom';

export default class Control extends React.Component<any,any> {

constructor(props:any){
    super(props);
    this.handler = this.handler.bind(this);
    this.state = {
        data:[],
        
    }
}

componentDidMount(){
    this.handler();
}
async handler() {
    try {
        this.setState({
            data: await getAllUsers(),
            // userinfo: await myInfo(this.props.writerid),
            isError: false,
        })
      } catch (e) {

        this.setState({
          isError: true,
          errorMessage: e.message,
        })
    }   
}

    render(){
        return(
            <>
            <div className="usercontainer">
                <div className="rowss">
                   <div> <label className="plus"><NavLink to="/register">+</NavLink></label></div>
                    </div>
            {this.state.data.filter((c: { writerid: number; }) => c.writerid !== this.props.writerid).map((u:User|any,x:number) =>{
                return(
                    <Writerview action={this.handler} key={x} thekey={x} id={u.writerid} username={u.username} password={u.password}
                    firstname={u.firstname} lastname={u.lastname} email={u.email} phone={u.phone} permission={u.permission}/>
                    )      
                    })         
        }  </div>   
            </>
            
        )
    }
}