const express = require("express");
const app = express();

const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
const users = require("./routes/api/users");
const User = require("./models/User");
const bodyParser = require("body-parser");

const path = require('path');

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })
}

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to mongoDB"))
  .catch(err => console.log(err))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  const user = new User({
    username: "Demo",
    password: "password"
  })

  user.save()
  res.send("Hello World!");
});

app.use("/api/users", users)


const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3001 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
});

// app.listen(port, () => {console.log(`Listening on port ${port}`)});



// // Socket.io 
// const socketio = require('socket.io');
// const http = require('http');
// const server = http.createServer(app);
// const io = socketio(server);
// const PORT = process.env.PORT || 5000;

// const router = require('./router');
// const { useParams } = require("react-router-dom");
// // const cors = require('cors');

// // const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');
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

// app.use(router);

// server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));