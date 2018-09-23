import React, { Component } from 'react';
import './App.css';
import Filter from './filter/Filter';
import ActivatedFilters from './filter_actived/FilterActived';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Filter/>
        <span>abcdef</span>
        <ActivatedFilters/>
      </div>
    );
  }
}

export default App;
