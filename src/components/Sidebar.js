import '../public/Sidebar.css'
import '../public/SidebarChats.css'
import { useEffect, useState } from 'react'
import axios from '../axios.js'
import SidebarHeader from './basic/SidebarHeader.js';
import SidebarSearch from './basic/SidebarSearch.js';
import SidebarChats from './basic/SidebarChats.js';

const Sidebar = ({ currentUser, setCurrentUser, openChat, setOpenChat, searchString, setSearchString, toggleDrawer, isSmallScreen }) => {

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
                if (!found && user._id !== currentUser._id) temp2.push({participants: [user, currentUser], messages: [], _id: Math.floor(Math.random() * 1000) + 1})
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
        <div className='sidebar' style={{display: (isSmallScreen && openChat) ? 'none' : 'flex'}}>

            <SidebarHeader currentUser={currentUser} toggleDrawer={toggleDrawer}/>

            <SidebarSearch searchString={searchString} setSearchString={setSearchString} />

            <SidebarChats
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                searchString={searchString}
                openChat={openChat}
                setOpenChat={setOpenChat}
                searchChats={searchChats}
                searchNewChats={searchNewChats}
            />

        </div>
    )
}
 
export default Sidebar