import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';
import './App.css';

class App extends Component {
  render() {
    let { route } = this.props;
    return (
      <div className="App container">
        Filter: /filter
        {renderRoutes(route.routes)}
      </div>
    );
  }
}

export default App;
