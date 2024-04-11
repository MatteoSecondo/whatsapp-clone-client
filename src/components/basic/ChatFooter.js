import { IconButton, TextareaAutosize, Box } from '@mui/material'
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon'
import MicIcon from '@mui/icons-material/Mic'
import SendIcon from '@mui/icons-material/Send'


const ChatFooter = ({ setShowEmoticons, toggleEmoticons, input, setInput, sendMessage, recordMessage, recordingColor, footerRef, updateHeight }) => {
    return (
        <Box className="chat__footer" sx={{borderColor: 'border.main'}}>
                <IconButton onClick={toggleEmoticons}>
                    <InsertEmoticonIcon />
                </IconButton>
                <form>
                    <TextareaAutosize
                        value={input}
                        placeholder='Type a message'
                        onChange={(e) => setInput(e.target.value)}
                        onClick={() => setShowEmoticons(false)}
                        onInput={updateHeight}
                        ref={footerRef}
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
            </Box>
    );
}
 
export default ChatFooter;