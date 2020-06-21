import React from 'react';
import { Message } from '../../models/Message';

interface IMessageCardProps {
    message : Message;
}

export class MessageCard extends React.Component<IMessageCardProps, any> {

    render() {
        return (
            <div className="rowss">
                <div>
                    <span className="profile">Reply</span>
                    <span>{this.props.message.sender.firstname + ' ' + this.props.message.sender.lastname}</span>
                    <span>{this.props.message.sender.username}</span>
                    <span className="id">{this.props.message.messageStatus}</span>
                </div>
                <div>{this.props.message.messageText}</div>
            </div>
        );
    }
}