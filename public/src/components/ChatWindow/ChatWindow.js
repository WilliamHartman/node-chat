import React, { Component } from "react";
import './ChatWindow.css';

import axios from "axios";
import url from '../../api'

import Message from './Message/Message';

import dateCreator from '../../utils/dateCreator';

export default class ChatWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      text: '',
      name: ''
    };

    this.handleTextChange = this.handleTextChange.bind( this );
    this.handleNameChange = this.handleNameChange.bind( this );
    this.createMessage = this.createMessage.bind( this );
    this.editMessage = this.editMessage.bind( this );
    this.removeMessage = this.removeMessage.bind( this );
  }

  componentDidMount() {
    axios.get( url ).then( response => {
      this.setState({ messages: response.data });
    });
  }

  handleTextChange( event ) {
    this.setState({ 
      text: event.target.value, 
    });
  }

  handleNameChange( event ) {
    this.setState({
      name: event.target.value
    })
  }

  createMessage( event ) {
    const { text, name } = this.state;
    if ( event.key === "Enter" && text.length !== 0 ) {
      axios.post( url, { text, time: dateCreator(), name } ).then( response => {
        this.setState({ messages: response.data });
      });

      this.setState({ text: '' });
    }
  }

  editMessage( id, text ) {
    console.log( 'editMessage:', id, text ); 
    axios.put( url + `/${id}`, { text } ).then( response => {
      this.setState({ messages: response.data });
    });
  }

  removeMessage( id ) {
    axios.delete( url + `/${id}` ).then( response => {
      this.setState({ messages: response.data });
    });
  }

  refreshChatBox() {
    setInterval(axios.get(url).then( response => {
      this.setState({ messages: response.data })
    }), 1000)
  }

  componentDidMount = () => {
    this.refreshChatBox();
  }
  

  render() {
    console.log(`ChatWindow.js: ${JSON.stringify(this.state.messages)}`);
    console.log(`ChatWindow.js state: ${this.state.name}`);
    return (
      <div id="ChatWindow__container">
      <input placeholder="Enter your name"
             onChange={ this.handleNameChange }/>
        <div id="ChatWindow__messagesParentContainer">
          <div id="ChatWindow__messagesChildContainer">
            {
              this.state.messages.map( message => (
                <Message id={ message.id} key={ message.id } text={ message.text } time={ message.time } edit={ this.editMessage } remove={ this.removeMessage } name={message.name}/>
              ))
            }
          </div>
        </div>
        <div id="ChatWindow__newMessageContainer">
          <input placeholder="What's on your mind? Press enter to send." 
                 onKeyPress={ this.createMessage }
                 onChange={ this.handleTextChange }
                 value={ this.state.text }
          />
        </div>
      </div>
    )
  }
}