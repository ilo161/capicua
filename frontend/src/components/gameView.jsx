import Game from './game.jsx';
import Chat from './chat/chat';
import React from 'react';


const GameView = () => {
     return (
        <div>
           <Game/>
           <Chat/>
        </div>
     )
}

export default GameView