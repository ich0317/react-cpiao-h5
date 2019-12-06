import React, { Component } from 'react';
import Routes from './router/router'
import './App.scss'

console.log(window.screen)

class App extends Component {
  render(){
    return (
      <Routes />
    );
  }
}

export default App;
