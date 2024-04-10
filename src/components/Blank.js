import '../public/Blank.css'
import { Link } from '@mui/material'

const Blank = ({ currentUser, toggleDrawer }) => {
    return (
        <div className="blank">
            <h1>Whatsapp Clone</h1>
            {currentUser ? <p>Click a chat to start</p> : <Link href="#" onClick={toggleDrawer(true)}>Login to start</Link>}
        </div>
    )
}
 
export default Blank