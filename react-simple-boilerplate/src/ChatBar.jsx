import React, {Component} from 'react';

class Chatbar extends Component{
    constructor(props) {
      super(props);
      this.state = {
        username: 'Sadie',
        textMessage: ''
      };


      this.onSubmit = this.onSubmit.bind(this);
      this.onUsername = this.onUsername.bind(this);
    }

    onSubmit = (e) => {
      if (e.keyCode === 13) {
        const textMessage = e.target.value;
        this.props.onMessageSubmit(textMessage, this.state.username);
        e.target.value = '';
     }
    }


    onUsername = (e) => {
      const username = e.target.value
      this.setState({username: username});

      if (e.keyCode === 13) {
        this.props.onUsernameChange(username)
        console.log('SUBMIT', username)
      }
    }


    render() {

      console.log("Rendering <Chatbar/>");


        return (
        <footer className="chatbar">
          <input className="chatbar-username"
                  type='text' name="username"
                  placeholder="Your Name (Optional)"
                  value={this.state.username}
                  onChange={this.onUsername}
                  onKeyUp={this.onUsername}/>

          <input className="chatbar-message"
                  name="textMessage"
                  onKeyUp={this.onSubmit}
                  placeholder="Type a message and hit ENTER" />
        </footer>
      )


  }
}
export default Chatbar;