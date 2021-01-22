// import SoloRoom from "./frontend/src/classes/socketiobackend/solo_room"
const SoloRoom = require("./frontend/src/classes/socketiobackend/solo_room")

const express = require("express");
// const request = require("request");
const app = express();

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
// const mongoose = require("mongoose");
// const db = require("./config/keys").mongoURI;
// const users = require("./routes/api/users");
// const User = require("./models/User");
// const bodyParser = require("body-parser");

// const path = require('path');

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static('frontend/build'));
//   app.get('/', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
//   })
// }

// mongoose
//   .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("Connected to mongoDB"))
//   .catch(err => console.log(err))

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// app.get("/", (req, res) => {
//   const user = new User({
//     username: "Demo",
//     password: "password"
  // })
//   app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     next();
//   });

//   app.get("/joinSoloGame", (req, res) => {
//   request(
//     { url: 'http://localhost:3000/#/joinSoloGame' },
//     (error, response, body) => {
//       if (error || response.statusCode !== 200) {
//         return res.status(500).json({ type: 'error', message: err.message });
//       }

//       res.json(JSON.parse(body));
//     }
//   )
// });

//   user.save()
//   res.send("Hello World!");
// });

// app.use("/api/users", users)


// const WebSocket = require('ws');

// const wss = new WebSocket.Server({ port: 3001 });

// wss.on('connection', function connection(ws) {
//   ws.on('message', function incoming(data) {
//     wss.clients.forEach(function each(client) {
//       if (client !== ws && client.readyState === WebSocket.OPEN) {
//         client.send(data);
//       }
//     });
//   });
// });

// app.listen(port, () => {console.log(`Listening on port ${port}`)});

const server = require('http').createServer(app);
// const options = { /* ... */ };
// const io = require('socket.io')(server, options);
const io = require('socket.io')(server);

const PORT = process.env.PORT || 5000;

// const cfg = require('config.json');
// const tw = require('node-tweet-stream')(cfg);
// tw.track('socket.io');
// tw.track('javascript');

let rooms = {};
let roomSockets = {}

io.on('connection', socket => { 
  console.log("Connected to Socket yay! Socket id: " + socket.id);

  socket.on("startSoloGame", (data) => {
    console.log("starting solo Game")

    let roomName = socket.id;
    socket.join(roomName);
    const playerData = [{username: "Cyborg", isAi: false},
    {username: data.username, isAi: false}]

    let newRoom = new SoloRoom(roomName, io, playerData);
    rooms[roomName] = newRoom;

    newRoom.createGame();
    // let gameData = {"phase":"solo", "newRoom": newRoom}
    socket.emit("changePhase", "soloLobby")
    // socket.to(roomName).emit("changePhase", "solo")

    //testing
    let currentGame = rooms[socket.id];
    let newGameState = currentGame.sendGameState();
    socket.emit("receiveGameState", newGameState)
    //testing

  })

  socket.on("askingForGameState", (data) => {
      console.log("preparing GameState");
      console.log(data)
      // console.log(currentGame.sendGameState())
      
      //testing...
      
      let currentGame = rooms[socket.id];
      let newGameState = currentGame.sendGameState();
      console.log(newGameState)
      socket.emit("receiveGameState", newGameState)
  })

  //this trigger is on the <Lobby Component>
  socket.on("gameStartRender", () => {
      socket.emit("changePhase", "soloGameStart")


      //testing
          let currentGame = rooms[socket.id];
          let newGameState = currentGame.sendGameState();
          socket.emit("receiveGameState", newGameState)

      //testing

  })

  socket.on("sentPlayerInput", (data)=> {
    console.log("got player Input")
    console.log(data.boneIdx)
    let posPlay = data.posPlay;
    let center = data.center;
    let boneIdx = data.boneIdx;

    let currentGame;
    let newGameState;

    let isCurrentGameOver
    let showModalBoolean;



    const room = rooms[socket.id];

    if(room){
      // console.log(room)
        
          console.log("game is in session")
          const currentBone = room.board.currentPlayer.hand.splice(boneIdx,1)[0];
          const verifyMove = room.board.makeMove(posPlay, center, currentBone);

          if(verifyMove){
                isCurrentGameOver = room.board.isCurrentGameOver();
            if (isCurrentGameOver){
                // this.setState({ board: this.state.board });
                // probably emit here gameState
                showModalBoolean = (!room.board.inSession || room.board.lockedGame)
                console.log(`Show modal:? ${showModalBoolean}`)
                console.log(`Show locked Status:? ${room.board.lockedGame}`)
                console.log("~~")

                currentGame = rooms[socket.id];
                newGameState = currentGame.sendGameState();
                newGameState[showModalBoolean] = showModalBoolean;
                console.log("sending endGame State")
                console.log(newGameState)
                
                return (socket.emit("receiveGameState", newGameState))
            }

            room.board.resetSkipCounter();

            if(room.board.inSession === true){
              room.board.nextPlayerAssignTurn();

              //emit here gameState
            } else {
              //game is NOT in Session
              //emit gameState
            }
        } else {
          // move is invalid
            // debugger
            room.board.currentPlayer.hand.splice(boneIdx, 0, currentBone); 
            
            //emit gameState

        }
        
        console.log(room.board.renderArena())
        console.log("Arena ^..hand below")
        room.board.currentPlayer.revealHand()
        console.log(`^^'s points: ${room.board.currentPlayer.points}`)
        console.log("A inside")
        
      }
      console.log("A outside")
    
    
        

    currentGame = rooms[socket.id];
    newGameState = currentGame.sendGameState();
    console.log("sending game State")
    socket.emit("receiveGameState", newGameState)


  })

  // socket.on("askForAiPlay", (username, roomName) => {
  //     console.log(`asking...test : ${username}`)
  //         const room = rooms[socket.id];

  //         if(room){
  //           // console.log(room)
  //             if(room.board.inSession){
  //                 console.log("game is in session")
  //             }
  //         }
          

  //         let currentGame = rooms[socket.id];
  //         let newGameState = currentGame.sendGameState();
  //         socket.emit("receiveGameState", newGameState)

  // })


  // socket.on("askForAiPlay", (username, roomName) => {
  //   console.log(`asking...test : ${username}`)
  //     const room = rooms[socket.id];
  //     console.log(room.board.inSession)
  //     if(room.board.inSession){
  //           // let isCurrentGameOver = room.board.isCurrentGameOver();
  //           let isCurrentGameOver;
  //       if(room){
  //         // if(!isCurrentGameOver){

          
  //         console.log("getting AI move")
  //         console.log("Arena Below")
  //         console.log(room.board.renderArena())
  //         let aiResponse = room.board.currentPlayer.aiAutoPlay("easy")
  //         let boneIdx = aiResponse[2];
  //         let verifyMove;

  //         let currentBone = room.board.currentPlayer.hand.splice(boneIdx,1)[0];
  //         // console.log(currentBone)

  //         aiResponse[2] = currentBone;
  //         // console.log(aiResponse)

  //         verifyMove = room.board.makeMove(aiResponse[0], aiResponse[1], aiResponse[2]);
  //           // while(!room.board.makeMove(...[aiResponse]) === true){
  //           while(!verifyMove){
  //             // console.log("try again")
  //             if(!verifyMove){
  //                   room.board.currentPlayer.hand.splice(boneIdx,0, currentBone); 
  //             }
  //               aiResponse = room.board.currentPlayer.aiAutoPlay("easy")
  //               boneIdx = aiResponse[2];
  //               currentBone = room.board.currentPlayer.hand.splice(boneIdx,1)[0];
  //               aiResponse[2] = currentBone;
  //               verifyMove = room.board.makeMove(aiResponse[0], aiResponse[1], aiResponse[2]);
                
  //           }
  //           console.log("exit")

  //           if(verifyMove){

  //               // isCurrentGameOver = room.board.isCurrentGameOver();
  //               isCurrentGameOver = !room.board.inSession;
  //               console.log(`currGameIS: ${room.board.currentPlayer.username} ${isCurrentGameOver}`)
  //             if (isCurrentGameOver){
  //                 // this.setState({ board: this.state.board });
  //                 console.log("game is over!")
  //                 return;
  //             }

  //               console.log("reset skip")
  //               room.board.resetSkipCounter();

  //               if(room.board.inSession === true){
  //                 console.log("next Player time")
  //                 room.board.nextPlayerAssignTurn()

  //                 } 
  //               //   else {

  //               //   }
  //               // } else {
  //           }

  //           if(!isCurrentGameOver){
  //               console.log(room.board.renderArena());
  //               console.log("Arena ^..hand below");
  //               room.board.currentPlayer.revealHand();

  //               if(room.board.inSession){
  //                 console.log(aiResponse);
  //                 let newGameState = room.sendGameState();
  //                 io.to(room.roomName).emit('receiveGameState', newGameState);
  //                 // socket.emit("AiAutoPlayData", aiResponse)

  //               }
  //           } else {
  //             console.log("no more moves")
  //             return
  //           }
            
  //         // console.log(this.state.board.currentPlayer.revealHand())
  //         // debugger
  //         // console.log(`^^'s points: ${this.state.board.currentPlayer.points}`)

            
  //       }
  //     }
      
  //   // }
  // })

});

// setInterval(() => {
//     Object.keys(rooms).forEach(roomName => {
//         const room = rooms[roomName];
//         if (room) {

//             let newGameState = room.sendGameState();
//             io.to(room.roomName).emit('receiveGameState', newGameState);
//             // io.to(room.roomName).emit('receiveConsoleMessage', 'Updating game state');
//         }
//     })
// }, 200);

// server.listen(3000);




// Steven Below



const router = require('./router');
// const { useParams } = require("react-router-dom");
// const cors = require('cors');

// const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');
// let users = [];

// const messages = {
//   room1: [],
//   room2: [],
//   room3: [],
//   room4: []
// }


// io.on("connection", (socket) => {
//   console.log("New CONNECTION!!");
  
//   socket.on("join server", (username)  => {
//     const user = {
//       username,
//       id: socket.id
//     };
//     users.push(user);
//     io.emit("new user", users);
//   });



//   socket.on("join room", (roomName, cb)  => {
//     socket.join(roomName);
//     cb(messages[roomName]);
//   });

// })

// io.on('connect', (socket) => {
//   socket.on('join', ({ name, room }, callback) => {
//     const { error, user } = addUser({ id: socket.id, name, room });

//     if (error) return callback(error);

//     socket.join(user.room);

//     socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.` });
//     socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

//     io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

//     callback();
//   });

//   socket.on('sendMessage', (message, callback) => {
//     const user = getUser(socket.id);

//     io.to(user.room).emit('message', { user: user.name, text: message });

//     callback();
//   });

//   socket.on('disconnect', () => {
//     const user = removeUser(socket.id);

//     if (user) {
//       io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
//       io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
//     }
//   })
// });

//Steven End

app.use(router);

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));