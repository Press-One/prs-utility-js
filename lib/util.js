"use strict";

const qs = require("qs");
const crypto = require("crypto");
const randomBytes = crypto.randomBytes;
const CryptoJS = require("crypto-js");

const bufToWordArray = buffer => CryptoJS.lib.WordArray.create(buffer);

const bufToHex = buffer => {
  return buffer.toString("hex");
};

const hexToBuf = string => {
  return Buffer.from(string, "hex");
};

const dumpBuf = (buffer, options = {}) => {
  return options.dump ? bufToHex(buffer) : buffer;
};

const getSortedQS = obj => {
  const _obj = Object.create(null);
  const sortedKeys = Object.keys(obj).sort();
  for (const key of sortedKeys) {
    _obj[key] = obj[key];
  }
  return qs.stringify(_obj);
};

const compose2 = (f, g) => (...args) => f(g(...args));
const pipe = (...fns) => fns.reduceRight(compose2);

module.exports = {
  hexToBuf,
  bufToHex,
  dumpBuf,
  randomBytes,
  getSortedQS,
  pipe,
  bufToWordArray
};
