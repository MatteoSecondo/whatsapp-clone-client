import '../public/Sidebar.css'
import '../public/SidebarChats.css'
import { useEffect, useState } from 'react'
import axios from '../axios.js'
import { Box } from '@mui/material'
import SidebarHeader from './basic/SidebarHeader.js';
import SidebarSearch from './basic/SidebarSearch.js';
import SidebarChats from './basic/SidebarChats.js';

const Sidebar = ({ currentUser, setCurrentUser, openChat, setOpenChat, searchString, setSearchString, toggleDrawer, windowSize, theme }) => {

    const [searchChats, setSearchChats] = useState([])
    const [searchNewChats, setSearchNewChats] = useState([])

    useEffect(() => {
        async function searchDbUsers() {
            const dbUsers = await axios.get(`/users/${searchString}`, {headers: {accessToken: localStorage.getItem('accessToken')}})

            const temp1 = []
            const temp2 = []
            dbUsers.data.forEach((user) => {
                let found = false
                currentUser.chats.forEach((chat) => {
                    chat.participants.forEach(participant => {
                        if (participant._id === user._id && user._id !== currentUser._id) {
                            temp1.push(chat)
                            found = true
                            return
                        }
                    }) 
                })
                if (!found && user._id !== currentUser._id) temp2.push({new: true, participants: [user, currentUser], messages: [], _id: Math.floor(Math.random() * 1000) + 1})
            })
            setSearchChats(temp1)
            setSearchNewChats(temp2)
        }

        if (searchString !== '' && !searchString.startsWith(' ') && currentUser) {
            searchDbUsers()
        }
        else {
            setSearchChats([])
            setSearchNewChats([])
        }
    }, [searchString])

    return (
        <Box className='sidebar' sx={{backgroundColor: 'background.paper', borderColor: 'border.main'}} style={{display: (windowSize < 840 && openChat) ? 'none' : 'flex'}}>

            <SidebarHeader currentUser={currentUser} toggleDrawer={toggleDrawer}/>

            <SidebarSearch searchString={searchString} setSearchString={setSearchString} />

            <SidebarChats
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                searchString={searchString}
                setOpenChat={setOpenChat}
                searchChats={searchChats}
                searchNewChats={searchNewChats}
                theme={theme}
            />

        </Box>
    )
}
 
export default Sidebar