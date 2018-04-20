import React, {Component} from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';

class MessageList extends Component{
  render(props) {
  const singleMessage = this.props.messages.map((m) => {
    if (m.type === 'incomingMessage') {
        return (
          <Message
          key = {m.id}
          username = {m.username}
          content = {m.content}
          notification = {m.notification}
          className = 'message'
          userColour = {m.colour}
          image = {m.image}
          />);
       } else {
        return (
          <Notification
          key = {m.id}
          username = {m.username}
          content = {m.content}
          notification = {m.notification}
          className = 'notification'
        />);

       }
  });

  return (
    <div id="message-list">
    {singleMessage}
    <Notification />
    </div>
    );
  }
}

export default MessageList;