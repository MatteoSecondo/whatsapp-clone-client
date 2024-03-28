import { Avatar, IconButton } from '@mui/material'
import '../public/Chat.css'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import SearchIcon from '@mui/icons-material/Search'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon'
import MicIcon from '@mui/icons-material/Mic'
import SendIcon from '@mui/icons-material/Send';
import { useEffect, useState } from 'react'
import { useAudioRecorder } from 'react-audio-voice-recorder'
import io from 'socket.io-client'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

const Chat = ({ messages, setMessages }) => {

    const [input, setInput] = useState('')
    const [socket, setSocket] = useState(null)
    const [recordingColor, setRecordingColor] = useState('gray')
    const [showEmoticons, setShowEmoticons] = useState(false)
    const audioControls = useAudioRecorder()

    useEffect(() => {
        let temp = io('localhost:9000')

        // Ascolto dell'evento "new-message"
        temp.on('new-message', (message) => {
            setMessages([...messages, message])  
        });

        setSocket(temp)
        
        return () => {temp.disconnect(); setSocket(null)}
    }, [messages])

    useEffect(() => {
        if (!audioControls.recordingBlob) return;
    
        // recordingBlob will be present at this point after 'stopRecording' has been called
        sendMessage(new SubmitEvent('e'), audioControls.recordingBlob)
    }, [audioControls.recordingBlob])

    const sendMessage = async (e, blob = null) => {
        e.preventDefault();
        if (input === '' && !blob) return; 
        const message = {name: 'Demo user', message: input, timestamp: new Date(Date.now()).toUTCString(), received: true}

        if (blob) {
            const reader = new FileReader();
        
            reader.onload = function (event) {
                const base64String = event.target.result
                message.audio = base64String
                socket.emit('send-message', message)
            };
            
            reader.onerror = function (error) {
                console.log(error);
            };
            
            reader.readAsDataURL(blob);
        }
        else socket.emit('send-message', message)
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

    const searchMessage = () => {
        
    }

    return (
        <div className="chat">

            <div className="chat__header">
                <Avatar />
                <div className="chat__headerInfo">
                    <h3>Room name</h3>
                    <p>Last seen at ...</p>
                </div>

                <div className="chat__headerRight">
                    <IconButton onClick={searchMessage}>
                        <SearchIcon />
                    </IconButton>
                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            <div className="chat__body">
                {messages.map((message) =>
                    (
                        <p key={message._id || Math.floor(Math.random() * 1000) + 1} className={`chat__message ${message.received && 'chat__receiver'}`}>
                            <span className="chat__name">{message.name}</span>
                            {!message?.audio ? <span>{message.message}</span> : <audio src={message.audio} controls></audio>}
                            <span className="chat__timestamp">{message.timestamp}</span>
                        </p>
                    )
                )}
            </div>

            <div className="chat__footer">
                <IconButton onClick={toggleEmoticons}>
                    <InsertEmoticonIcon />
                </IconButton>
                <form>
                    <input
                        value={input}
                        type='text'
                        placeholder='Type a message'
                        onChange={(e) => setInput(e.target.value)}
                        onClick={() => setShowEmoticons(false)}  
                    />
                    <button type='submit' onClick={sendMessage}>
                        Send a message
                    </button>
                </form>
                {input === '' ? 
                <IconButton onClick={recordMessage} sx={{color: recordingColor}}>
                     <MicIcon />
                </IconButton> 
                :
                <IconButton onClick={sendMessage}>
                    <SendIcon />
                </IconButton>}
            </div>

            {showEmoticons &&
            <Picker
                data={data}
                onEmojiSelect={(emoticon) => setInput(input + emoticon.native)}
            />}

        </div>
    )
}
 
export default Chat