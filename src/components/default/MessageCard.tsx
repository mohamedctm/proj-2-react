import React from 'react';
import { Message } from '../../models/Message';
import { NavLink } from 'react-router-dom';

interface IMessageCardProps {
    message : Message;
}

export class MessageCard extends React.Component<IMessageCardProps, any> {

    render() {
        return (
            <div className="rowss">
                <div>
                    <span className="profile"><NavLink to="/inbox/compose">Reply</NavLink></span>
                    <span>{this.props.message.sender.firstname + ' ' + this.props.message.sender.lastname}</span>
                    <span><b>{this.props.message.sender.username}</b></span>
                    <span className="id">{this.props.message.messageStatus}</span>
                </div>
                <div>{this.props.message.messageText}</div>
            </div>
        );
    }
}