import { Avatar, useScrollTrigger } from '@mui/material'
import '../public/SidebarChat.css'
import { useEffect, useState } from 'react'

const SidebarChat = ({ chat, setOpenChat, isNewChat, dbUser, openChat }) => {

    const [updatedChat, setUpdatedChat] = useState(chat)

    useEffect(() => {
        if (openChat && openChat._id === updatedChat._id) setUpdatedChat(openChat)
    }, [openChat])

    const setNewChat = () => {
        chat.new = true
        setOpenChat(updatedChat)
    }

    return (
        <div className="sidebarChat" onClick={() => {isNewChat ? setNewChat() : setOpenChat(updatedChat)}}>
            <Avatar src={updatedChat.participants[0]._id !== dbUser.user._id ? updatedChat.participants[0].picture : updatedChat.participants[1].picture} />
            <div className="sidebarChat__info">
                <h2>{updatedChat.participants[0]._id !== dbUser.user._id ? updatedChat.participants[0].name : updatedChat.participants[1].name}</h2>
                {updatedChat.messages.length ? (<p>{updatedChat.messages[updatedChat.messages.length - 1].message || 'Audio'}</p>) : <p>Type a message</p>}
            </div>
        </div>
    )
}
 
export default SidebarChat