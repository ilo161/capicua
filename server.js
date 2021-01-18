// import SoloRoom from "./frontend/src/classes/socketiobackend/solo_room"
// const SoloRoom = require("./frontend/src/classes/socketiobackend/solo_room")

const express = require("express");
// const request = require("request");
const app = express();

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
const options = { /* ... */ };
const io = require('socket.io')(server, options);

const PORT = process.env.PORT || 5000;
let rooms = {};
let roomSockets = {}

io.on('connection', socket => { 
  console.log("Connected to Socket yay! Socket id: " + socket.id);

  socket.on("startSoloGame", (data) => {
    const playerData = [{username: "Cyborg", isAi: true},
    {username: data.username, io: data.io}]

    let roomName = socket.id;
    socket.join(roomName);
    let newRoom = new SoloRoom(roomName, io);
    rooms[roomName] = newRoom;
    newRoom.createGame();
    socket.emit("changePhase", "solo")

  })

});

// server.listen(3000);




// Steven Below

// Socket.io 
// const socketio = require('socket.io');
// const http = require('http');
// const server = http.createServer(app);
// const io = socketio(server);

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