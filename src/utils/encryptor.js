class Encryptor {
  encrypt = (data) => {
    let newData = [...data],
      dataLength = newData.length;
    newData.reverse();
    let key = Math.round(Math.random() * dataLength);
    key = key < 2 ? 2 : key;
    const encrypted = [];
    for (let i = 0; i < dataLength; i++) {
      encrypted[i] = newData[i].charCodeAt(0) + key;
    }

    encrypted.push(key);

    return encrypted.join("-");
  };

  decrypt = (data) => {
    let newData = data.split("-");

    const key = parseInt(newData.pop()),
      dataLength = newData.length;
    let decrypted = [];
    for (let i = 0; i < dataLength; i++) {
      let char = String.fromCharCode(newData[i] - key);
      decrypted.push(char);
    }
    decrypted.reverse();

    return decrypted.join("");
  };
}

const encryptor = new Encryptor();

export default encryptor;
