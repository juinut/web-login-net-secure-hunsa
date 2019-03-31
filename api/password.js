var crypto = require("crypto");

var SaltLength = 9;

function createHash(password) {
  var salt = generateSalt(SaltLength);
  var hash = sha256(password + salt);
  return salt + hash;
}

function validateHash(hash, password) {
  var salt = hash.substr(0, SaltLength);
  var validHash = salt + sha256(password + salt);
  return hash === validHash;
}

function generateSalt(len) {
  var set = "0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ",
    setLen = set.length,
    salt = "";
  for (var i = 0; i < len; i++) {
    var p = Math.floor(Math.random() * setLen);
    salt += set[p];
  }
  return salt;
}

function sha256(string) {
  return crypto
    .createHash("sha256")
    .update(string)
    .digest("hex");
}

module.exports = {
  hash: createHash,
  validate: validateHash
};
