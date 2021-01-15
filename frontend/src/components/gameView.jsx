import Game from './game.jsx';
import Chat from './chat/chat';
import React from 'react';
import bodega from "../assets/img/La_Bodega.jpg"
import Score from './gameScore.jsx';
import Rules from './gameRule.jsx';
import Navbar from './navrbar.jsx';

const GameView = () => {
     return (
        <div className="master-game-container">
           <Navbar/>
           <div className="board-chat-container">
            <Game/>
            <Chat/>
           </div>
           <div className="score-rules-container" >
            <Score/>
            
           </div>
           <img src={bodega} alt="bodega" className="bodega-img" ></img>
        </div>
     )
}

export default GameView