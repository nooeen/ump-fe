import { io } from "socket.io-client";
import "./Chat.css";
import ChatService from "../../services/chat.service";
import Topbar from "../../components/topbar/Topbar";
import Conversation from "../../components/chat/conversation";
import Message from "../../components/chat/message";
import axios from "axios";
import { useState, useEffect } from "react";

const API_URL = process.env.REACT_APP_URL;
const SOCKET_URL = process.env.REACT_APP_SOCKET_URL;

export default function Chat() {
  var messageContainer = document.getElementById("message-container");

  const [conversations, setConversations] = useState([]);

  const socket = io('http://localhost:3002');
  var id;
  var message1;

  //display client's ID
  socket.on("connect", () => {
    id = socket.id;
    socket.emit("sendID", id);
  });
  socket.on("idconnect", (id) => {
    message1 = "id: " + id;
    //appendMessage(message1);
  });
  //send and receive user
  socket.on("receive-message", (message) => {
    message1 = "received: " + message;
    appendMessage(message1);
    console.log(message1);
    socket.emit("confirmReceived", message);
  });
  socket.on("getUsername", (name, message) => {
    ChatService.getUserInfor().then((info) => {
      if (info.username == name) {
        socket.emit("confirmUsername", socket.id, message);
        //socket.emit("sendMessage", socket.id + " success" + name)
      } else {
        socket.emit("sendMessage", socket.id + " fail" + name);
      }
    });
  });

  const send = (e) => {
    e.preventDefault();
    appendMessage("send: " + e.target.m1.value);

    const data = ['user1', 'user2']
    setConversations(data)

    ChatService.getUserInfor()
    .then((info) => {
      ChatService.saveMessage(e.target.name.value, info.username, e.target.m1.value )
    socket.emit("sendMessageName", e.target.m1.value, e.target.name.value);
    })
    
  }

  //join room
  function joinRoom(e) {
    e.preventDefault();
    message1 = "join room: " + e.target.room.value;
    appendMessage(message1);
    socket.emit("joinRoom", e.target.room.value);
  }

  //leave room
  function leaveRoom(e) {
    e.preventDefault();
    message1 = "leave room: " + e.target.leave.value;
    appendMessage(message1);
    socket.emit("leaveRoom", e.target.leave.value);
  }

  function getUserInfor(e) {
    e.preventDefault();
    ChatService.getUserInfor()
      .then((user) => {
        message1 = user.username;
        appendMessage(message1);
        socket.emit("sendMessage", message1);
      })
      .catch((error) => {
        socket.emit("sendMessage", error.message);
      });
  }

  function getListMessager(e) {
    e.preventDefault()
    ChatService.getUserInfor()
    .then((info) => {
      ChatService.getListMessager(info.username)
      .then((user) => {
        for(let i = 0; i < user.data.length; i++) {
          appendMessage(user.data[i])
        }
      })
    })
  }

  function getMessage(e) {
    e.preventDefault()
    ChatService.getUserInfor()
    .then((info) => {
      ChatService.getMessage(info.username, e.target.user.value)
      .then((user) => {
        for(let i = 0; i < user.data.length; i++) {
          if(user.data[i].sender == info.username){
            appendMessage(info.username + ": " + user.data[i].text)
          } else {
            appendMessage(e.target.user.value + ": " + user.data[i].text)
          }
        }
      })
    })
  }

  //display user
  function appendMessage(message) {
    console.log("send");
    messageContainer = document.getElementById("message-container");
    const messageElement = document.createElement("div");
    messageElement.innerText = message;
    messageContainer.append(messageElement);
  }

  //hotkeys for disconnect and reconnect (testing purpose)
  document.addEventListener("keydown", (e) => {
    if (e.target.matches("input")) return;
    if (e.key === "c") socket.connect();
    if (e.key === "d") socket.disconnect();
  });

  return (
    <div>
      {/* <div id="message-container"></div>
      <form method="get" name="form1" id="form1" onSubmit={send}>
        <input type="text" name="m1"/>
        <button type="submit" form="form1" value="S1">Send Message To</button>
        <input type="text" name="name"/>
      </form>

      <form method="get" name="api" id="api" onSubmit={getUserInfor}>
        <input type="text" name="api"/>
        <button type="submit" form="api" value="S2">user name</button>
      </form>

      <form method="get" name="getListMessager" id="getListMessager" onSubmit={getListMessager}>
        <input type="text" name="message"/>
        <button type="submit" form="getListMessager" value="S3">get list message user</button>
      </form>

      <form method="get" name="getMessage" id="getMessage" onSubmit={getMessage}>
        <input type="text" name="user"/>
        <button type="submit" form="getMessage" value="S3">get message</button>
      </form> */}
      <Topbar />
      <div>
        <div className="messenger">
          <div className="chatMenu">
            <div className="chatMenuWrapper" id="conv">

            {conversations.map((e) => (
            <Conversation
             name = {e}
            ></Conversation>
          ))}

              <Conversation name="người 1"/>
              <Conversation name="người 2"/>
            </div>
            </div>
          <div className="chatBox">
            <div className="chatBoxWrapper">
              <div id="message-container" className="chatBoxTop">
                <Message own={true} content="i am the sender" time="2 hour ago" />
                <Message content="i am the receiver" time="1 hour ago"></Message>
              </div>
                <div className="chatBoxBottom">
                  <form method="get" name="form1" id="form1" onSubmit={send}>
                    <input className="chatMessageInput" placeholder="write something" type="text" name="m1" />
                    <button className="chatSubmitButton" type="submit" form="form1" value="S1">
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}


