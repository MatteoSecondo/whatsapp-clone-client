import { useState } from 'react'
import { Avatar, IconButton, Box, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import SearchIcon from '@mui/icons-material/Search'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import CloseIcon from '@mui/icons-material/Close'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined'

const ChatHeader = ({ showSearchInput, setShowSearchInput, closeSearchInput, searchString, searchMessage, disableButtons,
                    showPreviousMessage, showNextMessage, openChat, setOpenChat, currentUser, windowSize, currentMessageIndex, filteredMessagesRef }) => {

    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    return (
        <Box className="chat__header" sx={{borderColor: 'border.main'}}>
                {windowSize < 840 &&
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
                        <Box className="chat__searchContainer" sx={{backgroundColor: 'background.paper'}}>
                            <input type='text' placeholder='Search messages' value={searchString} onChange={searchMessage} />
                            {filteredMessagesRef.current.length - 1 > 0 && <p>{currentMessageIndex}/{filteredMessagesRef.current.length - 1}</p>}
                            <IconButton onClick={showPreviousMessage} disabled={disableButtons}>
                                <KeyboardArrowUpIcon />
                            </IconButton>
                            <IconButton onClick={showNextMessage} disabled={disableButtons}>
                                <KeyboardArrowDownIcon />
                            </IconButton>
                            <IconButton onClick={closeSearchInput}>
                                <CloseIcon />
                            </IconButton>

                        </Box>
                    </div>}

                    {!showSearchInput &&
                    <>
                        {windowSize > 350 &&
                            <IconButton onClick={() => setShowSearchInput(true)}>
                                <SearchIcon />
                            </IconButton>}
                        {windowSize > 310 &&
                            <IconButton>
                                <AttachFileIcon />
                            </IconButton>}
                        <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                            <MoreVertIcon />
                        </IconButton>

                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={() => setAnchorEl(null)}
                            MenuListProps={{
                            'aria-labelledby': 'basic-button',
                            }}
                        >

                            <MenuItem onClick={() => setAnchorEl(null)}>
                                <ListItemIcon>
                                    <AccountCircleOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText>Show user</ListItemText>
                            </MenuItem>

                            {windowSize < 350 &&
                            <MenuItem onClick={() => {setAnchorEl(null); setShowSearchInput(true)}}>
                                <ListItemIcon>
                                    <SearchIcon />
                                </ListItemIcon>
                                <ListItemText>Search message</ListItemText>
                            </MenuItem>}

                            {windowSize < 310 && 
                            <MenuItem onClick={() => setAnchorEl(null)}>
                                <ListItemIcon>
                                    <AttachFileIcon />
                                </ListItemIcon>
                                <ListItemText>Attach file</ListItemText>
                            </MenuItem>}

                            <MenuItem onClick={() => setAnchorEl(null)}>
                                <ListItemIcon>
                                    <BlockOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText>Block user</ListItemText>
                            </MenuItem>

                        </Menu>
                    </>
                    }
                </div>
         </Box>
    )
}
 
export default ChatHeader