import { useEffect, useState } from 'react'
import { Avatar } from '@mui/material'
import io from 'socket.io-client'
import CryptoJS from 'crypto-js'

const SidebarChat = ({ chat, setOpenChat, isNewChat, currentUser, setCurrentUser, openChat }) => {

    const [ch, setCh] = useState(chat)

    useEffect(() => {

        const socket = io('localhost:9000')
        socket.emit('join', chat._id)

        socket.on('server-client', (message) => {
            const decryptedData = decryptData(message, '3M/IwH6UeOARJ3m3Ap18rg==')
            setCh((prevCh) => {return {...prevCh, messages: [...prevCh.messages, decryptedData]}})
        })

        return () => socket.disconnect()
    }, [])

    useEffect(() => {
            const updatedChats = [...currentUser.chats]
            const existingChatIndex = updatedChats.findIndex(c => c._id === ch._id)

            if (existingChatIndex !== -1) {
                updatedChats[existingChatIndex] = ch
            } 
            else {
                if (ch._id > 1000) updatedChats.push(ch)
            }

            const updatedCurrentUser = {...currentUser, chats: updatedChats}

            setCurrentUser(updatedCurrentUser)

            if (openChat) {
                setOpenChat((prevOpenChat) => {
                    return {...prevOpenChat, messages: ch.messages}
                })
            }
    }, [ch])

    const setNewChat = () => {
        chat.new = true
        setOpenChat(ch)
    }

    const decryptData = (encryptedData, key) => {
        const bytes  = CryptoJS.AES.decrypt(encryptedData, key);
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }

    return (
        <div className="sidebarChat" onClick={() => isNewChat ? setNewChat() : setOpenChat(ch)}>
            <Avatar src={ch.participants[0]._id !== currentUser._id ? ch.participants[0].picture : ch.participants[1].picture} />

            <div className="sidebarChat__info">
                <h2>{ch.participants[0]._id !== currentUser._id ? ch.participants[0].name : ch.participants[1].name}</h2>
                {ch.messages.length ? (<p>{ch.messages[ch.messages.length - 1].text || 'Audio'}</p>) : <p>Type a message</p>}
            </div>
        </div>
    )
}
 
export default SidebarChat