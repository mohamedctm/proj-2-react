import { User } from "./User";
import { Message } from "./Message";

export class Inbox {
    inboxId: number;
    owner: User;
    messages: Message[];
  
    constructor(inboxId : number, owner : User, messages : Message[]) {
      this.inboxId = inboxId;
      this.owner = owner;
      this.messages = messages;
    }
  }