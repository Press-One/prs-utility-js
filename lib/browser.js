'use strict';

const bufToHex = (buffer) => {
  return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
};

const hexToBuf = (hex) => {
  if (typeof hex !== 'string') {
    throw new TypeError('Expected input to be a string');
  }
  if ((hex.length % 2) !== 0) {
    throw new RangeError('Expected string to be an even number of characters');
  }
  const view = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    view[i / 2] = parseInt(hex.substring(i, i + 2), 16);
  }
  return view;
};

const randomBytes = bytes => {
  const arr = new Uint8Array(bytes);
  window.crypto.getRandomValues(arr);
  return arr;
};

module.exports = {
  bufToHex,
  hexToBuf,
  randomBytes
};
