import React from 'react';

export default class Welcome extends React.Component<any> {
    
  
    render(){
        return(
            <>
            <div className="logoo"> 
                <span>
                    Hi {this.props.username},
                </span>
                <span className="farmost">
                    role: {this.props.role}
                </span> 
                </div>
            </>
        )
    }
}