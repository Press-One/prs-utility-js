'use strict';

const qs = require('qs');
const { isNode } = require('./env');

let bufToHex;
let hexToBuf;
let randomBytes;

if (isNode) {
  const nodeMethods = require('./node');
  bufToHex = nodeMethods.bufToHex;
  hexToBuf = nodeMethods.hexToBuf;
  randomBytes = nodeMethods.randomBytes;
} else {
  const browserMethods = require('./browser');
  bufToHex = browserMethods.bufToHex;
  hexToBuf = browserMethods.hexToBuf;
  randomBytes = browserMethods.randomBytes;
};

const dumpBuf = (buffer, options = {}) => {
  return options.dump ? bufToHex(buffer) : buffer;
};

const getSortedQS = (obj) => {
  const _obj = Object.create(null);
  const sortedKeys = Object.keys(obj).sort();
  for (const key of sortedKeys) {
    _obj[key] = obj[key];
  }
  return qs.stringify(_obj);
};

module.exports = {
  hexToBuf,
  bufToHex,
  dumpBuf,
  randomBytes,
  getSortedQS
};
