import React, {Component} from 'react';


export default class Notification extends Component{
  render(props) {
      console.log("Rendering <Notification/>");

      return (
        <div className="notification">
        <span className="notification-content">{this.props.content}</span>
      </div>
    )
  }
}