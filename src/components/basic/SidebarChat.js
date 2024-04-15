import { useEffect } from 'react'
import io from 'socket.io-client'
import CryptoJS from 'crypto-js'
import { Avatar, Box } from '@mui/material'
import DoneAllIcon from '@mui/icons-material/DoneAll'


const SidebarChat = ({ chat, setOpenChat, currentUser, setCurrentUser, theme }) => {

    const lastMessage = chat.messages[chat.messages.length - 1]
    const badgeNumber = chat.messages.filter(m => !m.isRead && m.sender._id !== currentUser._id).length

    useEffect(() => {
        const socket = io('localhost:9000')
        socket.emit('join', chat._id)

        socket.on('server-client', (message) => {
            const decryptedData = decryptData(message, process.env.REACT_APP_ENCRYPTION_KEY)
            
            setCurrentUser((prevCurrentUser) => {
                return {
                    ...prevCurrentUser,
                    chats: prevCurrentUser.chats.map((ch) => {
                        if (ch._id === chat._id) {
                            return {
                                ...ch,
                                messages: [...ch.messages, decryptedData]
                            }
                        }
                        return ch
                    })
                }
            })
    
            setOpenChat((prevOpenChat) => {if (prevOpenChat) {return {...prevOpenChat, messages: [...prevOpenChat.messages, decryptedData]}}})
        })

        socket.on('message-read', ({value, messageId}) => {
            setCurrentUser((prevCurrentUser) => {
                return {
                    ...prevCurrentUser,
                    chats: prevCurrentUser.chats.map((chat) => {
                        if (chat._id === chat._id) {
                            return {
                                ...chat,
                                messages: chat.messages.map((mess) => {
                                if (mess._id === messageId) {
                                    return { ...mess, isRead: value }
                                }
                                return mess
                                })
                            }
                        }
                        return chat
                    })
                }
            })

            setOpenChat((prevOpenChat) => {
                if (prevOpenChat) return {
                    ...prevOpenChat,
                    messages: prevOpenChat.messages.map((m) => {
                        if (m._id === messageId) {
                            return {
                                ...m,
                                isRead: value
                            }
                        }
                        return m
                    })
                }
            })

        })

        return () => socket.disconnect()
    }, [])

    const decryptData = (encryptedData, key) => {
        const bytes  = CryptoJS.AES.decrypt(encryptedData, key);
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }

    return (
        <Box className="sidebarChat" onClick={() => setOpenChat(chat)} sx={{':hover': {backgroundColor: 'background.hover'}}}>
            <Avatar src={chat.participants[0]._id !== currentUser._id ? chat.participants[0].picture : chat.participants[1].picture} />

            <div className="sidebarChat__info">
                <div style={{display: 'flex', marginBottom: '8px'}}>
                    <h2>{chat.participants[0]._id !== currentUser._id ? chat.participants[0].name : chat.participants[1].name}</h2>
                    <p className='sidebarChat__infoTimestamp'>{lastMessage && lastMessage.timestamp}</p>
                </div>
   
                <div style={{display: 'flex'}}>
                    {lastMessage && lastMessage.sender._id === currentUser._id &&
                        <DoneAllIcon sx={{color: lastMessage.isRead && (theme ? 'cyan' : '#00b4d8')}} />
                    }
                    {chat.messages.length ? (<p className='sidebarChat__infoText'>{lastMessage && (lastMessage.text || 'Audio')}</p>) : <p>Type a message</p>}
                    {badgeNumber > 0 && <p className='sidebarChat__infoBadge'>{badgeNumber}</p>}
                </div>
            </div>
        </Box>
    )
}
 
export default SidebarChat