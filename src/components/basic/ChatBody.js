import { useRef, useState } from "react"
import { IconButton } from "@mui/material"
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import Message from "./Message"

const ChatBody = ({ messages, messagesRef, scrollToMessage, currentUser, anchorRef, theme }) => {

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
                        <Message
                            key={index}
                            message={message}
                            index={index}
                            currentUser={currentUser}
                            messagesRef={messagesRef}
                            theme={theme}
                        />)
                    }

                    {showReturnToLastMessage &&
                    <IconButton 
                        onClick={() => {scrollToMessage(messagesRef, messagesRef.current.length - 1); setShowReturnToLastMessage(false)}}
                        sx={{':hover': {backgroundColor: 'background.paper'}, backgroundColor: 'background.paper'}}
                    >
                        <ArrowDownwardIcon />
                    </IconButton>}

                </div>
            </div>
    )
}
 
export default ChatBody;