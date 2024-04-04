const Login = ({ login, logOut, dbUser}) => {
    return (
        <div style={{width: '30vw', textAlign: 'center', marginTop: '3rem'}}>
            <h2>Whatsapp Clone Login</h2>
            <br />
            <br />
            {dbUser ? (
                <div>
                    <img src={dbUser.user.picture} alt="user" />
                    <h3>User Logged in</h3>
                    <p>Name: {dbUser.user.name}</p>
                    <p>Email Address: {dbUser.user.email}</p>
                    <br />
                    <br />
                    <button onClick={logOut}>Log out</button>
                </div>
            ) : (
                <button onClick={login}>Sign in with Google 🚀 </button>
            )}
        </div>
    )
}
 
export default Login