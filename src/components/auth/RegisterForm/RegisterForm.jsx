function RegisterForm(){

    const handleOnSubmit = async event=>{
        
        event.preventDefault()
        const form = event.target

        const registerInfo = {
            name: form.name.value,
            username: form.username.value,
            email: form.email.value,
            password: form.password.value
        }

        /* console.log(registerInfo) */
    } //TODO: Add styles and handle API connection.

    return <>
        <form onSubmit={handleOnSubmit}>
            <label htmlFor="name">Nombre</label>
            <input type="text" name="name" placeholder="Nombre" required/>
            <label htmlFor="username"></label>
            <input type="text" name="username" placeholder="Nombre de usuario" required/>
            <label htmlFor="email"></label>
            <input type="email" name="email" placeholder="correo" required/>
            <label htmlFor="password" ></label>
            <input type="password" name="password" placeholder="password" required/>
            <label htmlFor="confirmPassword"></label>
            <input type="password" name="confirmPassword" placeholder="confirmar password" required/>
            <button type="submit">Registrar</button>
        </form>
    </>
}

export default RegisterForm;