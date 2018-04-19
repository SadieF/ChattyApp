import React, {Component} from 'react';

export default class NavBar extends Component{
  render(props) {
      console.log("Rendering <NavBar/>");
      return (
      <nav className="navbar">
         <a href="/" className="navbar-brand">Chatty</a>
         <p>User(s) in this room: {this.props.userCount}</p>
      </nav>
    )
  }
}

