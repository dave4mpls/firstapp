import 'core-js/es6/map';   // Required polyfill for <=IE11, from npm core-js package.
import 'core-js/es6/set';
import 'raf/polyfill';    // Required polyfill for request-animation-frame from raf package.

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Hello World</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
