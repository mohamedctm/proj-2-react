import axios from 'axios';
import { User } from '../models/User';

import { FailedLoginError } from '../errors/FailedLoginError';
import { Post } from '../models/Post';
import { Inbox } from '../models/Inbox';
import { Message } from '../models/Message';


const libraryClient = axios.create({
  // baseURL: 'http://54.174.125.219:3001/',
  baseURL: 'http://localhost:8081/',
  withCredentials: true,
});
/**************/
export async function posts(id:number) : Promise<Post[] | any> {
  const response = await libraryClient.get(`/posts/author/${id}`);
  console.log('All posts by author');
  return response.data;
}

export async function Allposts() : Promise<Post[] | any> {
  const response = await libraryClient.get(`/posts`);
  console.log('All posts');
  return response.data;
}

export async function Statusposts(s:string,id:number) : Promise<Post[] | any> {
  const response = await libraryClient.put(`/status/${s}/${id}`);
  console.log('change post status');
  return response.data;
}

export async function publish(id:number) : Promise<Post[] | any> {
  const response = await libraryClient.put(`/publish/${id}`);
  console.log('publish post');
  return response.data;
}

export async function unpublish(id:number) : Promise<Post[] | any> {
  const response = await libraryClient.put(`/unpublish/${id}`);
  console.log('Unpublish');
  return response.data;
}

export async function deletingPost(id:number) : Promise<Post[] | any> {
  const response = await libraryClient.delete(`/posts/${id}`);
  console.log('delete post');
  return response.data;
}

export async function getPostById(id:number) : Promise<User[] | any> {
  const response = await libraryClient.get(`/posts/${id}`);
  console.log('All posts');
  return response.data;
}

export async function myInfo(id:number) : Promise<User[] | any> {
  const response = await libraryClient.get(`/writers/${id}`);
  console.log('getting user information');
  // return response.data;
  const {writerid, username, password,firstname,lastname, email, phone, permission} = response.data;
    return new User(writerid, username, password, firstname,lastname, email, phone,permission);
}

export async function createPost(a:number,b:string,c:string,d:string,e:any,f:any,g:string,h:string,
  i:string,j:string,k:number,l:number) : Promise<Post[] | any> {
  const response = await libraryClient.post(`/posts`,
	{
    author:a,
postTitle:b,
	postDescription : c,
  postText : d,
  dateSubmitted:e,
  datePublished:f,
  postType:g,
	postField : h,
	keyWords : i,
		status : j,
	resolver : k,
	published : l});
  console.log('getting user information');
  return response.data;
}
export async function updatePost(id:number,a:number,b:string,c:string,d:string,e:any,f:any,g:string,h:string,
  i:string,j:string,k:number,l:number) : Promise<Post[] | any> {
  const response = await libraryClient.put(`/posts/${id}`,
	{
    postid: id,
    author:a,
postTitle:b,
	postDescription : c,
  postText : d,
  dateSubmitted:e,
  datePublished:f,
  postType:g,
	postField : h,
	keyWords : i,
		status : j,
	resolver : k,
	published : l});
  console.log('getting user information');
  return response.data;
}

export async function updateSelf(writerid:number,username:string,password:string,firsname:string,lastname:string,email:string,phone:string,permission:number) : Promise<Post[] | any> {
  const response = await libraryClient.put(`/writers/${writerid}`,
	{
    writerid: writerid,
    username:username,
password:password,
	firstname : firsname,
  lastname : lastname,
  email:email,
  phone:phone,
  permission:permission,
});
  console.log('updating self- information');
  return response.data;
}

export async function madeUser(username:string,password:string,firsname:string,lastname:string,email:string,phone:string,permission:number) : Promise<Post[] | any> {
  const response = await libraryClient.post(`/writers`,
	{
    
    username:username,
password:password,
	firstname : firsname,
  lastname : lastname,
  email:email,
  phone:phone,
  permission:permission,
});
  console.log('updating self- information');
  return response.data;
}
/**************/

export async function getAllUsers() : Promise<User[] | any> {
  const response = await libraryClient.get('/writers');
  console.log(response.data);
  return response.data;
}

export async function getOneUsers(id:number) : Promise<User[] | any> {
  const response = await libraryClient.get(`/writers/${id}`);
  console.log(response.data);
  return response.data;
}
export async function deleteUser(id:number) : Promise<User[] | any> {
  const response = await libraryClient.delete(`/writers/${id}`);
  console.log(response.data);
  return "user deleted!";
}

export async function destroy() : Promise<any> {
  const response = await libraryClient.get('/logout');
  // return response.data;
  console.log(response.data);
}








export async function updatexx(a:any,b:any,c:any,d:any,e:any,f:any, g:number) : Promise<User[] | any> {

  const response = await libraryClient.patch(`/users`,{username:!!(a)?a:null,password:!!(b)?b:null,firstname:!!(c)?c:null,lastname:!!(d)?d:null,email:!!(e)?e:null,roleId:!!(f)?f:null, userId:g});
  return response.data;
}




export async function getSingle(id:number) : Promise<User[] | any> {
  const response = await libraryClient.get(`/users/${id}`);
  console.log(response.data);
  return response.data;
}

export async function login(un: string, pw: string): Promise<User> {
  try {
    const response = await libraryClient.post('/login', {username: un, password: pw});
    const {writerid, username, password,firstname,lastname, email, phone, permission} = response.data;
    return new User(writerid, username, password, firstname,lastname, email, phone,permission);
  } catch (e) {
    if(e.response.status === 401 ||e.response.status === 400 ||e.response.status === 500) {
      throw new FailedLoginError('Failed to authenticate', un);
    } else {
      // We could throw a different custom error, this exposes a little too much to the user.
      throw e.message;
    }
  }
  
}

/* Inbox controller requests */

export async function openInbox(inboxNum : number) : Promise<Inbox> {
  const response = await libraryClient.get(`/inboxes/owner/${inboxNum}`);
  const {id, messages, owner} = response.data;
  const myInbox : Inbox = new Inbox(id, owner, messages);
  console.log(myInbox);
  return myInbox;
}

export async function getAllInboxes() : Promise<Inbox[]> {
  const response = await libraryClient.get('/inboxes/all');
  const boxesArr : Inbox[] = response.data.map((box : any) => {
    const {id, messages, owner} = box;
    return new Inbox(id, owner, messages);
  });
  console.log("boxesArr", boxesArr);
  return boxesArr;
  
}

/* Should be implemented when new user is created */
export async function addInbox(userId : number) : Promise<Inbox> {
  const configObj = {id: 0, ownerId: userId}
  const response = await libraryClient.post('/inboxes/new', configObj)
  const newInbox : Inbox = new Inbox(response.data.id, response.data.owner, response.data.messages);
  return newInbox;
  
}

/* Message Controller requests */
export async function addNewMessage(userId : number, msgText : string, recipientId : number) : Promise<Message> {
  const configObj = {senderId: userId, messageText: msgText, messageStatus: "unread", inboxId: recipientId};
  const response = await libraryClient.post('/messages/new', configObj);
  const {
    id,
    sender,
    messageText,
    messageStatus,
    inbox
  } = response.data;
  return new Message(id, sender, messageText, messageStatus, inbox);
}

export async function readMessage(msgId : number) : Promise<Message> {
  const response = await libraryClient.patch(`/messages/${msgId}`);
  const {
    id,
    sender,
    messageText,
    messageStatus,
    inbox
  } = response.data;
  return new Message(id, sender, messageText, messageStatus, inbox);
}