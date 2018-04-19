import React, {Component} from 'react';
import Chatbar from './Chatbar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';
import NavBar from './NavBar.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: {name: 'Anonymous'}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      userCount: 0
    }
    this.addMessage = this.addMessage.bind(this);
    this.changeUsername = this.changeUsername.bind(this);
}


componentDidMount() {
  console.log("componentDidMount <App />");
  this.socket = new WebSocket("ws://localhost:3001");
  this.socket.onmessage = (msg) => {
  const newText = JSON.parse(msg.data);
  const stateMessages = this.state.messages;
  const newMessages = [...stateMessages, {
    id: newText.id,
    type: newText.type,
    username: newText.username,
    content: newText.content }]

    switch(newText.type) {
      case 'incomingMessage':
      case 'incomingNotification':
        this.setState({messages: newMessages})
        break;
      case "incomingUserCount":
        this.setState({userCount: newText.userCount});
        break;
      default:
        throw new Error("Unknown event type ", newText.type);
      }
  }
    console.log('Connected to Server');

    setTimeout(() => {
      console.log("Simulating incoming message");
        const newMessage = {id: 3, username: "Space Invader", content: "PEW PEW PEW!", type: "incomingMessage"};
        const messages = this.state.messages.concat(newMessage);
        this.setState({messages: messages})
    }, 1000);
  }

  addMessage(msg, username) {
      const msg = {
        type: 'postMessage',
        content: msg,
        username: username,
      }
    this.socket.send(JSON.stringify(msg));
  }

  changeUsername(username) {
    const oldUser = (this.state.currentUser.name);
    const newUser = username;
    if (newUser !== oldUser) {
      let notification = {
        type: 'postNotification',
        content: `**User: ${oldUser}** changed their username to **User: ${newUser}**`
      }
      this.socket.send(JSON.stringify(notification));
    }

    this.setState({currentUser: ({name: username})});
  }

render() {
    console.log("Rendering <App/>");
    return (
    <div>
    <NavBar userCount = {this.state.userCount} />
    <Message />
    <MessageList messages = {this.state.messages} />
    <Chatbar username = {this.state.currentUser.name} onMessageSubmit = {this.addMessage} onUsernameChange = {this.changeUsername}/>
    </div>
    );
  }
}

export default App;
