"use strict";

const core = require("./core");
const { getSortedQS, bufToHex, hexToBuf } = require("./util");

const ALG = {
  KECCAK256: "keccak256",
  SHA256: "sha256"
};

function hashText(message, alg = ALG.KECCAK256) {
  if (alg === ALG.KECCAK256) {
    return core.keccak256(message);
  }
  if (alg === ALG.SHA256) {
    return core.sha256(message);
  }
  throw new Error(`Unsupported alg: ${alg}`);
}

function hashBlockData(block, alg = ALG.KECCAK256) {
  const input = getSortedQS(block);
  return hashText(input, alg);
}

function signBlockData(data, privateKey, alg = ALG.KECCAK256) {
  return core.signHash(hashBlockData(data, alg), privateKey);
}

function sigToAddressFromBlock(data, sig, alg = ALG.KECCAK256) {
  return core.sigToAddress(hashBlockData(data, alg), sig);
}

function signText(message, privatekey, alg = ALG.KECCAK256) {
  const hash = hashText(message, alg);

  return core.signHash(hash, privatekey);
}

module.exports = Object.assign({}, core, {
  signText,
  hashText,
  hashBlockData,
  signBlockData,
  sigToAddressFromBlock,
  getSortedQS,
  bufToHex,
  hexToBuf
});
