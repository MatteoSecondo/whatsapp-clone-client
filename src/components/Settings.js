import'../public/Settings.css'
import { useEffect, useState } from 'react'
import { Tabs, Tab } from '@mui/material'
import ChatIcon from '@mui/icons-material/Chat'
import PaletteIcon from '@mui/icons-material/Palette'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Profile from './basic/Profile'
import ChatSettings from './basic/ChatSettings'
import CustomizationSettings from './basic/CustomizationSettings'

const Settings = ({ login, logOut, currentUser, isSmallScreen }) => {

    const [currentTabIndex, setCurrentTabIndex] = useState(isSmallScreen ? 5: 0)

    return (
        <div className="settings">

            {!isSmallScreen ?
                <div className='settings__tab'>
                    <Tabs value={currentTabIndex === 5 ? 0 : currentTabIndex} onChange={(e, tabIndex) => setCurrentTabIndex(tabIndex)} orientation='vertical'>
                        <Tab label='Chat' />
                        <Tab label='Customization' />
                        <Tab label='Profile' />
                    </Tabs>

                    {(currentTabIndex === 0 || currentTabIndex === 5) && <ChatSettings />}
                    {currentTabIndex === 1 && <CustomizationSettings />}
                    {currentTabIndex === 2 && <Profile login={login} logOut={logOut} currentUser={currentUser} />}
                </div> :
                <div className='settings__div'>
                    {currentTabIndex === 5 &&
                    <>
                        <h2>Settings</h2>
                        <div className='settings__option' onClick={() => setCurrentTabIndex(0)}>
                            <ChatIcon />
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
                    {currentTabIndex === 1 && <CustomizationSettings setCurrentTabIndex={setCurrentTabIndex} isSmallScreen={isSmallScreen} />}
                    {currentTabIndex === 2 && <Profile login={login} logOut={logOut} currentUser={currentUser} setCurrentTabIndex={setCurrentTabIndex} isSmallScreen={isSmallScreen} />}
                </div>
            }            

        </div>
    )
}
 
export default Settings