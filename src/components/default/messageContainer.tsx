import React from 'react';

export default class Message extends React.Component<any,any> {
    
    constructor(props: any) {
        super(props);
        this.state = {
            starting:false
        }
    }

    expand = ()=>{
        this.setState({
            starting: true,
        })
    }
    shrink = ()=>{
        this.setState({
            starting: false,
        })
    }
  
    render(){
        return(
            <>
            { this.state.starting && <div className="messageContainer"></div> }
            <div className="messageControler">
            { !this.state.starting &&<button onClick={this.expand}>+</button>}
            { this.state.starting && <button onClick={this.shrink}>-</button>}
            <span className="messageNew"></span></div>
            </>
        )
    }
}