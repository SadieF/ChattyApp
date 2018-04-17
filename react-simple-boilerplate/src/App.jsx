import React, {Component} from 'react';
import Chatbar from './Chatbar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
                  currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
                  messages: []
                }

            this.addMessage = this.addMessage.bind(this);
        }


        // const oldMessages = this.state.messages;
        // const newMessages = [...oldMessages, {id: 123, username: this.state.currentUser.name, content: msg }]
        // this.setState({messages: newMessages})

    componentDidMount() {
      console.log("componentDidMount <App />");
      this.socket = new WebSocket("ws://localhost:3001");

      this.socket.onmessage = (msg) => {
        console.log('On Message msg', msg);

      }
        console.log('Connected to Server');


      setTimeout(() => {
        console.log("Simulating incoming message");
        // Add a new message to the list of messages in the data store
        const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
        const messages = this.state.messages.concat(newMessage)
        // Update the state of the app component.
        // Calling setState will trigger a call to render() in App and all child components.
        this.setState({messages: messages})
      }, 3000);

    }



 // sendMessageToServer(msg) {
 //      console.log('SEND MESSAGE?')
 //      var msg = {
 //        type: 'message',
 //        content: msg,
 //        username: this.state.currentUser.name
 //      }
 //     this.socket.send(JSON.stringify(msg));
 //     console.log(JSON.stringify(msg));
 //  }

      addMessage(msg) {
          console.log('SEND MESSAGE?')
          var msg = {
            type: 'sendMessage',
            content: msg,
            username: this.state.currentUser.name
          }

            this.socket.send(JSON.stringify(msg));
      }






    render() {
        console.log("Rendering <App/>");
        return (
        <div>
        <Message />
        <MessageList messages = {this.state.messages} />
        <Chatbar username = {this.state.currentUser.name} onEnter = {this.addMessage}/>
        </div>


        );
      }
    }

export default App;
