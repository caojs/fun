import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';
import Header from './Header';
import Footer from './Footer';

class App extends Component {
  render() {
    let { route } = this.props;
    return (
      <div className="App">
          <Header/>
          {renderRoutes(route.routes)}
          <Footer/>
      </div>
    );
  }
}

export default App;
