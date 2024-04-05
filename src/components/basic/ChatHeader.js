import { Avatar, IconButton } from '@mui/material'

import MoreVertIcon from '@mui/icons-material/MoreVert'
import SearchIcon from '@mui/icons-material/Search'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import CloseIcon from '@mui/icons-material/Close';

const ChatHeader = ({ showSearchInput, setShowSearchInput, closeSearchInput, searchString, searchMessage, disableButtons, showPreviousMessage, showNextMessage, openChat, dbUser }) => {
    return (
        <div className="chat__header">
                <Avatar src={openChat.participants[0]._id !== dbUser._id ? openChat.participants[0].picture : openChat.participants[1].picture} />
                <div className="chat__headerInfo">
                    <h3>{openChat.participants[0]._id !== dbUser._id ? openChat.participants[0].name : openChat.participants[1].name}</h3>
                    <p>Last seen at ...</p>
                </div>

                <div className="chat__headerRight">
                    {showSearchInput &&
                    <div className="sidebar__search">
                        <div className="sidebar__searchContainer">
                            <input type='text' placeholder='Search messages' value={searchString} onChange={(e) => searchMessage(e)} className='chat__search' />
                            <IconButton onClick={showPreviousMessage} disabled={disableButtons}>
                                <KeyboardArrowUpIcon />
                            </IconButton>
                            <IconButton onClick={showNextMessage} disabled={disableButtons}>
                                <KeyboardArrowDownIcon />
                            </IconButton>
                            <IconButton onClick={closeSearchInput}>
                                <CloseIcon />
                            </IconButton>

                        </div>
                    </div>}
                    <IconButton onClick={() => setShowSearchInput(true)}>
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
    );
}
 
export default ChatHeader;