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
      userCount: 0,
      userColour: '',
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
    content: newText.content,
    colour: newText.colour,
    image: newText.image,
     }]

    switch(newText.type) {
      case 'incomingMessage':
      case 'incomingNotification':
        this.setState({messages: newMessages})
        break;
      case "incomingUserCount":
        this.setState({userCount: newText.userCount});
        break;
      case "colourMessage":
        this.setState({userColour: newText.colour});
        console.log('current state', this.state);
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

  addMessage(message, username) {
    let url = message.match(/(http)?s?:?(\/\/[^“’]*\.(?:png|jpg|jpeg|gif|png|svg))/g);
    message = message.split(url);
      var msg = {
        type: 'postMessage',
        content: message,
        username: username,
        colour: this.state.userColour,
        image: url,
      }
    this.socket.send(JSON.stringify(msg));
  }

  changeUsername(username) {
    const oldUser = (this.state.currentUser.name);
    const newUser = username;
    if (newUser !== oldUser) {
      let notification = {
        type: 'postNotification',
        content: `**User: ${oldUser}** changed their username to **User: ${newUser}**`,
      }
      this.socket.send(JSON.stringify(notification));
    }
    this.setState({currentUser: ({name: username})
    });
  }

render() {
    return (
    <div>
    <NavBar userCount = {this.state.userCount} />
    <Message userColour = {this.state.userColour}/>
    <MessageList messages = {this.state.messages}/>
    <Chatbar username = {this.state.currentUser.name} onMessageSubmit = {this.addMessage} onUsernameChange = {this.changeUsername}/>
    </div>
    );
  }
}

export default App;
