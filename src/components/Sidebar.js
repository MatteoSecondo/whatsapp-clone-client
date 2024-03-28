import '../public/Sidebar.css'
import { IconButton, Avatar } from '@mui/material'
import ChatIcon from '@mui/icons-material/Chat'
import DonutLargeIcon from '@mui/icons-material/DonutLarge'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import SearchIcon from '@mui/icons-material/Search'
import SidebarChat from './SidebarChat'
import Drawer from '@mui/material/Drawer'
import { useEffect, useState } from 'react'
import axios from '../axios.js'

const Sidebar = ({ profile, login, logOut }) => {

    const [chats, setChats] = useState([])
    const [openDrawer, setOpenDrawer] = useState(false);

    useEffect(() => {
        async function fecthChats(){
            //const response = await axios.get('/chats')
            //setChats(response.data)
        }
          
        fecthChats()
    }, [])

    const toggleDrawer = (boolean) => () => {
        setOpenDrawer(boolean);
    };

    return (
        <div className='sidebar'>
            <div className="sidebar__header">
                <Avatar src='https://avatars.githubusercontent.com/u/127615033?v=4' />
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
                    <SearchIcon />
                    <input type='text' placeholder='Search or start new chat'/>
                </div>
            </div>
            <div className="sidebar__chats">
                <SidebarChat />
                <SidebarChat />
                <SidebarChat />
                <SidebarChat />
                <SidebarChat />
                <SidebarChat />
            </div>


            {<Drawer open={openDrawer} onClose={toggleDrawer(false)}>
                <div style={{width: '30vw', textAlign: 'center', marginTop: '3rem'}}>
                    <h2>Whatsapp Clone Login</h2>
                    <br />
                    <br />
                    {profile ? (
                        <div>
                            <img src={profile.picture} alt="user image" />
                            <h3>User Logged in</h3>
                            <p>Name: {profile.name}</p>
                            <p>Email Address: {profile.email}</p>
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