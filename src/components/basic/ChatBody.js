import { useRef, useState } from "react"
import { IconButton } from "@mui/material"
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import DoneAllIcon from '@mui/icons-material/DoneAll'

const ChatBody = ({ messages, messagesRef, scrollToMessage, currentUser, anchorRef }) => {

    const [showReturnToLastMessage, setShowReturnToLastMessage] = useState(false)
    const ref = useRef()

    const checkIfShowReturnToLastMessage = () => {
        const scrolledHeight = ref.current.scrollHeight - ref.current.scrollTop <= ref.current.clientHeight + 300
        if (scrolledHeight) setShowReturnToLastMessage(false)
        else setShowReturnToLastMessage(true)
    }

    return (
        <div className="chat__anchor" ref={anchorRef}>
            <div className="chat__body" onWheel={checkIfShowReturnToLastMessage} ref={ref}>
                    {messages && messages.map((message, index) =>
                        (
                            <div
                                key={message._id || Math.floor(Math.random() * 1000) + 1}
                                className={`chat__message ${currentUser && message.sender._id === currentUser._id && 'chat__receiver'}`}
                            >
                                <span className="chat__name">{message.sender.name}</span>

                                {!message?.audio ?
                                <div
                                    className='chat__messageText'
                                    ref={el => messagesRef.current[index] = el}
                                >
                                    {message.text.split('\n').map((line, index) =>
                                    <p key={index}>{line}</p>
                                    )}
                                </div> : 
                                <audio src={message.audio} controls ref={el => messagesRef.current[index] = el}></audio>}

                                <div className="chat__messageFooter">
                                    <span className="chat__timestamp">{message.timestamp}</span>
                                    <DoneAllIcon />
                                </div>
                            </div>
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