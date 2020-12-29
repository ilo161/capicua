import './stylesheets/App.css';
import './stylesheets/reset.css';

import Game from "./components/game"
import bodega from "./assets/img/La_Bodega.jpg"
import React, { Component } from 'react'

import Chat from '../src/components/Chat/Chat'

class App extends Component {
  render() {
    return (
      <div>
        <header>
          <Game /> 
          <Chat /> 
        </header>
        <img src={bodega} alt="bodega" className="bodega-img" ></img>
      </div>
        )
  }
}

export default App