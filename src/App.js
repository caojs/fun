import React, { Component } from 'react';
import Filter from './filter/Filter';
import ActivatedFilters from './filter_actived/FilterActived';
import FilterResult from './filter_result/FilterResult';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App container">
        <Filter/>
        <span>-----</span>
        <ActivatedFilters/>
        <span>-----</span>
        <FilterResult/>
      </div>
    );
  }
}

export default App;
