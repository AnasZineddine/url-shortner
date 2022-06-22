const shortUrlGenerator = (counter) => {
  const alphaNum = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let hash = '';
  let n = counter;

  while (n > 0) {
    hash += alphaNum[n % 62];
    n = Math.floor(n / 62);
  }
  const oneRandomCharacter = alphaNum[Math.floor(Math.random() * alphaNum.length)];

  return hash + oneRandomCharacter;
};

module.exports = shortUrlGenerator;
