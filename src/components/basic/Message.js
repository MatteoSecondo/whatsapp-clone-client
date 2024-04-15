import { useEffect } from "react"
import axios from '../../axios.js'
import { Box } from "@mui/material"
import DoneAllIcon from '@mui/icons-material/DoneAll'

const Message = ({ message, index, currentUser, messagesRef, theme }) => {

    useEffect(() => {
        async function sendIsRead() {
            await axios.put('/messages/seen', {messageId : message._id},{headers: {accessToken: localStorage.getItem('accessToken')}})
        }

        if (!message.isRead && message.sender._id !== currentUser._id) sendIsRead()
    }, [])

    return (
        <Box
            key={message._id || Math.floor(Math.random() * 1000) + 1}
            className={`chat__message ${currentUser && message.sender._id === currentUser._id && 'chat__receiver'}`}
            sx={{backgroundColor: (currentUser && message.sender._id === currentUser._id) ? 'background.sended' : 'background.received'}}
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
            <audio src={message.audio} controls ref={el => messagesRef.current[index] = el}></audio>
            }

            <div className="chat__messageFooter">
                <span className="chat__timestamp">{message.timestamp}</span>
                {message.sender._id === currentUser._id && <DoneAllIcon sx={{color: message.isRead && (theme ? 'cyan' : '#00b4d8')}} />}
            </div>
        </Box>
    )
}
 
export default Message