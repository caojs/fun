import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';
import Navbar from './Navbar';
import './App.css';

class App extends Component {
  render() {
    let { route } = this.props;
    return (
      <div className="App">
        <div className="container">
          <Navbar/>
          {renderRoutes(route.routes)}
        </div>
      </div>
    );
  }
}

export default App;
