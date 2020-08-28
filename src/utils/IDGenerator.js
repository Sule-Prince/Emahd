function IDGenerator(amount = 20) {
  let count = Math.round(Math.random() * 10) + amount,
    randomKey = [],
    key = "",
    numPos = Math.ceil(Math.random() * 5);
  if (numPos === 1) numPos +=Math.ceil(Math.random() * 4);
  for (let i = 0; i < count; i++) {
    let alpha, charCode;
    if (Math.round((Math.random() * 10) % 2) === 0) {
      alpha =
        Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + 8;
      charCode = 96 + alpha;
    } else {
      alpha = Math.floor(Math.random() * 10);
      charCode = 65 + alpha;
    }

    randomKey.push(String.fromCharCode(charCode));
  }
  for (let i = numPos; i <= randomKey.length; i += numPos) {
    randomKey[i] = Math.round(Math.random() * 10);
  }
  key = randomKey.join("");
  return key;
}

 export default IDGenerator;