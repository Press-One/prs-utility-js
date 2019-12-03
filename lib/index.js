"use strict";

const core = require("./core");
const { getSortedQS, bufToHex, hexToBuf } = require("./util");

const ALG = {
  KECCAK256: "keccak256",
  SHA256: "sha256"
};

function hashBlockData(block, alg = ALG.KECCAK256) {
  const input = getSortedQS(block);
  if (alg === ALG.KECCAK256) {
    return core.keccak256(input);
  }
  if (alg === ALG.SHA256) {
    return core.sha256(input);
  }
  throw new Error(`Unsupported alg: ${alg}`);
}

function signBlockData(data, privateKey, alg = ALG.KECCAK256) {
  return core.signHash(hashBlockData(data, alg), privateKey);
}

function sigToAddressFromBlock(data, sig, alg = ALG.KECCAK256) {
  return core.sigToAddress(hashBlockData(data, alg), sig);
}

function signText(message, privatekey, alg = ALG.KECCAK256) {
  if (alg === ALG.KECCAK256) {
    return core.signHash(core.keccak256(message), privatekey);
  }
  if (alg === ALG.SHA256) {
    return core.signHash(core.sha256(message), privatekey);
  }
  throw new Error(`Unsupported alg: ${alg}`);
}

module.exports = Object.assign({}, core, {
  signText,
  hashBlockData,
  signBlockData,
  sigToAddressFromBlock,
  getSortedQS,
  bufToHex,
  hexToBuf
});
