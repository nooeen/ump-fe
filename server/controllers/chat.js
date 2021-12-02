const Conversation = require("../models/Conversation");
const Message = require("../models/Message.js");

const io = require("socket.io")(8900, {
    cors: {
      origin: "http://localhost:3000/chat",
    },
  });
  
var chatRoomData = [];
var connectedClients = {};
  
io.on('connection', (client) => {

  console.log("New client connected");

  //Client Sent a message
  client.on("SendMessage", (messageData) => {
    chatRoomData.push(messageData)
    sendUpdatedChatRoomData(client)
  })

  //Creating identity for new connected user
  client.on("CreateUserData", () => {
    let userID = uuid();
    let username = uniqueNamesGenerator({ dictionaries: [adjectives, names] });
    var userData = {userID: userID, username: username}
    client.emit("SetUserData", userData)
  })


  //Player Disconnecting from chat room...
  client.on('disconnecting', (data) => {
    console.log("Client disconnecting...");

    if(connectedClients[client.id]){
      var leftRoomMessage = {message: `${connectedClients[client.id].username} has left the chat`, username: "", userID: 0, timeStamp: null}
      chatRoomData.push(leftRoomMessage)
      sendUpdatedChatRoomData(client)
      delete connectedClients[client.id]
    }

  });
})

//Sending update chat room data to all connected clients
function sendUpdatedChatRoomData(client){
  client.emit("RetrieveChatRoomData", chatRoomData)
  client.broadcast.emit("RetrieveChatRoomData", chatRoomData)
}


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