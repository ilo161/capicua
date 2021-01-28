// import SoloRoom from "./frontend/src/classes/socketiobackend/solo_room"
const SoloRoom = require("./frontend/src/classes/socketiobackend/solo_room")
const Room = require("./frontend/src/classes/socketiobackend/room")

const express = require("express");
// const request = require("request");
const app = express();

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });

// app.get("/join2playergame", (req,res) => {
//   console.log("2")
// })  

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

let rooms = {};
let roomAtSocket = {}


io.on('connection', socket => { 
  console.log("Connected to Socket yay! Socket id: " + socket.id);

  socket.on("createRoom", (data) => {
    let roomName = data.roomName;
    

    if (rooms[roomName]) {
            socket.emit('receiveRoomError', 'Room already exists!');
    } else {
      
      let username = data.username;
      let id = socket.id;
      let _data = {username, id};
      
      //total number of expected players
      let numPlayers = data.numPlayers;


      console.log(roomName)
      console.log(username)
      console.log(numPlayers)
      // console.log(socket)
      // console.log(socket.id)

      socket.join(roomName);
      roomAtSocket[id] = roomName;
      rooms[roomName] = new Room(numPlayers, roomName, io);

      rooms[roomName].addPlayer(_data);
      socket.emit("joinRoom", roomName);

    }




  })

  socket.on("joinExistingRoom", (data) => {
    let roomName = data.roomName;
    

      if (!rooms[roomName]) {
          console.log("room does not exist")  
          socket.emit("receiveRoomError", "Room does not exist") 
        // socket.emit('receiveRoomError', 'Room already exists!');
    } else {

      let username = data.username
      let id = socket.id;
      let _data = {username, id}

      console.log("join room success");
      console.log(roomName)

      socket.join(roomName)
      roomAtSocket[id] = roomName;
      // console.log(socket.id)
      rooms[roomName].addPlayer(_data)
      // console.log(rooms[roomName])

      //just added this last
      socket.emit("joinRoom", roomName)
      // console.log(rooms[roomName].players)
      // ^^
      io.in(roomName).emit("updateRoomPlayers", {lobbyPlayers: rooms[roomName].players});



    }
  })

  socket.on("startSoloGame", (data) => {
    console.log("starting solo Game")

    // socket ID is room name
    let roomName = socket.id;
    // join a room
    socket.join(roomName);
    
    //construct data
    const playerData = [{username: "Cyborg", isAi: false},
    {username: data.username, isAi: false}]

    //create Room Object
    let newRoom = new SoloRoom(roomName, io, playerData);
    rooms[roomName] = newRoom;

    //create game inside room object
    newRoom.createGame();

    //tell client game is ready
    socket.emit("changePhase", "soloLobby")
    // socket.to(roomName).emit("changePhase", "solo")

    //testing
    let currentGame = rooms[socket.id];
    let newGameState = currentGame.sendGameState();
    socket.emit("receiveGameState", newGameState)
    //testing

  })

  socket.on("askingForGameState", (roomName) => {
      console.log("preparing GameState");
      // console.log(data)
      // console.log(currentGame.sendGameState())
      
      //testing...
      
      let currentGame = rooms[roomName];
      let newGameState = currentGame.sendGameState();
      // console.log(newGameState)
      socket.emit("receiveGameState", newGameState)
  })

  //this trigger is on the <Lobby Component>
  socket.on("gameStartRender", (roomName) => {
    // console.log(roomName)

    let currentFullRoom = rooms[roomName]
    currentFullRoom.createGame()
      // socket.emit("changePhase", "multiPlayerGameStart")
    io.in(roomName).emit("changePhase", "multiPlayerGameStart");  


      //testing
          // let currentGame = rooms[socket.id];
          // let newGameState = currentGame.sendGameState();
          // socket.emit("receiveGameState", newGameState)

      //testing

  })

  socket.on("sentPlayerInput", (data)=> {
    console.log("got player Input")
    console.log(data.boneIdx)
    let posPlay = data.posPlay;
    let center = data.center;
    let boneIdx = data.boneIdx;
    let roomName = data.roomName

    let currentGame;
    let newGameState;

    let isCurrentGameOver
    let showModalBoolean;



    // const room = rooms[socket.id];
    const room = rooms[roomName];

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

                currentGame = rooms[roomName];
                newGameState = currentGame.sendGameState();
                newGameState[showModalBoolean] = showModalBoolean;
                console.log("sending endGame State")
                console.log(newGameState)
                
                // this
                return io.in(roomName).emit("receiveGameState", newGameState)
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
    
    
        
      //old
    // currentGame = rooms[socket.id];
    currentGame = rooms[roomName];

    newGameState = currentGame.sendGameState();
    console.log("sending game State")
    //new
    io.in(roomName).emit("receiveGameState", newGameState);
    
    //old
    // socket.emit("receiveGameState", newGameState)


  })

  // socket.on("resetBoneyard", data => {
  //   console.log("resetBoneyard active")
  //   let roomName = data.roomName;
  //   let resetBoneyardNum = data.resetBoneyardNum;

  //   let currentGame = rooms[roomName]
  //   currentGame.resetFauxBoneyard(resetBoneyardNum)

  //   newGameState = currentGame.sendGameState()
  //   io.in(roomName).emit("receiveGameState", newGameState);
  // })

  socket.on("restartGame", data => {
    let newGameBoolean = data.newGameBoolean;
    let newRoundBoolean = data.newRoundBoolean;
    let roomName = data.roomName;

    let currentGame = rooms[roomName];
    let newGameState;

    if(newGameBoolean === true){
      console.log(`newGame: ${newGameBoolean}`)
      currentGame.createGame()

    } else if(newRoundBoolean === true){
      console.log(`nextRound: ${newRoundBoolean}`)
      currentGame.newNextRound();

    }

    newGameState = currentGame.sendGameState()
    io.in(roomName).emit("receiveGameState", newGameState);
  })


  socket.on("disconnect", id => {
    let roomName = roomAtSocket[socket.id];
    console.log(socket.id)
    console.log("has disconnected")
    io.in(roomName).emit("changePhase", "playerDisconnect");

  })

  

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








const router = require('./router');
// const { useParams } = require("react-router-dom");
// const cors = require('cors');


// let users = [];

// const messages = {
//   room1: [],
//   room2: [],
//   room3: [],
//   room4: []
// }





//   socket.on('sendMessage', (message, callback) => {
//     const user = getUser(socket.id);

//     io.to(user.room).emit('message', { user: user.name, text: message });

//     callback();
//   });




app.use(router);

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));