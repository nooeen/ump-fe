import { io } from "socket.io-client";
import "./Chat.css";
import ChatService from "../../services/chat.service";
import Topbar from "../../components/topbar/Topbar";
import Conversation from "../../components/chat/conversation";
import Message from "../../components/chat/message";
import axios from "axios";

const API_URL = process.env.REACT_APP_URL;
const SOCKET_URL = process.env.REACT_APP_SOCKET_URL;

export default function Chat() {
  var messageContainer = document.getElementById("message-container");
  const socket = io(SOCKET_URL);
  var id;
  var message1;

  //display client's ID
  socket.on("connect", () => {
    id = socket.id;
    socket.emit("sendID", id);
  });
  socket.on("idconnect", (id) => {
    message1 = "id: " + id;
    appendMessage(message1);
  });
  //send and receive messages
  socket.on("receive-message", (message) => {
    message1 = "received: " + message;
    appendMessage(message1);
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

  function send(e) {
    e.preventDefault();
    appendMessage(e.target.m1.value);
    socket.emit("sendMessageName", e.target.m1.value, e.target.join.value);
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
  function userConv(e) {
    e.preventDefault();
    ChatService.userConv(e.target.api.value)
      .then((result) => {
        message1 = result.data[0].members[0] + result.data[0].members[1];
        appendMessage(message1);

        socket.emit("sendMessage", message1);
      })
      .catch((error) => {
        socket.emit("sendMessage", error.message);
      });
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

  //display messages
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
      <div id="message-container"></div>
      <form method="get" name="form1" id="form1" onSubmit={send}>
        <input type="text" name="m1" />
        <button type="submit" form="form1" value="S1">
          Send Message To
        </button>
        <input type="text" name="join" />
      </form>
      <form method="get" name="api" id="api" onSubmit={getUserInfor}>
        <input type="text" name="api" />
        <button type="submit" form="api" value="S2">
          api test
        </button>
      </form>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="search for someone" className="chatMenuInput" />
            {/* <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation /> */}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            <div className="chatBoxTop">
              {/* <Message />
              <Message own={true} />
              <Message />
              <Message />
              <Message own={true} />
              <Message own={true} />
              <Message />
              <Message own={true} />
              <Message />
              <Message own={true} />
              <Message own={true} />
              <Message />
              <Message own={true} /> */}
            </div>
            <div className="chatBoxBottom">
              <textarea
                className="chatMessageInput"
                placeholder="write something"
              ></textarea>
              <button className="chatSubmitButton">Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
