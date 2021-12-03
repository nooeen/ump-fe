const express = require("express");
const cookieParser = require("cookie-parser");
const pino = require("express-pino-logger")();
const route = require("./routes");
const cors = require("cors");
const db = require("./db");
const { disconnect } = require("mongoose");
// const { createServer } = require("http");
// const { Server } = require("socket.io");

const app = express();
//const httpServer = createServer(app);
//const io = new Server(httpServer, { /* options */ });
const io = require("socket.io")(3002, {
  cors: {
    origin: ["http://localhost:3000"],
  }
});
const users = {}
io.on("connection", (socket) => {
  console.log('\nconnected to socket io')
  console.log("\nsocket id: ", socket.id)
  console.log("count client: ", io.engine.clientsCount)
  
  socket.on("sendMessage", (message, join) => {
    console.log("\nsendMessage: ", message)
    if (join != ""){
      socket.to(join).emit('receive-message', message)
    } else {
      socket.broadcast.emit('receive-message', message)
    }
    
  })

  socket.on("joinRoom", room => {
    socket.join(room)
  })

  socket.on("leaveRoom", room => {
    socket.leave(room)
  })

  socket.on("sendID", id => {
    socket.emit("idconnect", id)
  })
  socket.on("confirmReceived", message => {
    console.log("confirmReceived: ", message)
  })
  //socket.on('ping', n => console.log(n))
  socket.on('disconnect', () => {
    socket.emit('user-disconnected', users[socket.id])
    console.log("disconnected from socket io")
  })
});


var corsOptions = { 
  origin: "http://localhost:3000",
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(pino);
app.use(cookieParser());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(cors(corsOptions));

db.connect();

route(app);

app.listen(3001, () =>
  console.log("Express server is running on localhost:3001")
);