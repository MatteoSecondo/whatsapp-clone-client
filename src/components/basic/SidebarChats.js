import SidebarChat from './SidebarChat.js'

const SidebarChats = ({ dbUser, setDbUser, searchString, openChat, setOpenChat, searchChats, searchNewChats }) => {
    return (
        <div className="sidebar__chats">

            {searchString === '' && dbUser &&
                dbUser.chats.map(chat => (
                    <SidebarChat
                        key={chat._id}
                        chat={chat}
                        setOpenChat={setOpenChat}
                        dbUser={dbUser}
                        setDbUser={setDbUser}
                        openChat={openChat}
                    />
                ))
            }

            {searchString !== '' &&
                <>
                    {searchChats.length > 0 && <h2 style={{textAlign: 'center', margin: '1rem 0'}}>Select a chat</h2>}
                    {searchChats.map(chat => (
                        <SidebarChat
                            key={chat._id}
                            chat={chat}
                            setOpenChat={setOpenChat}
                            dbUser={dbUser}
                            setDbUser={setDbUser}
                            openChat={openChat}
                        />
                    ))}
                    {searchNewChats.length > 0 && <h2 style={{textAlign: 'center', margin: '1rem 0'}}>Start a new chat</h2>}
                    {searchNewChats.map(chat => (
                        <SidebarChat
                            key={chat._id || Math.floor(Math.random() * 1000) + 1}
                            chat={chat} 
                            setOpenChat={setOpenChat}
                            isNewChat={true} 
                            dbUser={dbUser}
                            setDbUser={setDbUser}
                            openChat={openChat} 
                        />
                    ))}
                </>
            }
            
        </div>
    )
}
 
export default SidebarChats