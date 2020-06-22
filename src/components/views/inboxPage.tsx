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
    intervalId : any;
    currentCount: any;
}

export class InboxPage extends React.Component<IInboxPageProps, IInboxPageState> {

    constructor(props : IInboxPageProps) {
        super(props);
        this.state = {
            messages: [],
            intervalId: null,
            currentCount: 60
        }
    }

    async componentDidMount() {
        const myInbox : Inbox = await openInbox(this.props.owner.writerid);
        const sortedMessages = myInbox.messages.sort((a : any, b : any) => b.id - a.id);
        let intervalId = setInterval(this.timer, 5000)
        this.setState({
            messages: sortedMessages,
            intervalId: intervalId
        });
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    }

    timer = () => {
        openInbox(this.props.owner.writerid)
            .then((myInbox) => {
                return myInbox.messages.sort((a : any, b : any) => b.id - a.id);
            })
            .then((sortedMessages) => {
                this.setState({
                    messages: sortedMessages,
                    currentCount: this.state.currentCount - 5
                });
            })

        // this.setState({ currentCount: this.state.currentCount -2 });
    }

    generateMessageCards = (msgs : any) : any => {
        return msgs.map((msg : any) => {
            return <MessageCard key={msg.id} message={msg}/>
        });
    }

    render() {
        const inboxMessages = this.generateMessageCards(this.state.messages);
        return (
            <div className="wrap">
                <div className="usercontainer">
                    <div className="rowss">
                        <div>
                            {/* <span className="profile">{this.state.currentCount}</span> */}
                            <label className="plus"><NavLink to="/inbox/compose">+</NavLink></label>
                        </div>
                    </div>
                    {inboxMessages}
                </div>
            </div>
        );
    }
}