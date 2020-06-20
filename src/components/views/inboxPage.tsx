import React from 'react';
import { openInbox } from '../../api/LibraryClient';

export class InboxPage extends React.Component<any, any> {

    // constructor(props : any) {
    //     super(props);
    // }

    componentDidMount() {
        openInbox(7);
    }

    render() {
        return (
            <div className="wrap">
                <div className="usercontainer">
                    <h1>Hello</h1>
                </div>
            </div>
        );
    }
}