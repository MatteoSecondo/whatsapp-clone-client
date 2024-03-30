import { useRef, useState } from "react"
import { IconButton } from "@mui/material"
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'

const ChatBody = ({ messages, messagesRef, scrollToMessage }) => {

    const [showReturnToLastMessage, setShowReturnToLastMessage] = useState(false)
    const ref = useRef()

    const checkIfShowReturnToLastMessage = (e) => {
        if (e.deltaY < 0) setShowReturnToLastMessage(true)
        const scrolledHeight = ref.current.scrollHeight - ref.current.scrollTop <= ref.current.clientHeight + 300
        if (scrolledHeight) setShowReturnToLastMessage(false)
    }

    return (
        <div className="chat__anchor">
            <div className="chat__body" onWheel={(e) => checkIfShowReturnToLastMessage(e)} ref={ref}>
                    {messages.map((message, index) =>
                        (
                            <p key={message._id || Math.floor(Math.random() * 1000) + 1}
                                className={`chat__message ${message.received && 'chat__receiver'}`}
                            >
                                <span className="chat__name">{message.name}</span>

                                {!message?.audio ?
                                <span
                                    className='chat__messageText'
                                    ref={el => messagesRef.current[index] = el}
                                >
                                    {message.message}
                                </span> : 
                                <audio src={message.audio} controls></audio>}

                                <span className="chat__timestamp">{message.timestamp}</span>
                            </p>
                        )
                    )}

                    {showReturnToLastMessage &&
                    <IconButton onClick={() => {scrollToMessage(messagesRef, messagesRef.current.length - 1); setShowReturnToLastMessage(false)}}>
                        <ArrowDownwardIcon />
                    </IconButton>}

                </div>
            </div>
    );
}
 
export default ChatBody;