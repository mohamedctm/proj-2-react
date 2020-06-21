import React from 'react';
import { getPostById, updatePost, deletingPost, addNewMessage } from '../../api/LibraryClient';
import { FormGroup, Input, Form, Label } from 'reactstrap';
import { Post } from '../../models/Post';



export  class Messageview extends React.Component<any,any> {
    constructor(props:any){
        super(props);
        this.state= {
        message: this.props.messages,
        recieverBoxId: this.props.recieverBoxId,
        sender:this.props.sender,
        messageText: this.props.messageText,
        messageStatus: this.props.messageStatus,
        openReplay: false,
        msgText: '',
        myid: this.props.myId,
        placeholder: 'message here',
        }

    }


  handleSubmit = async (event: any) => {
    event.preventDefault();
    console.log(event); 
    if(this.state.msgText !== ""){
    try {
      const newMsg = await addNewMessage(this.props.myId, this.state.msgText, this.state.sender.writerid);
      this.setState({
        msgText: '',
        openReplay: false,

      });
      this.props.action()
    
    } catch (error) {
      this.setState({
        openReplay: true,
      })
    }
  }else{
    this.setState({
      messageholder: "please type something",
      msgText: '',
  });
  }
  }
  replayon = () =>{
    this.setState({
        openReplay: true,
        msgText: '',
    });

}
replayoff = () =>{
  this.setState({
      openReplay: false,
      msgText: '',
  });

}
setText= (pw: any) => {
  this.setState({
    msgText: pw.currentTarget.value,
  })
}
  
    render(){
        return(
            <>
            
            { !this.state.openReplay && <div className="chatBox">
              <div>
                <span className="statuss" onClick={this.replayon}> conversation between you and {this.state.sender.lastname} <span className="b">&#8250;</span></span>
              </div> </div>}
              { this.state.openReplay && 
                <div className="chatBox"> <div>
                  <button onClick={this.replayoff}><span className="b">&#8249;</span></button>
                <span className="statuss">{this.state.sender.writerid}</span>
                
              </div>
              <p><span className="blue">{this.state.sender.username} :</span><br/>{this.state.messageText}</p>
             
             <p> 
                    <form onSubmit={this.handleSubmit}>
            <textarea name="text" onChange={this.setText} value={this.state.text} placeholder={this.state.placeholder}/>
            <input type="submit" value="&#187;" />
                </form></p>
           </div>
           }
            </>
        )
    }
}
