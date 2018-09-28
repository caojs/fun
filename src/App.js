import React, { Component } from 'react';
import 'cross-fetch/polyfill';
import 'normalize.css';
import Filter from './filter/Filter';
import ActivatedFilters from './filter_actived/FilterActived';
import FilterResult from './filter_result/FilterResult';

class App extends Component {
  render() {
    return (
      <div className="App">
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
