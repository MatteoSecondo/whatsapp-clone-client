import '../public/Sidebar.css'
import { useEffect, useState } from 'react'
import axios from '../axios.js'
import { Drawer } from '@mui/material'
import SidebarHeader from './basic/SidebarHeader.js';
import SidebarSearch from './basic/SidebarSearch.js';
import SidebarChats from './basic/SidebarChats.js';
import Login from './basic/Login.js';

const Sidebar = ({ login, logOut, dbUser, setDbUser, setOpenChat, searchString, setSearchString, openChat, toggleDrawer, openDrawer }) => {

    const [searchChats, setSearchChats] = useState([])
    const [searchNewChats, setSearchNewChats] = useState([])

    useEffect(() => {
        if (searchString !== '' && dbUser) {
            async function searchDbUsers() {
                const dbUsers = await axios.get(`/users/${searchString}`, {headers: {accessToken: localStorage.getItem('accessToken')}})
    
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

    return (
        <div className='sidebar'>

            <SidebarHeader dbUser={dbUser} toggleDrawer={toggleDrawer}/>

            <SidebarSearch searchString={searchString} setSearchString={setSearchString} />

            <SidebarChats
                dbUser={dbUser}
                setDbUser={setDbUser}
                searchString={searchString}
                openChat={openChat}
                setOpenChat={setOpenChat}
                searchChats={searchChats}
                searchNewChats={searchNewChats}
            />

            <Drawer open={openDrawer} onClose={toggleDrawer(false)}>
                <Login login={login} logOut={logOut} dbUser={dbUser} />
            </Drawer>

        </div>
    )
}
 
export default Sidebar