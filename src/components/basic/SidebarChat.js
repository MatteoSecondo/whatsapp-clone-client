import '../../public/SidebarChat.css'
import { useEffect, useState } from 'react'
import { Avatar } from '@mui/material'
import io from 'socket.io-client'

const SidebarChat = ({ chat, setOpenChat, isNewChat, dbUser, setDbUser, openChat }) => {

    const [ch, setCh] = useState(chat)

    useEffect(() => {

        const socket = io('localhost:9000')
        socket.emit('join', chat._id)

        socket.on('server-client', (message) => {
            setCh((prevCh) => {return {...prevCh, messages: [...prevCh.messages, message]}})
        })

        return () => socket.disconnect()
    }, [])

    useEffect(() => {
            const updatedChats = [...dbUser.chats]
            const existingChatIndex = updatedChats.findIndex(c => c._id === ch._id)

            if (existingChatIndex !== -1) {
                updatedChats[existingChatIndex] = ch
            } 
            else {
                if (ch._id > 1000) updatedChats.push(ch)
            }

            const updatedDbUser = {...dbUser, chats: updatedChats}

            setDbUser(updatedDbUser)

            if (openChat) {
                setOpenChat((prevOpenChat) => {
                    return {...prevOpenChat, messages: ch.messages}
                })
            }
    }, [ch])

    /*useEffect(() => {
        if (openChat && openChat._id === chat._id) {
    
            const updatedChats = [...dbUser.user.chats]
            const existingChatIndex = updatedChats.findIndex(c => c._id === openChat._id)

            if (existingChatIndex !== -1) {
                updatedChats[existingChatIndex] = openChat
            } 
            else {
                if (openChat._id > 1000) updatedChats.push(openChat)
            }

            const updatedDbUser = {
            ...dbUser,
            user: {
                ...dbUser.user,
                chats: updatedChats
            }}

            setDbUser(updatedDbUser)
        }
    }, [openChat])*/

    const setNewChat = () => {
        chat.new = true
        setOpenChat(chat)
    }

    return (
        <div className="sidebarChat" onClick={() => {isNewChat ? setNewChat() : setOpenChat(chat)}}>
            <Avatar src={ch.participants[0]._id !== dbUser._id ? ch.participants[0].picture : ch.participants[1].picture} />

            <div className="sidebarChat__info">
                <h2>{ch.participants[0]._id !== dbUser._id ? ch.participants[0].name : ch.participants[1].name}</h2>
                {ch.messages.length ? (<p>{ch.messages[ch.messages.length - 1].text || 'Audio'}</p>) : <p>Type a message</p>}
            </div>
        </div>
    )
}
 
export default SidebarChat