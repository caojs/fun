import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';
import './App.css';

class App extends Component {
  render() {
    let { route } = this.props;
    return (
      <div className="App">
        Filter: /filter
        <div className="container">
          {renderRoutes(route.routes)}
        </div>
      </div>
    );
  }
}

export default App;
