import { useEffect, useState } from "react"
import axios from '../../axios.js'
import io from 'socket.io-client'
import { Box } from "@mui/material"
import DoneAllIcon from '@mui/icons-material/DoneAll'

const Message = ({ message, index, currentUser, setCurrentUser, messagesRef, openChatId, theme }) => {

    const [isRead, setIsRead] = useState(message.isRead)

    useEffect(() => {
        async function isRead() {
            await axios.get(`/messages/${message._id}`, {headers: {accessToken: localStorage.getItem('accessToken')}})
        }

        if (!message.isRead && message.sender._id === currentUser._id) {
            const socket = io('localhost:9000')

            socket.on('message-read', (value) => {

                setIsRead(value)

                setCurrentUser(() => {return {
                    ...currentUser,
                    chats: currentUser.chats.map((chat) => {
                        if (chat._id === openChatId) {
                            return {
                                ...chat,
                                messages: chat.messages.map((mess) => {
                                if (mess._id === message._id) {
                                    return { ...mess, isRead: value }
                                }
                                return mess
                                }),
                            }
                        }
                        return chat
                    }),
                }})

                socket.disconnect()
            })
        }
        else if (!message.isRead && message.sender._id !== currentUser._id) {
            isRead()
        }
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
                {message.sender._id === currentUser._id && <DoneAllIcon sx={{color: isRead && (theme ? 'cyan' : '#00b4d8')}} />}
            </div>
        </Box>
    )
}
 
export default Message