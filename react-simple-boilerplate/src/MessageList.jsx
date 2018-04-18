import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component{
  render(props) {
    console.log("Rendering <MessageList/>");

  const singleMessage = this.props.messages.map((m) => {

  return (
    <Message
    key = {m.id}
    username = {m.username}
    content = {m.content}
    notification = {m.notification}
    />);
 });

  return (
    <div id="message-list">
    {singleMessage}
    </div>



    );

}
}

export default MessageList;