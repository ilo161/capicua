const express = require("express");
const socketio = require("socket.io");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const router = require("./router");
const PORT = process.env.PORT || 4000;

// const mongoose = require("mongoose");
// const db = require("./config/keys").mongoURI;
// const users = require("./routes/api/users");
// const User = require("./models/User");
// const bodyParser = require("body-parser");


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
//   })
//   // debugger;
//   user.save()
//   res.send("Hello World!");
// });

// app.use("/api/users", users)


io.on("connection", (socket) => {
  console.log("New Connection!!");

  socket.on("disconnect", () => {
    console.log(" User has disconnected!!");
  })
});


app.use(router);

server.listen(PORT, () => {console.log(`Listening on port ${PORT}`)});
