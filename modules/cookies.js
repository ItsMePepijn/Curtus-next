import { setCookie, getCookie, hasCookie } from 'cookies-next'

export class Settings{
  constructor(isEnabled = false, isDelayed = false, delayTime = 0){
    this.isEnabled = isEnabled;
    this.isDelayed = isDelayed;
    this.delayTime = delayTime;
  }
  
  rules(){
    return {path: "/", maxAge: 1 * 60 * 60 * 24 * 365, sameSite: true};  
  }
}

export function get(cookie){
  if(cookie == "redirectSettings"){

    if(typeof window == 'undefined') return new Settings();

    else{
      if(hasCookie(cookie)) return JSON.parse(getCookie(cookie));

      else{
        const cookies = new Settings();
        setCookie(cookie, cookies, cookies.rules());
        return cookies;
      }
    }

  }
}