import "./message.css"

export default function Message(props) {
    return (
        <div className={props.own ? "message own" : "message"}>
            <div className="messageTop">
                <img className="messageImg"
                    src="https://i.pinimg.com/474x/3f/23/97/3f2397bcb1b8a7e8f822a24d9b9ce27e.jpg"
                    alt=""
                />
                <p className="messageText">{props.content}</p>
            </div>
            <div className="messageBottom">
                1 hour ago
            </div>
        </div>
    )
}