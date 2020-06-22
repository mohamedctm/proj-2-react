import React from 'react';
import { NavLink, Switch, Route, Redirect } from 'react-router-dom';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { Inbox } from '../../models/Inbox';
import { getAllInboxes, addNewMessage } from '../../api/LibraryClient';
import { User } from '../../models/User';

interface IComposeMessageProps {
    composer : User;
}

interface IComposeMessageState {
    inboxes : Inbox[];
    recipientInboxId : number;
    msgText : string;
    success : boolean;
}

export class ComposeMessage extends React.Component<IComposeMessageProps, IComposeMessageState> {

    constructor(props : IComposeMessageProps) {
        super(props);
        this.state = {
            inboxes: [],
            recipientInboxId: 0,
            msgText: "",
            success: false
        }
    }

    async componentDidMount() {
        const allBoxes = await getAllInboxes();
        this.setState({ inboxes: allBoxes });
    }

    generateRecipients = (boxes : Inbox[]) : any => {
        return boxes.map((box : Inbox) => {
            return <option value={box.inboxId}>{box.owner.username}</option>
        });
    }

    handleChange = (ev : any) => {
        if (ev.currentTarget.name === "inbox") {
            this.setState({recipientInboxId: ev.currentTarget.value});
        } else if (ev.currentTarget.name === "messageText") {
            this.setState({msgText: ev.currentTarget.value});
        }
    }

    handleSubmit = async (ev : any) => {
        ev.preventDefault();
        try {
            const newMsg = await addNewMessage(this.props.composer.writerid, this.state.msgText, this.state.recipientInboxId);
            console.log("New message sent", newMsg);
        } catch (error) {
            console.log(`Failed to create new message: ${error.message}`);
        } finally {
            this.setState({
                recipientInboxId: 0,
                msgText: "",
                success: true
            });
        }
    }

    render() {
        if (!this.state.success) {
            return (
                <div>
                    <NavLink to="/inbox"><button>Cancel</button></NavLink>
                    <Form onSubmit={this.handleSubmit}>
                        <h3></h3>
                        <span className="tag">New</span>
                        <FormGroup>
                            <Label for="inbox">Recipient</Label>
                            <select name="inbox" onChange={this.handleChange} value={this.state.recipientInboxId} required>
                                <option>(Select)</option>
                                {this.generateRecipients(this.state.inboxes)}
                            </select>
                        </FormGroup>
                        <FormGroup>
                            <Input type="textarea" name="messageText" placeholder="write your message here" onChange={this.handleChange} value={this.state.msgText}/>
                        </FormGroup>
                        <FormGroup className="notdiv">
                            <Input type="submit" value="Send" />
                        </FormGroup>
                    </Form>
                </div>
            );
        } else {
            return (
                <Switch>
                    <Route>
                        <Redirect to="/inbox" />
                    </Route>
                </Switch>
            );
        }
    }
}