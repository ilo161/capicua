const http = require("http");
const socketio = require("socket.io");

const express = require("express");
const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Data Base stuff
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
const users = require("./routes/api/users");
const User = require("./models/User");
const bodyParser = require("body-parser");


const port = process.env.PORT || 5000;
app.listen(port, () => {console.log(`Listening on port ${port}`)});

io.on("connection", socket => {
  console.log("New WS Connection ...")
})





// Data Base stuff
mongoose
.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("Connected to mongoDB"))
.catch(err => console.log(err))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/users", users)

app.get("/", (req, res) => {
  const user = new User({
    username: "Demo",
    password: "password"
  })
  // debugger;
  user.save()
  res.send("Capicua Server!");
});
