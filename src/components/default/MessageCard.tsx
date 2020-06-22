import React from 'react';
import { Message } from '../../models/Message';
import { NavLink } from 'react-router-dom';

interface IMessageCardProps {
    message : Message | any;
}

export class MessageCard extends React.Component<IMessageCardProps, any> {
    
    render() {
        const msgTitle : string = this.props.message.messageText.slice(0,22);
        const readStatus = this.props.message.messageStatus === "read" ? true : false;
        return (
            <div className="rowss">
                <div>
                    <span className="profile" style={readStatus ? { background: 'rgb(190, 190, 190)'} : {color: "#fff"}}><NavLink to={`/inbox/message/${this.props.message.id}`}>View</NavLink></span>
                    <span style={readStatus ? { color: '#999'} : {color: "black"}}><b>{this.props.message.sender.username.toUpperCase()}</b></span>
                    <span style={readStatus ? { color: '#999'} : {color: "black"}}>{msgTitle + '...'}</span>
                    <span className={`id ${this.props.message.messageStatus === "read" ? "read-mess" : "unread"}`}>........</span>
                </div>
            </div>
        );
    }
}