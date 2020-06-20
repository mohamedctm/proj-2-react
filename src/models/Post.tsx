export class Post {
    postId: number; 
    author: number;
    postTitle: string;
    postDescription: string;
    postText:string;
      dateSubmitted: number;
      datePublished: number; 
      postType: string; 
      postField: string;
      keyWords: string;
      resolver: number; // will later change to role type...
      status: string;
      published: number;
  
  
  
  
      constructor(postId:number, author:number, postTitle:string,postDescription:string,postText:string, dateSubmitted: number, datePublished:number, postType: string,postField:string,keyWords:string, resolver: number, status:string, published:number) {
        this.postId = postId;
        this.author = author;
        this.postTitle = postTitle;
        this.postDescription = postDescription;
        this.postText = postText;
        this.dateSubmitted = dateSubmitted;
        this.datePublished = datePublished;
        this.postType = postType;
        this.postField = postField;
        this.keyWords = keyWords;
        this.resolver = resolver;
        this.status = status;
        this.published = published;
      }
    }