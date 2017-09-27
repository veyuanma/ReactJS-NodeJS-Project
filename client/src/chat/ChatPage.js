import React from 'react';
import ReactDOM from 'react-dom';

import './ChatPage.css';
import socketIOClient from "socket.io-client";


class ChatPage extends React.Component {
	constructor(props) {
		super(props);
    this.state = {
      nickname: "",
      userCount: 0,
      messege: []
    };

    this.setUserCount = this.setUserCount.bind(this);
    this.setNewMessege = this.setNewMessege.bind(this);
		this.handleNicknameSubmit = this.handleNicknameSubmit.bind(this);
    this.handleMessgeSubmit = this.handleMessgeSubmit.bind(this);

    this.socket = socketIOClient('http://localhost:3000');

	}

  componentDidMount() {
    var that = this;
    this.socket.on('connect', function() {
      console.log("connected" + this.socket);
    });

    this.socket.on('loginSuccess', function() {
      console.log('login success');
    });

    this.socket.on('system', function(nickName, userCount, type) {
      var msg = nickName + (type == 'login' ? ' joined' : ' left');
      console.log("new msg is " + msg);
      that.setUserCount(userCount);
      that.setNewMessege(msg);
    });

    this.socket.on('newMessege', function(nickname, msg) {
      var time = new Date().toTimeString().substr(0, 8);
      var messege = nickname + " (" + time + "): " + msg;
      console.log("msg to display: " + messege);
      that.setNewMessege(messege); 
    });  
  }

  setUserCount(userCount) {
    this.setState({userCount: userCount}, () => {
      console.log("set user count func " + this.state.userCount);
    });

  }

  setNewMessege(msg) {
    var tmp = this.state.messege;
    tmp.push(msg);
    this.setState({ messege: tmp });
  }

  handleNicknameSubmit(name) {
    console.log("the name to submit: " + name);
    this.setState({nickname: name}, () => {
      console.log("state nickname is " + this.state.nickname);
    });
    this.socket.emit('login', name);
  }

  handleMessgeSubmit(msg) {
    console.log("the msg to send: " + msg);
    this.socket.emit('postMessege', msg);
  }
  
	render() {
		return(

		<div className="chatpage">
      
      <LoginForm onNicknameSubmit={this.handleNicknameSubmit}/>

      <div className="wrapper">
        <Banner count={this.state.userCount}/>
        <MessegeWindow messege={this.state.messege}/>
        <MessageBox onMessgeSubmit={this.handleMessgeSubmit}/>
          		
      </div>

		</div>
		);
	}
}

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const nickname = this.refs.nickname.value;
    console.log(nickname);
    this.props.onNicknameSubmit(nickname);
  }

  render() {
    return(
      <div>
        <form className="nameForm" onSubmit={this.handleSubmit}>
          <input type="text" ref="nickname" placeholder="Enter your nickname" />
          <button className="btn btn-info">Submit</button>
        </form>
      </div>
    );
  }
}

class Banner extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="banner">
        <h2>Chat Room</h2>
        <h3>{this.props.count} {this.props.count > 1 ? " users" : " user"} online</h3>
      </div>
    );
    
  }
}

class MessegeWindow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(">>>>>state messege is " + this.props.messege);
    const messeges = this.props.messege.map(function(e) {
      return <Messege content={e}/>
    });
    return(
      <div className="messegewindow">
        {messeges}
      </div>
    );
  }
}

class Messege extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="messege">
        <p className="messegehistory">{this.props.content}</p>
      </div>
    );
    
  }
}

class MessageBox extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const msg = this.refs.input.value;
    console.log("new msg to send " + msg);
    this.props.onMessgeSubmit(msg);
  }

  render() {
    return(
      <form className="controls" onSubmit={this.handleSubmit}>
        <input className="messegebox" type="text" ref="input" placeholder="Enter to send"/>
        <button className="btn btn-info sendBtn">Send</button>
      </form>
    );
  }
}


export default ChatPage;