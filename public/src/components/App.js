import React, { Component } from 'react';
import './App.css';
import ChatWindow from './ChatWindow/ChatWindow';
import SocketIOClient from 'socket.io-client';

class App extends Component {
  constructor(props) {
    super(props);
    this.socket = SocketIOClient(`http://localhost:4000`);
    this.state = {

    }
    //this.refresh = this.refresh.bind(this);
  }
  
  /*componentDidMount() {
    this.refresh();
  }

  refresh() {
    setInterval(this.setState(this.state), 2000);
  }*/

  render() {
    return (
      <div id="App__container">
        <ChatWindow/>
      </div>
    );
  }
}

export default App;
