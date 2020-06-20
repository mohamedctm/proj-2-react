export class User {
  writerid: number;
  username: string;
  password: string;
  firstname: string;
  lastname:string;
  email: string;
  phone: string;
  permission: number;

  constructor(writerid:number, username:string, password:string, firstname:string, lastname:string, email:string, phone:string,permission:number) {
    this.writerid = writerid;
    this.username = username;
    this.password = password;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.phone = phone;
    this.permission = permission;
    
  }
}