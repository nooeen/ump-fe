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
  
  socket.on("sendMessage", message => {
    console.log("\nsendMessage: ", message)
    socket.emit('receive-message', message)
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



// io.on('connection', socket => {
//   socket.on('new-user', name => {
//     users[socket.id] = name
//     socket.broadcast.emit('user-connected', name)
//   })
//   socket.on('send-chat-message', message => {
//     socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
//   })
//   socket.on('disconnect', () => {
//     socket.broadcast.emit('user-disconnected', users[socket.id])
//     delete users[socket.id]
//   })
// })


//httpServer.listen(3002);

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