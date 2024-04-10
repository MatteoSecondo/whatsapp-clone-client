import { Avatar, IconButton } from '@mui/material'

import MoreVertIcon from '@mui/icons-material/MoreVert'
import SearchIcon from '@mui/icons-material/Search'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import CloseIcon from '@mui/icons-material/Close'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const ChatHeader = ({ showSearchInput, setShowSearchInput, closeSearchInput, searchString,searchMessage, disableButtons,
                    showPreviousMessage, showNextMessage, openChat, setOpenChat, currentUser, isSmallScreen }) => {
    return (
        <div className="chat__header">
                {isSmallScreen &&
                <IconButton onClick={() => setOpenChat(null)}>
                    <ArrowBackIcon />
                </IconButton>}
                <Avatar src={currentUser && openChat.participants[0]._id !== currentUser._id ? openChat.participants[0].picture : openChat.participants[1].picture} />
                <div className="chat__headerInfo">
                    <h3>{currentUser && openChat.participants[0]._id !== currentUser._id ? openChat.participants[0].name : openChat.participants[1].name}</h3>
                    <p>Last seen at ...</p>
                </div>

                <div className="chat__headerRight">
                    {showSearchInput &&
                    <div className="chat__search">
                        <div className="chat__searchContainer">
                            <input type='text' placeholder='Search messages' value={searchString} onChange={searchMessage} />
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
                    {!showSearchInput &&
                    <>
                        <IconButton onClick={() => setShowSearchInput(true)}>
                            <SearchIcon />
                        </IconButton>
                        <IconButton>
                            <AttachFileIcon />
                        </IconButton>
                        <IconButton>
                            <MoreVertIcon />
                        </IconButton>
                    </>
                    }
                </div>
            </div>
    );
}
 
export default ChatHeader;