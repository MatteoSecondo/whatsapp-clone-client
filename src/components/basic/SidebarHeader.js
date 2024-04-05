import { Avatar, IconButton } from "@mui/material"
import ChatIcon from '@mui/icons-material/Chat'
import DonutLargeIcon from '@mui/icons-material/DonutLarge'
import MoreVertIcon from '@mui/icons-material/MoreVert'

const SidebarHeader = ({ dbUser, toggleDrawer }) => {
    return (
        <div className="sidebar__header">
            <Avatar src={dbUser && dbUser.picture} alt="user" />
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
    )
}
 
export default SidebarHeader