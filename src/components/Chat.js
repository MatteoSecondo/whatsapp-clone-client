import '../public/Chat.css'
import { useEffect, useRef, useState } from 'react'
import { useAudioRecorder } from 'react-audio-voice-recorder'
import axios from '../axios.js'
import CryptoJS from 'crypto-js'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import ChatBody from './basic/ChatBody'
import ChatHeader from './basic/ChatHeader'
import ChatFooter from './basic/ChatFooter'

const Chat = ({ openChat, setOpenChat, setChatSearchString, setCurrentUser, currentUser, windowSize, theme, onPressEnter }) => {

    const [input, setInput] = useState('')
    const [isTyping, setIsTyping] = useState(input === '' ? false : true)
    const [recordingColor, setRecordingColor] = useState(null)
    const [showEmoticons, setShowEmoticons] = useState(false)

    const [searchString, setSearchString] = useState('')
    const [showSearchInput, setShowSearchInput] = useState(false)
    const [currentMessageIndex, setCurrentMessageIndex] = useState(null)
    const [disableButtons, setDisableButtons] = useState(false)
    const messagesRef = useRef([])
    const filteredMessagesRef = useRef([])

    const anchorRef = useRef()
    const footerRef = useRef()

    const audioControls = useAudioRecorder()

    useEffect(() => {
        if (!audioControls.recordingBlob) return
        sendMessage(new SubmitEvent('e'), audioControls.recordingBlob)
    }, [audioControls.recordingBlob])

    useEffect(() => {
        if (messagesRef.current) {
            const searchResults = messagesRef.current
            searchResults.forEach(result => {
                if (result && result.textContent.toLowerCase().includes(searchString) && searchString !== '') {
                    result.classList.add('highlight')
                } else if (result && !result.textContent.toLowerCase().includes(searchString) && searchString !== '' || searchString === '') {
                    result.classList.remove('highlight')
                }
            })
            
            if (searchResults.filter(result => result && result.classList.contains('highlight')).length) setDisableButtons(false)
            else setDisableButtons(true)

            filteredMessagesRef.current = messagesRef.current.filter(ref => ref && ref.classList.contains('highlight'))
            if (filteredMessagesRef.current.length) scrollToMessage(filteredMessagesRef, filteredMessagesRef.current.length - 1)
            setCurrentMessageIndex(filteredMessagesRef.current.length - 1)
        }
    }, [searchString])

    useEffect(() => { 
        closeSearchInput()
        
        if(messagesRef.current.length && !openChat.new && !openChat.new) {
            scrollToMessage(messagesRef, openChat.messages.length -1)
            setCurrentMessageIndex(openChat.messages.length - 1)
        }
    }, [openChat])

    useEffect(() => { 
        if (input === '') setIsTyping(false)
        else setIsTyping(true)
    }, [input])

    useEffect(() => { 
        if (!isTyping) openChat.socket.emit('isTyping c-s', { isTyping: false, chatId: openChat._id })
        else openChat.socket.emit('isTyping c-s', { isTyping: true, chatId: openChat._id })
    }, [isTyping])

    const sendMessage = async (e, blob = null) => {
        e.preventDefault()
        setInput('')
        setShowEmoticons(false)

        if ((input === '' || /^[\s\n\t]*$/.test(input)) && !blob) return

        let tempInput = input.trim()
        tempInput = tempInput.replace(/^\s+|\s+$/g, '')
    
        let chatId
        const message = {sender: currentUser._id, timestamp: new Date(Date.now()).toUTCString()}

        if (openChat.new) {
            messagesRef.current = []
            const newChat = await createNewChat(openChat.participants[0]._id)
            setOpenChat(newChat)
            
            const updatedUser = {...currentUser}
            updatedUser.chats.push(newChat)
            setCurrentUser(updatedUser)

            chatId = newChat._id
        }
        else chatId = openChat._id

        message.chat = chatId

        setChatSearchString('')

        if (blob) {
            const reader = new FileReader();
        
            reader.onload = function (event) {
                const base64String = event.target.result
                message.audio = base64String
                const encryptedData = encryptData(message, process.env.REACT_APP_ENCRYPTION_KEY)
                openChat.socket.emit('client-server', encryptedData)
            }
            
            reader.onerror = function (error) {
                console.log(error)
            }
            
            reader.readAsDataURL(blob)
        }
        else {
            message.text = tempInput
            const encryptedData = encryptData(message, process.env.REACT_APP_ENCRYPTION_KEY)
            openChat.socket.emit('client-server', encryptedData)
        }

        anchorRef.current.style.height = 'calc(100% - 40px - 62px - 3rem)'
    }

    const recordMessage = () => {
        if (audioControls.isRecording) {
            audioControls.stopRecording()
            setRecordingColor(null)
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
        ref.current[index].scrollIntoView({ block: 'start' })
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

    const handleKeyDown = (event) => {
        if (event.key === 'Escape') setOpenChat(null)
    }

    function updateHeight() {
        anchorRef.current.style.height = 'calc(100% - 62px - 3rem - ' + footerRef.current.clientHeight + 'px)'
    }

    return (
        <div className="chat" style={{display: windowSize < 840 ? (openChat ? 'flex' : 'none') : 'flex'}} onKeyDown={handleKeyDown} tabIndex={0}>

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
                setOpenChat={setOpenChat}
                currentUser={currentUser}
                windowSize={windowSize}
                currentMessageIndex={currentMessageIndex}
                filteredMessagesRef={filteredMessagesRef}
            />

            <ChatBody
                messages={openChat.messages}
                messagesRef={messagesRef}
                scrollToMessage={scrollToMessage}
                currentUser={currentUser}
                anchorRef={anchorRef}
                theme={theme}
            />

            <ChatFooter 
                toggleEmoticons={toggleEmoticons}
                setShowEmoticons={setShowEmoticons}
                input={input}
                setInput={setInput}
                sendMessage={sendMessage}
                recordMessage={recordMessage}
                recordingColor={recordingColor}
                footerRef={footerRef}
                updateHeight={updateHeight}
                onPressEnter={onPressEnter}
            />

            {showEmoticons &&
                <div className='chat__picker'>
                    <Picker
                        data={data}
                        onEmojiSelect={(emoticon) => setInput(input + emoticon.native)}
                        previewPosition='none'
                        theme={theme ? 'dark' : 'light'}
                    />
                </div>
            }

        </div>
    )
}
 
export default Chat