import React from 'react';
import { Inbox } from '../../models/Inbox';
import { openInbox, readMessage } from '../../api/LibraryClient';
import { Message } from '../../models/Message';
import { NavLink } from 'react-router-dom';

export class SingleMessage extends React.Component<any, any> {

    constructor(props : any) {
        super(props);
        this.state = {
            msg: null
        }
    }

    async componentDidMount() {
        const myInbox : Inbox = await openInbox(this.props.reader.writerid);
        const myMessage : any = myInbox.messages.filter((m : any) => {
            return m.id == this.props.match.params.msgId;
        })[0];
        console.log("myMessage is", myMessage);
        readMessage(myMessage.id);
        this.setState({
            msg: myMessage
        });
    }

    render() {
        console.log("SingleMessage state: ", this.state);
        console.log("SingleMessage props: ", this.props);
        
        return(
            <div className="wrap">
                <div className="usercontainer">
                    <div className="rowss">
                        <div>
                            <label className="plus"><NavLink to="/inbox/compose">+</NavLink></label>
                        </div>
                    </div>
                    <div className="rowss">
                        <div id="purple-post">
                            <span className="profile"><NavLink to="/inbox">Back</NavLink></span>
                            <h3>{this.state.msg ? this.state.msg.sender.firstname.toUpperCase() + ' ' + this.state.msg.sender.lastname.toUpperCase() : null}</h3>
                        </div>
                        <div>
                            <h4>{this.state.msg ? this.state.msg.messageText : null}</h4>
                        </div>
                    </div>
                </div>
            </div>
            
        );
    }
}