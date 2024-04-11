import '../public/Blank.css'
import { Link, Box } from '@mui/material'

const Blank = ({ currentUser, toggleDrawer }) => {
    return (
        <Box className="blank" sx={{backgroundColor: 'background.paper'}}>
            <h1>Whatsapp Clone</h1>
            {currentUser ? <p>Click a chat to start</p> : <Link href="#" onClick={toggleDrawer(true)}>Login to start</Link>}
        </Box>
    )
}
 
export default Blank