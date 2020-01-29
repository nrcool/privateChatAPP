import React ,{Component} from 'react';
import './App.css';
import socketio from "socket.io-client"

class App extends Component{
  constructor(){
    super()
    this.socket= socketio("http://localhost:4000")
    this.socket.on("pmsj",data=>{
      console.log(data.msj)
    })
    this.state={
      input:"",
      username:"",
      puser:"",
      msj:""
    }
  }
  sendPrivatemsj=()=>{
     this.socket.emit("pmsj",{user:this.state.puser,msj:this.state.msj})
  }
senduser=()=>{
  this.setState({username:this.state.input},()=>{
     this.socket.emit("initial",{username:this.state.username})
     this.setState({username:""})
    this.refs.inp.disabled=true
   
  })
 
}
  componentDidMount(){
   
  }

render(){
  return (
    <div className="App">
      <h1>SOCKET APP</h1>
      <input ref="inp" type="text" value={this.state.input} onChange={(e)=>this.setState({input:e.target.value})}/><br/>
      <button onClick={this.senduser}>Enter username</button><br/>
      <label>To user</label>
      <input type="text" value={this.state.puser} onChange={(e)=>this.setState({puser:e.target.value})}/><br/>
      <label>your message</label>
      <input type="text" value={this.state.msj} onChange={(e)=>this.setState({msj:e.target.value})}/><br/>
      <button onClick={this.sendPrivatemsj}>send msj</button>
  </div>
  );
}
}

export default App;
