import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';
import Header from './Header';
import Footer from './Footer';

import styles from './App.module.scss';

class App extends Component {
  render() {
    let { route } = this.props;
    return (
      <div className={styles.main}>
          <Header/>
          <div className="me-app">
            {renderRoutes(route.routes)}
          </div>
          <Footer/>
      </div>
    );
  }
}

export default App;
