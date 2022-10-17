
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