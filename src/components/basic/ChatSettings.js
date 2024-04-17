import { IconButton, Button, Switch } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const ChatSettings = ({ setCurrentTabIndex, windowSize, onPressEnter, setOnPressEnter }) => {
    return (
        <div className="settings__general">
            <div className='settings__header'>
                {windowSize < 840 &&
                <IconButton onClick={() => setCurrentTabIndex(5)}>
                    <ArrowBackIcon />
                </IconButton>}
                <h2>Chat Settings</h2>
            </div>

            <div className="settings__body">
                <div>
                    <p>Start a new paragraph when you press enter</p>
                    <Switch onClick={() => {setOnPressEnter(!onPressEnter); localStorage.setItem('onPressEnter', !onPressEnter)}} checked={onPressEnter}/>
                </div>

                <Button variant='contained' color='error'>Delete all messages</Button>
                <p>Deletes all messages from chats and groups.</p>
                
                <Button variant='contained' color='error'>Delete all chats</Button>
                <p>Deletes all messages and chats from your history.</p>
            </div>
        </div>
    )
}
 
export default ChatSettings