const bcrypt = require('bcrypt');
const crypto = require('crypto');

const saltRounds = process.env.SALT_ROUNDS || 10;

const getPasswordHash = (password) => {
    return new Promise((res, rej) => {
        bcrypt.hash(password, saltRounds, function (err, hash) {
            if (err) {
                return rej(err);
            }
            res(hash);
        });
    });
};

const verifyPassword = (password, hash) => {
    return new Promise((res, rej) => {
        bcrypt.compare(password, hash, function(err, result) {
            if (err) {
                return rej(err);
            }
            res(result);
        });
    });
};

const getHash = (data) => crypto.createHash('sha1').update(data).digest('base64');

module.exports = { getHash, getPasswordHash, verifyPassword }