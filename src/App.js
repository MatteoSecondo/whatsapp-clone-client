import './App.css'
import Sidebar from './components/Sidebar.js'
import Chat from './components/Chat.js'
import { useEffect, useState } from 'react'
import axios from './axios.js'
import { useGoogleLogin, googleLogout } from '@react-oauth/google'
import Blank from './components/Blank.js'

function App() {

  const [ user, setUser ] = useState(null)
  const [ dbUser, setDbUser ] = useState(null)
  const [openChat, setOpenChat] = useState(null)
  const [searchString, setSearchString] = useState('')

  useEffect(() => {
    async function checkAuth() {
      const response = await axios.get('/users/auth', {headers: {accessToken: localStorage.getItem('accessToken')}});
      if (response.data.error) console.log(response.data.error)
      else {
        const fullDbUser = await axios.get('/users/populate', {headers: {accessToken: localStorage.getItem('accessToken')}})
        setDbUser(fullDbUser.data)
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
      const fullDbUser = await axios.get('/users/populate', {headers: {accessToken: localStorage.getItem('accessToken')}})
      setDbUser(fullDbUser.data)
      }

      if (user) {
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: 'application/json'
          }
        })
        .then((res) => {
          findOrCreateUser(res.data)
        })
        .catch((err) => console.log(err))
      }
    }, [user])

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => alert('Login Failed:', error)
  })

  const logOut = () => {
    googleLogout()
    setUser(null)
    setDbUser(null)
    localStorage.removeItem('accessToken')
  }

  return (
    <div className="app">
      <div className="app__body">
        <Sidebar login={login} logOut={logOut} dbUser={dbUser} setOpenChat={setOpenChat} searchString={searchString} setSearchString={setSearchString} openChat={openChat} />
        {openChat ?
          <Chat openChat={openChat} setOpenChat={setOpenChat} setChatSearchString={setSearchString} setDbUser={setDbUser} dbUser={dbUser} /> :
          <Blank />
        }
          
      </div>
    </div>
  )
}

export default App
