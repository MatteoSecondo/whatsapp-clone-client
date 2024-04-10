import { Button, IconButton } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const Profile = ({ login, logOut, currentUser, setCurrentTabIndex, isSmallScreen }) => {
    return (
        <div className="settings__general">
            <div className='settings__header'>
                {isSmallScreen &&
                <IconButton onClick={() => setCurrentTabIndex(5)}>
                    <ArrowBackIcon />
                </IconButton>}
                <h2>Whatsapp Clone Login</h2>
            </div>

            {currentUser ? 
                <div>
                    <img src={currentUser.picture} alt="user" />
                    <h3>User Logged in</h3>
                    <p>Name: {currentUser.name}</p>
                    <p>Email Address: {currentUser.email}</p>
                    <br />
                    <Button variant='contained' size='small' endIcon={<LogoutIcon />} onClick={logOut}>Logout</Button>
                 </div> : 
                <Button variant='contained' size='small' onClick={login}>Sign in with Google 🚀</Button>
            }
        </div>
    )
}
 
export default Profile