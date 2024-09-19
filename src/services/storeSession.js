import Cookies from 'js-cookie';

const storeSession = {
  setCookie: (name, value, options) => {
    Cookies.set(name, value, options);
  },
  getCookie: (name) => {
    return Cookies.get(name);
  },
  removeCookie: (name) => {
    Cookies.remove(name);
  }
}

export default storeSession;