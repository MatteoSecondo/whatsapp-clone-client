import'../public/Settings.css'
import { useState } from 'react'
import { Tabs, Tab, IconButton } from '@mui/material'
import ChatIcon from '@mui/icons-material/Chat'
import PaletteIcon from '@mui/icons-material/Palette'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import CloseIcon from '@mui/icons-material/Close'
import Profile from './basic/Profile'
import ChatSettings from './basic/ChatSettings'
import CustomizationSettings from './basic/CustomizationSettings'

const Settings = ({ login, logOut, currentUser, isSmallScreen, theme, setTheme, toggleDrawer }) => {

    const [currentTabIndex, setCurrentTabIndex] = useState(isSmallScreen ? 5: 0)

    return (
        <div className="settings">

            {!isSmallScreen ?
                <div className='settings__tab'>
                    <Tabs value={currentTabIndex === 5 ? 0 : currentTabIndex} onChange={(e, tabIndex) => setCurrentTabIndex(tabIndex)} orientation='vertical'>
                        <Tab label='Chat' icon={<ChatIcon />} />
                        <Tab label='Customization' icon={<PaletteIcon />} />
                        <Tab label='Profile' icon={<AccountCircleIcon />} />
                    </Tabs>

                    {(currentTabIndex === 0 || currentTabIndex === 5) && <ChatSettings />}
                    {currentTabIndex === 1 && <CustomizationSettings theme={theme} setTheme={setTheme} />}
                    {currentTabIndex === 2 && <Profile login={login} logOut={logOut} currentUser={currentUser} />}
                </div> :

                <div className='settings__div'>
                    {currentTabIndex === 5 &&
                    <>
                        <div className='settings__title'>
                            <h2>Settings</h2>
                            <IconButton onClick={toggleDrawer(false)}>
                                <CloseIcon />
                            </IconButton>
                        </div>
                        <div className='settings__option' onClick={() => setCurrentTabIndex(0)}>
                            <ChatIcon sx={{marginTop: '5px'}} />
                            <p>Chat</p>
                        </div>
                        <div className='settings__option' onClick={() => setCurrentTabIndex(1)}>
                            <PaletteIcon />
                            <p>Customization</p>
                        </div>
                        <div className='settings__option' onClick={() => setCurrentTabIndex(2)}>
                            <AccountCircleIcon />
                            <p>Profile</p>
                        </div>
                    </>
                    }
                    {currentTabIndex === 0 && <ChatSettings setCurrentTabIndex={setCurrentTabIndex} isSmallScreen={isSmallScreen} />}
                    {currentTabIndex === 1 && <CustomizationSettings setCurrentTabIndex={setCurrentTabIndex} isSmallScreen={isSmallScreen} theme={theme} setTheme={setTheme} />}
                    {currentTabIndex === 2 && <Profile login={login} logOut={logOut} currentUser={currentUser} setCurrentTabIndex={setCurrentTabIndex} isSmallScreen={isSmallScreen} />}
                </div>
            }            

        </div>
    )
}
 
export default Settings