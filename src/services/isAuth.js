import storeSession from "./storeSession";

function isAuth() {
   return !!storeSession.getCookie('auth')
}

export default isAuth;

/*
import storeSession from "./storeSession";
import jwt_decode from "jwt-decode";

function isAuth() {
   const token = storeSession.getCookie('auth');

   if (!token) return false;

   try {
      const decoded = jwt_decode(token);
      const currentTime = Math.floor(Date.now() / 1000);

      if (decoded.exp && decoded.exp > currentTime) {
         return true;
      } else {
         return false;
      }
   } catch (error) {
      return false;
   }
}

export default isAuth;
*/