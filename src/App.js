import React, { Component } from 'react';
import './App.css';
import Board from './Board';

class App extends Component {

  render() {
    return (
      <div className="App">
        <h2>"X" Sweeper</h2>
        <Board/>
      </div>
    );
  }
}

export default App;
