import React, {Component} from 'react';

class Chatbar extends Component{
    constructor(props) {
      super(props);
      this.state = {
        username: 'Anonymous',
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
      if (username === '') {
        this.setState({username: 'Anonymous'});

      } else if (username !== this.state.username) {
        this.setState({username: username, oldUser: this.state.username, type: 'postNotification'});
        this.props.onUsernameChange(username)
      }
    }



    render() {

      console.log("Rendering <Chatbar/>");


        return (
        <footer className="chatbar">
          <input className="chatbar-username"
                  type='text' name="username"
                  placeholder="Your Name (Optional)"
                  onBlur={this.onUsername}/>

          <input className="chatbar-message"
                  name="textMessage"
                  onKeyUp={this.onSubmit}
                  placeholder="Type a message and hit ENTER" />
        </footer>
      )


  }
}
export default Chatbar;