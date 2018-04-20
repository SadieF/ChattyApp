import React, {Component} from 'react';

class Message extends Component{
  render(props) {
  return (

    <main className="messages">
      <div className="message">
          <span className="message-username" style={{color: this.props.userColour}}>{this.props.username}</span>
          <span className="message-content">{this.props.content}</span>
          <img className="image" src={this.props.image}/>
      </div>
    </main>
    )
  }
}
export default Message;