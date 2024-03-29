import { Avatar, IconButton } from '@mui/material'

import MoreVertIcon from '@mui/icons-material/MoreVert'
import SearchIcon from '@mui/icons-material/Search'
import AttachFileIcon from '@mui/icons-material/AttachFile'

const ChatHeader = ({ showSearchInput, setShowSearchInput, searchString, searchMessage, showPreviousMessage, showNextMessage }) => {
    return (
        <div className="chat__header">
                <Avatar />
                <div className="chat__headerInfo">
                    <h3>Room name</h3>
                    <p>Last seen at ...</p>
                </div>

                <div className="chat__headerRight">
                    {showSearchInput &&
                    <div className="sidebar__search">
                        <div className="sidebar__searchContainer">
                            <input type='text' placeholder='Search a message' value={searchString} onChange={(e) => searchMessage(e)}/>
                            <button onClick={showPreviousMessage}>prev</button>
                            <button onClick={showNextMessage}>next</button>
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