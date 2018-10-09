import React, { Component } from 'react';
import Filter from './filter';
import './App.css';
import './data/normalizr-dummy';

class App extends Component {
  render() {
    return (
      <div className="App container">
        <Filter/>
      </div>
    );
  }
}

export default App;
