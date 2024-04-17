import './App.css'
import { useEffect, useState } from 'react'
import axios from './axios.js'
import { useGoogleLogin, googleLogout } from '@react-oauth/google'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { Drawer, Box, Backdrop, CircularProgress } from '@mui/material'
import Sidebar from './components/Sidebar.js'
import Chat from './components/Chat.js'
import Blank from './components/Blank.js'
import Settings from './components/Settings.js'

function App() {

  const [googleUser, setGoogleUser] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)
  const [openChat, setOpenChat] = useState(null)
  const [searchString, setSearchString] = useState('')
  const [openDrawer, setOpenDrawer] = useState(false)
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 840)
  const [theme, setTheme] = useState(localStorage.getItem('theme') === 'true' ? true : false)
  const [isLoading, setIsLoading] = useState(localStorage.getItem('accessToken') ? true : false)

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 840)
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    async function checkAuth() {
      const response = await axios.get('/users/auth', {headers: {accessToken: localStorage.getItem('accessToken')}})
      if (response.data.error) console.log(response.data.error)
      else {
        const fullCurrentUser = await axios.get('/users/populate', {headers: {accessToken: localStorage.getItem('accessToken')}})
        setCurrentUser(fullCurrentUser.data)
      }
    }
    
    checkAuth()
  }, [])

  useEffect(() => {
    async function findOrCreateUser(userData) {
      const response = await axios.post('/users/login', {
        googleId: userData.id,
        name: userData.name,
        email: userData.email,
        picture: userData.picture
      })
      localStorage.setItem('accessToken', response.data.token)
      const fullCurrentUser = await axios.get('/users/populate', {headers: {accessToken: localStorage.getItem('accessToken')}})
      setCurrentUser(fullCurrentUser.data)
    }

    if (googleUser) {
      axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${googleUser.access_token}`, {
        headers: {
          Authorization: `Bearer ${googleUser.access_token}`,
          Accept: 'application/json'
        }
      })
      .then((res) => {
        setIsLoading(true)
        findOrCreateUser(res.data)
      })
      .catch((err) => console.log(err))
      }
  }, [googleUser])

  useEffect(() => {
    if (currentUser) setIsLoading(false)
  }, [currentUser])

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setGoogleUser(codeResponse),
    onError: (error) => alert('Login Failed:', error)
  })

  const logOut = () => {
    googleLogout()
    setGoogleUser(null)
    setCurrentUser(null)
    localStorage.removeItem('accessToken')
  }

  const toggleDrawer = (boolean) => () => {
    setOpenDrawer(boolean)
  }

  const lightTheme = createTheme({
    palette: {
      mode: 'light',
      background: {
        default: '#dadbd3',
        paper: 'white',
        hover: '#e6e6e6',
        received: '#ffffff',
        sended: '#dcf8c6',
      },
      border: {
        main: 'lightgray',
      },
    },
  })

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      background: {
        default: '#222222',
        paper: '#2d2d2d',
        hover: '#262626',
        received: '#2d2d2d',
        sended: '#1D604E',
      },
      border: {
        main: 'black',
      },
    },
  })

  return (
    <ThemeProvider theme={theme ? darkTheme : lightTheme}>
      <Box className="app" sx={{backgroundColor: 'background.default', color: 'text.primary'}}>
        <Box className="app__body" sx={{backgroundColor: 'background.paper', color: 'text.primary'}}>

          <Sidebar
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            openChat={openChat}
            setOpenChat={setOpenChat}
            searchString={searchString} 
            setSearchString={setSearchString}
            toggleDrawer={toggleDrawer}
            isSmallScreen={isSmallScreen}
            theme={theme}
          />

          {openChat && currentUser ?
            <Chat
              openChat={openChat}
              setOpenChat={setOpenChat}
              setChatSearchString={setSearchString}
              setCurrentUser={setCurrentUser}
              currentUser={currentUser}
              isSmallScreen={isSmallScreen}
              theme={theme}
            /> :
            <Blank currentUser={currentUser} toggleDrawer={toggleDrawer} />
          }

          <Drawer
            open={openDrawer}
            onClose={toggleDrawer(false)}
            PaperProps={{ sx: {height: isSmallScreen ? 'unset' : '60%',
                              top: isSmallScreen ? '80px' : 'unset',
                              bottom: isSmallScreen ? '80px' : '10px',
                              left: isSmallScreen ? '10%' : '10px',
                              right: isSmallScreen ? '10%' : 'unset'} }}>
            <Settings login={login} logOut={logOut} currentUser={currentUser} isSmallScreen={isSmallScreen} theme={theme} setTheme={setTheme} toggleDrawer={toggleDrawer} />
          </Drawer>

          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading}
          >
            <CircularProgress color="inherit" />
            <p>Logging in</p>
          </Backdrop>
            
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default App
