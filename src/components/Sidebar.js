import '../public/Sidebar.css'
import { useEffect, useState } from 'react'
import axios from '../axios.js'
import SidebarHeader from './basic/SidebarHeader.js';
import SidebarSearch from './basic/SidebarSearch.js';
import SidebarChats from './basic/SidebarChats.js';

const Sidebar = ({ dbUser, setDbUser, openChat, setOpenChat, searchString, setSearchString, toggleDrawer }) => {

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
                    dbUser.chats.forEach((chat) => {
                        chat.participants.forEach(participant => {
                            if (participant._id === user._id && user._id !== dbUser.user._id) {
                                temp1.push(chat)
                                found = true
                                return
                            }
                        }) 
                    })
                    if (!found && user._id !== dbUser._id) temp2.push({participants: [user, dbUser], messages: [], _id: Math.floor(Math.random() * 1000) + 1})
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

        </div>
    )
}
 
export default Sidebar