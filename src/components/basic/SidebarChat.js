import '../../public/SidebarChat.css'
import { useEffect } from 'react'
import { Avatar } from '@mui/material'

const SidebarChat = ({ chat, setOpenChat, isNewChat, dbUser, setDbUser, openChat }) => {

    useEffect(() => {
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
    }, [openChat])

    const setNewChat = () => {
        chat.new = true
        setOpenChat(chat)
    }

    return (
        <div className="sidebarChat" onClick={() => {isNewChat ? setNewChat() : setOpenChat(chat)}}>
            <Avatar src={chat.participants[0]._id !== dbUser.user._id ? chat.participants[0].picture : chat.participants[1].picture} />
            {console.log(chat)}
            <div className="sidebarChat__info">
                <h2>{chat.participants[0]._id !== dbUser.user._id ? chat.participants[0].name : chat.participants[1].name}</h2>
                {chat.messages.length ? (<p>{chat.messages[chat.messages.length - 1].message || 'Audio'}</p>) : <p>Type a message</p>}
            </div>
        </div>
    )
}
 
export default SidebarChat