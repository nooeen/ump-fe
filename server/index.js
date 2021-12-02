const express = require("express");
const cookieParser = require("cookie-parser");
const pino = require("express-pino-logger")();
const route = require("./routes");
const cors = require("cors");
const db = require("./db");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

io.on("connection", (socket) => {
  // ...
});

httpServer.listen(3002);

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
