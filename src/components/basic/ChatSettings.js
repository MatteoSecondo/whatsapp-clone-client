import { IconButton } from '@mui/material'
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
        </div>
    )
}
 
export default ChatSettings