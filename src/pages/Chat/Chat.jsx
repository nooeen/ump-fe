import {io} from "socket.io-client"

export default function Chat() {
  const messageContainer = document.getElementById('message-container');
  const socket = io('http://localhost:3002')
  let id = 1;
  var message1 = ""
  socket.on('connect', () => {
    id = socket.id
    socket.emit("sendMessage", "id connected: " + id)
  })
  socket.on("receive-message", message => {
    message1 = message
    socket.emit("confirmReceived", message)
  })

  // socket.on('user-disconnected', name => {
  //   appendMessage('${name} connected')
  // })

  function send1(e) {
      e.preventDefault();
      socket.emit('sendMessage', "messsage 1")
  }
  
  function send(e) {
      e.preventDefault();
      message1 = 
      socket.emit('sendMessage', e.target.m1.value)
  }

  function send2(e) {
      e.preventDefault();
      socket.emit('sendMessage', "messsage 2")
  }

  function appendMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageContainer.append(messageElement);
  }

  // let count = 0;
  // setInterval(() => {
  //     socket.emit('ping', ++count)
  // }, 1000)

  document.addEventListener('keydown', e => {
      if(e.target.matches('input')) return
      if(e.key === 'c') socket.connect()
      if(e.key === 'd') socket.disconnect()
  })

  
     
  return (
    <div>
      <p>message: {message1}</p>
      <div id="message-container"></div>
      <form method="get" name = "form1" id="form1" onSubmit = {send}>
        <input type = "text" name = "m1"/>
      <button type="submit" form="form1" value="S1">SendMessage</button>
      </form>
      <button onClick= {send1}>message 1 </button>
      <button onClick= {send2}>message 2 </button>
    </div>
  );
}



