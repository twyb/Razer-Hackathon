import React, { Component } from "react";
import logo from '../logo.svg';
import './App.css';
import Navbar from '../components/Navbar'

class App extends Component {

  
  render() {
    return (
      <div className = 'NavBar'>
      <Navbar/>
    </div>
    );
  }
  
}

export default App;
