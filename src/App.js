import './App.css'
import Sidebar from './components/Sidebar.js'
import Chat from './components/Chat.js'
import { useEffect, useState } from 'react'
import axios from './axios.js'
import { useGoogleLogin, googleLogout } from '@react-oauth/google'

function App() {

  const [ user, setUser ] = useState(null)
  const [ profile, setProfile ] = useState(JSON.parse(localStorage.getItem('profile')) || null)
  const [currentChat, setCurrentChat] = useState({})
  const [messages, setMessages] = useState([])

  useEffect(() => {
    async function fecthMessages(){
      const response = await axios.get('/messages/sync')
      setMessages(response.data)
    }
    
    fecthMessages()
  }, [])

  useEffect(
    () => {
        if (user) {
            axios
                .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`,
                        Accept: 'application/json'
                    }
                })
                .then((res) => {
                    setProfile(res.data)
                    localStorage.setItem('profile', JSON.stringify(res.data))
                })
                .catch((err) => console.log(err))
        }
    },
    [ user ]
)

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => alert('Login Failed:', error)
  })

  const logOut = () => {
    googleLogout()
    setUser(null)
    setProfile(null)
    localStorage.removeItem('profile')
  }

  return (
    <div className="app">
      <div className="app__body">

        {/*<div>
              <h2>React Google Login</h2>
              <br />
              <br />
              {profile ? (
                  <div>
                      <img src={profile.picture} alt="user image" />
                      <h3>User Logged in</h3>
                      <p>Name: {profile.name}</p>
                      <p>Email Address: {profile.email}</p>
                      <br />
                      <br />
                      <button onClick={logOut}>Log out</button>
                  </div>
              ) : (
                  <button onClick={login}>Sign in with Google 🚀 </button>
              )}
              </div>*/}

        <Sidebar profile={profile} login={login} logOut={logOut}/>
        <Chat messages={messages} setMessages={setMessages} />
      </div>
    </div>
  )
}

export default App
