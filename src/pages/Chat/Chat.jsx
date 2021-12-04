import {io} from "socket.io-client"

export default function Chat() {
    var messageContainer = document.getElementById('message-container');
    const socket = io('http://localhost:3002')
    var id;
    var message1

    //display client's ID
    socket.on('connect', () => {
        id = socket.id
        socket.emit("sendID", id)
    })
    socket.on("idconnect", id => {
        message1 = "id: " + id
        appendMessage(message1)
    })

    //send and receive messages
    socket.on("receive-message", message => {
        message1 = "received: " + message
        appendMessage(message1)
        socket.emit("confirmReceived", message)
    })

    function send(e) {
        e.preventDefault();
        appendMessage(e.target.m1.value)
        socket.emit('sendMessage', e.target.m1.value, e.target.join.value)
    }

    //join room
    function joinRoom(e) {
        e.preventDefault();
        message1 = "join room: " + e.target.room.value
        appendMessage(message1)
        socket.emit("joinRoom", e.target.room.value)
    }

    //leave room
    function leaveRoom(e) {
        e.preventDefault();
        message1 = "leave room: " + e.target.leave.value
        appendMessage(message1)
        socket.emit("leaveRoom", e.target.leave.value)
    }

    //display messages
    function appendMessage(message) {
        messageContainer = document.getElementById('message-container')
        const messageElement = document.createElement('div');
        messageElement.innerText = message;
        messageContainer.append(messageElement);
    }

    //hotkeys for disconnect and reconnect (testing purpose)
    document.addEventListener('keydown', e => {
        if (e.target.matches('input')) return
        if (e.key === 'c') socket.connect()
        if (e.key === 'd') socket.disconnect()
    })


    return (
        <div>
            <div id="message-container"></div>
            <form method="get" name="form1" id="form1" onSubmit={send}>
                <input type="text" name="m1"/>
                <button type="submit" form="form1" value="S1">Send Message To</button>
                <input type="text" name="join"/>
            </form>

            <form method="get" name="form2" id="form2" onSubmit={joinRoom}>
                <input type="text" name="room"/>
                <button type="submit" form="form2" value="S2">join room</button>
            </form>

            <form method="get" name="form3" id="form3" onSubmit={leaveRoom}>
                <input type="text" name="leave"/>
                <button type="submit" form="form3" value="S3">leave room</button>
            </form>
        </div>
    );
}



