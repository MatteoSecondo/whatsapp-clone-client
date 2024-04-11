import { IconButton, Button } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const ChatSettings = ({ setCurrentTabIndex, isSmallScreen }) => {
    return (
        <div className="settings__general">
            <div className='settings__header'>
                {isSmallScreen &&
                <IconButton onClick={() => setCurrentTabIndex(5)}>
                    <ArrowBackIcon />
                </IconButton>}
                <h2>Chat Settings</h2>
            </div>

            <Button variant='contained' color='error'>Delete all messages</Button>
            <p style={{margin: '10px'}}>Deletes all messages from chats and groups.</p>
            
            <Button variant='contained' color='error'>Delete all chats</Button>
            <p style={{margin: '10px'}}>Deletes all messages and chats from your history.</p>
        </div>
    )
}
 
export default ChatSettings