

function LoginForm(){

    const handleOnSubmit = async event=>{
        
        event.preventDefault()
        const form = event.target

        const loginInfo = {
            username: form.username.value,
            password: form.password.value
        }

        console.log(loginInfo)
    }//TODO: Add styles and handle API connection.
    return <>
            <form onSubmit={handleOnSubmit}>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username" placeholder="username"></input>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" placeholder="password"></input>
                <button type="submit">Login</button>
            </form>
    </>
}

export default LoginForm;