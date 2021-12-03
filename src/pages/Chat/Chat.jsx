import {io} from "socket.io-client"
// const socket = io('http://localhost:3002')
var message1 = ""

// socket.on('connect', () => {
//   id = socket.id
//   socket.emit("sendMessage", "id connected: " +id)
// })
// //socket.emit('sendMessage', "messsage 1")
// socket.on("receive-message", message => {
//     message1 = message
// })

export default function Chat() {
  const socket = io('http://localhost:3002')
  let id = 1;
  socket.on('connect', () => {
    id = socket.id
    socket.emit("sendMessage", "id connected: " +id)
  })
  socket.on("receive-message", message => {
    message1 = message
  })  
  function send1(e) {
      e.preventDefault();
      socket.emit('sendMessage', "messsage 1")
  }

  function send2(e) {
      //e.preventDefault();
      socket.emit('sendMessage', "messsage 2")
  }
     
  return (
    <div>
      {/* <p>socket ID: {socket.id}</p>
      <p>message 1: {message1}</p> */}
      <form action="/chat" method="get" id="form1" onSubmit = {send1}>
      <button type="submit" form="form1" value="S1">Submit 1</button>
      </form>
      <form action="/chat" method="get" id="form2" onSubmit = {send2}>
      <button type="submit" form="form2" value="S1">Submit 2</button>
      </form>

      
    </div>
  );
}



