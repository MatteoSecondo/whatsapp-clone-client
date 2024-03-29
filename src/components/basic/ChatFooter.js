import { IconButton } from '@mui/material'

import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon'
import MicIcon from '@mui/icons-material/Mic'
import SendIcon from '@mui/icons-material/Send'


const ChatFooter = ({ setShowEmoticons, toggleEmoticons, input, setInput, sendMessage, recordMessage, recordingColor }) => {
    return (
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
    );
}
 
export default ChatFooter;