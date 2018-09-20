import React, { Component } from 'react';
import './App.css';
import Select from './common/Select';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Select label="abc" name="abc" data={[{
          label: "abc",
          value: "ab"
        }, {
          label: "def",
          value: "def"
        }]}/>

        <Select label="afsfwrwr" name="fwrw" data={[{
          label: "abc",
          value: "ab"
        }, {
          label: "def",
          value: "def"
        }]}/>
      </div>
    );
  }
}

export default App;
