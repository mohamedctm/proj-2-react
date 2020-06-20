import axios from 'axios';
import { User } from '../models/User';

import { FailedLoginError } from '../errors/FailedLoginError';
import { Post } from '../models/Post';


const libraryClient = axios.create({
  // baseURL: 'http://54.174.125.219:3001/',
  baseURL: 'http://localhost:5000/',
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
    if(e.response.status === 401 ||e.response.status === 400) {
      throw new FailedLoginError('Failed to authenticate', un);
    } else {
      // We could throw a different custom error, this exposes a little too much to the user.
      throw e;
    }
  }
  
}
