'use strict';

const core = require('./core');
const { pipe, getSortedQS, bufToHex, hexToBuf } = require('./util');

// compositions

const hashBlockData = pipe(getSortedQS, core.keccak256);

const signBlockData = (data, privateKey) => core.signHash(hashBlockData(data), privateKey);

const sigToAddressFromBlock = (data, sig) => core.sigToAddress(hashBlockData(data), sig);

const signText = (message, privatekey) => core.signHash(core.keccak256(message), privatekey);

module.exports = Object.assign({}, core, {
  signText,
  hashBlockData,
  signBlockData,
  sigToAddressFromBlock,
  getSortedQS,
  bufToHex,
  hexToBuf
});
