import { useRef, useState } from "react"
import { IconButton } from "@mui/material"
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'

const ChatBody = ({ messages, messagesRef, scrollToMessage, dbUser }) => {

    const [showReturnToLastMessage, setShowReturnToLastMessage] = useState(false)
    const ref = useRef()

    const checkIfShowReturnToLastMessage = () => {
        const scrolledHeight = ref.current.scrollHeight - ref.current.scrollTop <= ref.current.clientHeight + 200
        if (scrolledHeight) setShowReturnToLastMessage(false)
        else setShowReturnToLastMessage(true)
    }

    return (
        <div className="chat__anchor">
            <div className="chat__body" onWheel={checkIfShowReturnToLastMessage} ref={ref}>
                    {messages && messages.map((message, index) =>
                        (
                            <p key={message._id || Math.floor(Math.random() * 1000) + 1}
                                className={`chat__message ${message.sender._id === dbUser._id && 'chat__receiver'}`}
                            >
                                <span className="chat__name">{message.sender.name}</span>

                                {!message?.audio ?
                                <span
                                    className='chat__messageText'
                                    ref={el => messagesRef.current[index] = el}
                                >
                                    {message.text}
                                </span> : 
                                <audio src={message.audio} controls ref={el => messagesRef.current[index] = el}></audio>}

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
    )
}
 
export default ChatBody;