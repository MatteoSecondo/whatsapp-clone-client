import SidebarChat from './SidebarChat.js'

const SidebarChats = ({ currentUser, setCurrentUser, searchString, setOpenChat, searchChats, searchNewChats, theme }) => {
    return (
        <div className="sidebarChats">

            {searchString === '' && currentUser &&
                currentUser.chats
                .slice()
                .sort((a, b) => {
                    const timestampA = new Date(a.messages[a.messages.length - 1]?.timestamp || Date.now())
                    const timestampB = new Date(b.messages[b.messages.length - 1]?.timestamp || Date.now())
                    return timestampB - timestampA
                })
                .map(chat => (
                    <SidebarChat
                        key={chat._id}
                        chat={chat}
                        setOpenChat={setOpenChat}
                        currentUser={currentUser}
                        setCurrentUser={setCurrentUser}
                        theme={theme}
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
                            theme={theme}
                        />
                    ))}
                    {searchNewChats.length > 0 && <h2>Start a new chat</h2>}
                    {searchNewChats.map(chat => (
                        <SidebarChat
                            key={chat._id || Math.floor(Math.random() * 1000) + 1}
                            chat={chat} 
                            setOpenChat={setOpenChat} 
                            currentUser={currentUser}
                            setCurrentUser={setCurrentUser}
                            theme={theme}
                        />
                    ))}
                </>
            }
            
        </div>
    )
}
 
export default SidebarChats