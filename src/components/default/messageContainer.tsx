import React from 'react';
import { InboxPage } from '../views/inboxPage';
import { openInbox } from '../../api/LibraryClient';
import { Messageview } from '../views/viewMessage';

export default class Message extends React.Component<any,any> {
    
    constructor(props: any) {
        super(props);
        this.handler = this.handler.bind(this);
        this.state = {
            // starting:false
            messages:'',
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
    componentDidMount(){
        this.handler();
    }
    async handler() {
        try {
            this.setState({
                messages: await openInbox(this.props.writer.writerid),
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
            { this.state.starting && <div className="messageContainer">
            {(this.state.messages.messages.
            filter((c:any) => c.id !== 8)
            .map((u:any,x:number) =>{
                return(
                    <Messageview key={x} action={this.handler} myId={this.props.writer.writerid} recieverBoxId={u.id} sender={u.sender} messageText={u.messageText} messageStatus={u.messageStatus}/>
                    )      
                    })         
        )}
            </div> }
            <div className="messageControler">
            { !this.state.starting &&<button onClick={this.expand}>+</button>}
            { this.state.starting && <button onClick={this.shrink}>-</button>}
            <span className="messageNew"></span></div>
            </>
        )
    }
}