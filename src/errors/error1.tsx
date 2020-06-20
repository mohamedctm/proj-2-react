import React from 'react';

export class Err1 extends React.Component<any> {
    render(){
        const err = this.props.err;
        switch(err){
            case "Request failed with status code 402":
               return <h3>login required</h3>
            case "Request failed with status code 403":
            return  <h3>You are not authorized!</h3>
            case "Request failed with status code 401":
            return  <h3>Provide a numeric id only!</h3>
            case "Request failed with status code 400":
            return  <h3>Provide a numeric id only!</h3>
            case "Request failed with status code 404":
            return  <h3>Hit fetch</h3>
            case "Request failed with status code 405":
            return  <h3>0 reimbursements found</h3>
          default :
        return <h3>{err}</h3>
        }
    }
}

export class Err2 extends React.Component<any> {
    render(){
        const err = this.props.err;
        switch(err){
            case "Request failed with status code 402":
                return <h3>login required</h3>
             case "Request failed with status code 403":
                return  <h3>You are not authorized!</h3>
                case "Request failed with status code 400":
                return  <h3>Provide a numeric id only!</h3>
             default :
           return <h3>{err} </h3>
        }
    }
}
export class ErrS extends React.Component<any> {
    render(){
        const err = this.props.err;
        const data = this.props.data;
        switch(err){
            case "Request failed with status code 400":
               return <h3>Must include numeric value</h3>
            case "Request failed with status code 401":
               return  <h3>You are not authorized!</h3>
               case "Request failed with status code 405":
               return  <h3>No Reimbursement/s found</h3>
            default :
               return <h3>{JSON.stringify(data)}</h3>
        }
    }
}
