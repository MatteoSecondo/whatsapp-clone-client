import '../public/Chat.css'
import '../public/Sidebar.css'

import { useEffect, useRef, useState } from 'react'
import { useAudioRecorder } from 'react-audio-voice-recorder'
import io from 'socket.io-client'
import CryptoJS from 'crypto-js'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import ChatBody from './basic/ChatBody'
import ChatHeader from './basic/ChatHeader'
import ChatFooter from './basic/ChatFooter'
import axios from '../axios.js'

const Chat = ({ openChat, setOpenChat, setChatSearchString, setDbUser, dbUser }) => {

    const [socket, setSocket] = useState(null)
    const [input, setInput] = useState('')
    const [recordingColor, setRecordingColor] = useState('gray')
    const [showEmoticons, setShowEmoticons] = useState(false)

    const [searchString, setSearchString] = useState('')
    const [showSearchInput, setShowSearchInput] = useState(false)
    const [currentMessageIndex, setCurrentMessageIndex] = useState(null)
    const [disableButtons, setDisableButtons] = useState(false)
    const messagesRef = useRef([])
    const filteredMessagesRef = useRef([])

    const audioControls = useAudioRecorder()

    useEffect(() => {
        let temp = io('localhost:9000')

        temp.on('new-message', (message) => {
            setOpenChat((prevOpenChat) => {
                const decryptedData = decryptData(message, '3M/IwH6UeOARJ3m3Ap18rg==')
                const updatedMessages = [...prevOpenChat.messages, decryptedData]
                return {...prevOpenChat, messages: updatedMessages}
            })
        })

        setSocket(temp)
        
        return () => {temp.disconnect(); setSocket(null)}
    }, [])

    useEffect(() => {
        if (!audioControls.recordingBlob) return
        sendMessage(new SubmitEvent('e'), audioControls.recordingBlob)
    }, [audioControls.recordingBlob])

    useEffect(() => {
        if (messagesRef.current) {
            const searchResults = messagesRef.current
            searchResults.forEach(result => {
                if (result.textContent.toLowerCase().includes(searchString) && searchString !== '') {
                    result.classList.add('highlight')
                } else {
                    result.classList.remove('highlight')
                }
            })
            
            if (searchResults.filter(result => result.classList.contains('highlight')).length) setDisableButtons(false)
            else setDisableButtons(true)

            filteredMessagesRef.current = messagesRef.current.filter(ref => ref.classList.contains('highlight'))
            if (filteredMessagesRef.current.length) scrollToMessage(filteredMessagesRef, filteredMessagesRef.current.length - 1)
            setCurrentMessageIndex(filteredMessagesRef.current.length - 1)
        }
    }, [searchString])

    useEffect(() => { 
        if(messagesRef.current.length && !openChat.new) {
            scrollToMessage(messagesRef, openChat.messages.length -1)
            setCurrentMessageIndex(openChat.messages.length - 1)
        }
    }, [openChat.messages.length])

    const sendMessage = async (e, blob = null) => {
        e.preventDefault();
        if (input === '' && !blob) return; 

        let chatId
        const message = {sender: dbUser.user._id, timestamp: new Date(Date.now()).toUTCString()}

        if (openChat.new) {
            const newChat = await createNewChat(openChat.participants[0]._id)
            setOpenChat(newChat)
            
            const updatedUser = {...dbUser}
            updatedUser.user.chats.push(newChat)
            setDbUser(updatedUser)

            chatId = newChat._id
            delete openChat.new
        }
        else chatId = openChat._id

        setChatSearchString('')

        if (blob) {
            const reader = new FileReader();
        
            reader.onload = function (event) {
                const base64String = event.target.result
                message.audio = base64String
                const encryptedData = encryptData(message, '3M/IwH6UeOARJ3m3Ap18rg==')
                socket.emit('send-message', {message: encryptedData, chatId: chatId})
            };
            
            reader.onerror = function (error) {
                console.log(error);
            };
            
            reader.readAsDataURL(blob);
        }
        else {
            message.message = input
            const encryptedData = encryptData(message, '3M/IwH6UeOARJ3m3Ap18rg==')
            socket.emit('send-message', {message: encryptedData, chatId: chatId})
        }
        setShowEmoticons(false)
        setInput('')
    }

    const recordMessage = () => {
        if (audioControls.isRecording) {
            audioControls.stopRecording()
            setRecordingColor('gray')
        }
        else {
            audioControls.startRecording()
            setRecordingColor('red')
        }
    }

    const toggleEmoticons = () => {
        if (showEmoticons) setShowEmoticons(false)
        else setShowEmoticons(true)
    }

    const searchMessage = (event) => {
        setSearchString(event.target.value.toLowerCase());
    }

    const showPreviousMessage = () => {
        const previousIndex = currentMessageIndex - 1
        if (previousIndex >= 0) {
            scrollToMessage(filteredMessagesRef, previousIndex)
            setCurrentMessageIndex(previousIndex)
        }
        else scrollToMessage(filteredMessagesRef, currentMessageIndex)
    }

    const showNextMessage = () => {
        const nextIndex = currentMessageIndex + 1
        if (nextIndex < filteredMessagesRef.current.length) {
            scrollToMessage(filteredMessagesRef, nextIndex)
            setCurrentMessageIndex(nextIndex)
        }
        else scrollToMessage(filteredMessagesRef, currentMessageIndex)
    }

    const scrollToMessage = (ref, index) => {
        ref.current[index].scrollIntoView({ /*behavior: 'smooth', */block: 'start' })
    }

    const closeSearchInput = () => {
        filteredMessagesRef.current.forEach((message) => message.classList.remove('highlight'))
        setSearchString('')
        setShowSearchInput(false) 
    }

    const createNewChat = async (participantId) => {
        const response = await axios.get(`/chats/create/${participantId}`, {headers: {accessToken: localStorage.getItem('accessToken')}})
        return response.data
    }

    const encryptData = (data, key) => {
        return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
    }

    const decryptData = (encryptedData, key) => {
        const bytes  = CryptoJS.AES.decrypt(encryptedData, key);
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }

    return (
        <div className="chat">

            <ChatHeader
                showSearchInput={showSearchInput}
                setShowSearchInput={setShowSearchInput}
                closeSearchInput={closeSearchInput}
                searchString={searchString}
                searchMessage={searchMessage}
                disableButtons={disableButtons}
                showPreviousMessage={showPreviousMessage}
                showNextMessage={showNextMessage}
                openChat={openChat}
                dbUser={dbUser}
            />

            <ChatBody messages={openChat.messages} messagesRef={messagesRef} scrollToMessage={scrollToMessage} dbUser={dbUser}/>

            <ChatFooter 
                toggleEmoticons={toggleEmoticons}
                setShowEmoticons={setShowEmoticons}
                input={input}
                setInput={setInput}
                sendMessage={sendMessage}
                recordMessage={recordMessage}
                recordingColor={recordingColor}
            />

            {showEmoticons &&
            <Picker
                data={data}
                onEmojiSelect={(emoticon) => setInput(input + emoticon.native)}
            />}

        </div>
    )
}
 
export default Chat