const ChatBody = ({ messages, messagesRef }) => {
    return (
        <div className="chat__body">
                {messages.map((message, index) =>
                    (
                        <p key={message._id || Math.floor(Math.random() * 1000) + 1}
                            className={`chat__message ${message.received && 'chat__receiver'}`}
                        >
                            <span className="chat__name">{message.name}</span>

                            {!message?.audio ?
                            <span
                                className='chat__messageText'
                                id={message._id || Math.floor(Math.random() * 1000) + 1}
                                ref={el => messagesRef.current[index] = el}
                            >
                                {message.message}
                            </span> : 
                            <audio src={message.audio} controls ref={el => messagesRef.current[index] = el}></audio>}

                            <span className="chat__timestamp">{message.timestamp}</span>
                        </p>
                    )
                )}
            </div>
    );
}
 
export default ChatBody;