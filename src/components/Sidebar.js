import '../public/Sidebar.css'

import { IconButton, Avatar, Drawer } from '@mui/material'
import ChatIcon from '@mui/icons-material/Chat'
import DonutLargeIcon from '@mui/icons-material/DonutLarge'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close';

import { useEffect, useState } from 'react'
import axios from '../axios.js'
import SidebarChat from './SidebarChat'

const Sidebar = ({ login, logOut, dbUser, setOpenChat, searchString, setSearchString, openChat }) => {

    const [openDrawer, setOpenDrawer] = useState(false)
    const [searchChats, setSearchChats] = useState([])
    const [searchNewChats, setSearchNewChats] = useState([])

    useEffect(() => {
        if (searchString !== '') {
            async function searchDbUsers() {
                const dbUsers = await axios.get(`/users/${searchString}`)
    
                const temp1 = []
                const temp2 = []
                dbUsers.data.forEach((user) => {
                    let found = false
                    dbUser.user.chats.forEach((chat) => {
                        chat.participants.forEach(participant => {
                            if (participant._id === user._id && user._id !== dbUser.user._id) {
                                temp1.push(chat)
                                found = true
                                return
                            }
                        }) 
                    })
                    if (!found && user._id !== dbUser.user._id) temp2.push({participants: [user, dbUser.user], messages: [], _id: Math.floor(Math.random() * 1000) + 1})
                })
                setSearchChats(temp1)
                setSearchNewChats(temp2)
            }
            searchDbUsers()
        }
        else {
            setSearchChats([])
            setSearchNewChats([])
        }
    }, [searchString])

    const toggleDrawer = (boolean) => () => {
        setOpenDrawer(boolean);
    }

    return (
        <div className='sidebar'>

            <div className="sidebar__header">
                <Avatar src={dbUser && dbUser.user.picture} />
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    
                    <IconButton onClick={toggleDrawer(true)}>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <div className='sidebar__searchContainerLeft'>
                        <SearchIcon />
                        <input type='text' placeholder='Search or start new chat' value={searchString} onChange={(e) => setSearchString(e.target.value)} />
                    </div>
                    {searchString !== '' && <IconButton onClick={() => setSearchString('')}><CloseIcon /></IconButton>}
                </div>
            </div>

            <div className="sidebar__chats">
                {searchString === '' && dbUser &&
                    dbUser.user.chats.map(chat => (
                        <SidebarChat key={chat._id} chat={chat} setOpenChat={setOpenChat} dbUser={dbUser} openChat={openChat} />
                    ))
                }

                {searchString !== '' &&
                    <>
                        {searchChats.length > 0 && <h2 style={{textAlign: 'center', margin: '1rem 0'}}>Select a chat</h2>}
                        {searchChats.map(chat => (
                            <SidebarChat key={chat._id} chat={chat} setOpenChat={setOpenChat} dbUser={dbUser} openChat={openChat} />
                        ))}
                        {searchNewChats.length > 0 && <h2 style={{textAlign: 'center', margin: '1rem 0'}}>Start a new chat</h2>}
                        {searchNewChats.map(chat => (
                            <SidebarChat key={chat._id || Math.floor(Math.random() * 1000) + 1} chat={chat} setOpenChat={setOpenChat} isNewChat={true} dbUser={dbUser} openChat={openChat} />
                        ))}
                    </>
                }
            </div>

            {<Drawer open={openDrawer} onClose={toggleDrawer(false)}>
                <div style={{width: '30vw', textAlign: 'center', marginTop: '3rem'}}>
                    <h2>Whatsapp Clone Login</h2>
                    <br />
                    <br />
                    {dbUser ? (
                        <div>
                            <img src={dbUser.user.picture} alt="user image" />
                            <h3>User Logged in</h3>
                            <p>Name: {dbUser.user.name}</p>
                            <p>Email Address: {dbUser.user.email}</p>
                            <br />
                            <br />
                            <button onClick={logOut}>Log out</button>
                        </div>
                    ) : (
                        <button onClick={login}>Sign in with Google 🚀 </button>
                    )}
                </div>
            </Drawer>}

        </div>
    )
}
 
export default Sidebar