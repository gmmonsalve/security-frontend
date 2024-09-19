import storeSession from "./storeSession";

function isAuth(){
   return !!storeSession.getCookie('auth')
}

export default isAuth;