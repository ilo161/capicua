import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";

import Game from './game.jsx';
import Chat from './chat/chat';

const ENDPOINT = 'localhost:5000';

let socket;

const GameView = ({ location }) => {
   const [name, setName] = useState('');
   const [room, setRoom] = useState('');
   const [users, setUsers] = useState('');
   const [message, setMessage] = useState('');
   const [messages, setMessages] = useState([]);

   useEffect(() => {
      const { name, room } = queryString.parse(location.search);

      socket = io(ENDPOINT);

      setRoom(room);
      setName(name)

      socket.emit('join', { name, room }, (error) => {
         if (error) {
            alert(error);
         }
      });
   }, [ENDPOINT, location.search]);

   useEffect(() => {
      socket.on('message', message => {
         setMessages(messages => [...messages, message]);
      });

      socket.on("roomData", ({ users }) => {
         setUsers(users);
      });
   }, []);

   const sendMessage = (event) => {
      event.preventDefault();

      if (message) {
         socket.emit('sendMessage', message, () => setMessage(''));
      }
   }

   return (
      <div>
         <Game />
         <Chat />
      </div>
      )
}

export default GameView