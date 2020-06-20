import { User } from "./User";
import { Inbox } from "./Inbox";

export class Message {
    messageId: number;
    sender: User;
    messageText: string;
    messageStatus: string;
    inbox: Inbox;
  
    constructor(messageId : number, sender : User, messageText : string, messageStatus : string, inbox : Inbox) {
      this.messageId = messageId;
      this.sender = sender;
      this.messageText = messageText;
      this.messageStatus = messageStatus;
      this.inbox = inbox;
    }
  }