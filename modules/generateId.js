export default function generateId(length) {
  const string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let ID = "";

  for(let i = 0; i < length; i++){
    ID += string[(Math.floor(Math.random() * string.length))];
  }
  
  return ID;
}


