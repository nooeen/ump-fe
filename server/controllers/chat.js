const Conversation = require("../models/Conversation");
const Message = require("../models/Message.js");

const io = require("socket.io")(8900, {
    cors: {
      origin: "http://localhost:3000/chat",
    },
  });
  
  let users = [];
  
  const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
      users.push({ userId, socketId });
  };
  
  const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
  };
  
  const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
  };
  
  io.on("connection", (socket) => {
    //when ceonnect
    console.log("a user connected.");

    //take userId and socketId from user
    socket.on("addUser", (userId) => {
      addUser(userId, socket.id);
      io.emit("getUsers", users);
    });
  
    //send and get message
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
      const user = getUser(receiverId);
      io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
      });
    });
  
    //when disconnect
    socket.on("disconnect", () => {
      console.log("a user disconnected!");
      removeUser(socket.id);
      io.emit("getUsers", users);
    });
  });


class ChatController {
    //api/chat/newConv
    newConv(req, res) {
        const newConversation = new Conversation({
            members: [req.body.senderId, req.body.receiverId],
        });
        console.log("user1 ", req.body.senderId)

        newConversation.save()
        .then((savedConversation, err) => {
            res.status(200).json(savedConversation);
        })
        .catch((err) => {
            res.status(500).json(err);
        })
    } 

    //api/chat/userConv?userId=
    userConv(req, res) {
        Conversation.find({members: { $in: [req.query.userId] },})
        .then((conversation, err) => {
            console.log("ID ", req.query.userId)
            res.status(200).json(conversation);
        })
        .catch((err) => {
            res.status(500).json(err);
        })
    }

    //api/chat/twoUserConv?firstUserId=minh&secondUserId=ngoc
    twoUserConv(req, res) {
        Conversation.find({members: { $all: [req.query.firstUserId, req.query.secondUserId]},})
        .then((conversation, err) => {
            res.status(200).json(conversation);
        })
        .catch((err) => {
            res.status(500).json(err);
        })
    }

    //api/chat/saveMessage
    saveMessage(req, res, next) {
        const newMessage = new Message(req.body);
        newMessage.save()
        .then((messages, err) => {
            res.status(200).json(messages);
        })
        .catch((err) => {
            res.status(500).json(err);
        })
    }

    //api/chat/getMessage?conversationId=19021343
    getMessage(req, res) {
        Message.find({conversationId: req.query.conversationId,})
        .then((messages, err) => {
            console.log("ID ", req.query.conversationId)
            res.status(200).json(messages);
        })
        .catch((err) => {
            res.status(500).json(err);
        })
    }
}

module.exports = new ChatController()