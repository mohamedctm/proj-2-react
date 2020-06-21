import React from 'react';
import { openInbox } from '../../api/LibraryClient';
import { User } from '../../models/User';
import { Message } from '../../models/Message';
import { Inbox } from '../../models/Inbox';
import { ListGroup, ListGroupItem} from 'reactstrap';
import { MessageCard } from '../default/MessageCard';
import { NavLink } from 'react-router-dom';

interface IInboxPageProps {
    owner : User;
}

interface IInboxPageState {
    messages : Message[];
}

export class InboxPage extends React.Component<IInboxPageProps, IInboxPageState> {

    constructor(props : IInboxPageProps) {
        super(props);
        this.state = {
            messages: []
        }
    }

    async componentDidMount() {
        const myInbox : Inbox = await openInbox(this.props.owner.writerid);
        this.setState({
            messages: myInbox.messages
        });
    }

    generateMessageCards = (msgs : Message[]) : any => {
        return msgs.map((msg : Message) => {
            return <MessageCard key={msg.messageId} message={msg}/>
        });
    }

    render() {
        const inboxMessages = this.generateMessageCards(this.state.messages);
        return (
            <div className="wrap">
                <div className="usercontainer">
                    <div className="rowss">
                        <div>
                            <label className="plus"><NavLink to="/inbox/compose">+</NavLink></label>
                        </div>
                    </div>
                    {inboxMessages}
                </div>
            </div>
        );
    }
}