'use strict';

const crypto = require('crypto');
const randomBytes = crypto.randomBytes;

const bufToHex = (buffer) => {
  return buffer.toString('hex');
};

const hexToBuf = (string) => {
  return Buffer.from(string, 'hex');
};

module.exports = {
  bufToHex,
  hexToBuf,
  randomBytes
};
