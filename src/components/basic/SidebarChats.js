import SidebarChat from './SidebarChat.js'

const SidebarChats = ({ currentUser, setCurrentUser, searchString, openChat, setOpenChat, searchChats, searchNewChats }) => {
    return (
        <div className="sidebarChats">

            {searchString === '' && currentUser &&
                currentUser.chats.map(chat => (
                    <SidebarChat
                        key={chat._id}
                        chat={chat}
                        setOpenChat={setOpenChat}
                        currentUser={currentUser}
                        setCurrentUser={setCurrentUser}
                        openChat={openChat}
                    />
                ))
            }

            {searchString !== '' &&
                <>
                    {searchChats.length > 0 && <h2>Select a chat</h2>}
                    {searchChats.map(chat => (
                        <SidebarChat
                            key={chat._id}
                            chat={chat}
                            setOpenChat={setOpenChat}
                            currentUser={currentUser}
                            setCurrentUser={setCurrentUser}
                            openChat={openChat}
                        />
                    ))}
                    {searchNewChats.length > 0 && <h2>Start a new chat</h2>}
                    {searchNewChats.map(chat => (
                        <SidebarChat
                            key={chat._id || Math.floor(Math.random() * 1000) + 1}
                            chat={chat} 
                            setOpenChat={setOpenChat}
                            isNewChat={true} 
                            currentUser={currentUser}
                            setCurrentUser={setCurrentUser}
                            openChat={openChat}
                        />
                    ))}
                </>
            }
            
        </div>
    )
}
 
export default SidebarChats