'use strict';

const keythereum = require('keythereum');
const { keccak256 } = require('js-sha3');
const ethUtil = require('ethereumjs-util');
const secp256k1 = require('secp256k1'); // this will fallback to js implementation
const elliptic = require('elliptic');
const { bufToHex, hexToBuf, dumpBuf, randomBytes } = require('./util');

/* eslint-disable-next-line new-cap */
const ec = new elliptic.ec('secp256k1');

const recoverPrivateKey = (keystore, password, options = { dump: true }) => {
  const privateKey = keythereum.recover(password, JSON.parse(keystore));
  return dumpBuf(privateKey, options);
};

const privateKeyToAddress = (privateKey) => {
  return keythereum.privateKeyToAddress(privateKey).slice(2);
};

const createKeyPair = (options = { dump: true }) => {
  // generate private key
  let privateKey;
  do {
    privateKey = randomBytes(32);
  } while (!secp256k1.privateKeyVerify(privateKey));

  // get the public key in a compressed format
  const publicKey = secp256k1.publicKeyCreate(privateKey);

  // convert to uncompressed key
  const convertKey = secp256k1.publicKeyConvert(publicKey, false).slice(1);

  const publishAdd = ethUtil.pubToAddress(convertKey);

  return {
    privateKey: dumpBuf(privateKey, options),
    publicKey: dumpBuf(publicKey, options),
    address: dumpBuf(publishAdd, options)
  };
};

const dec2Hex = (dex) => {
  let hex = (+dex).toString(16).toUpperCase();
  if (hex.length % 2 > 0) {
    hex = '0' + hex;
  }
  return hex;
}

const signHash = (hash, privateKey) => {
  // get signature
  // const key = ec.keyFromPrivate(privateKey, 'hex');
  // const signature = key.sign(hash);
  const signature = ec.sign(hash, privateKey, 'hex', {canonical:true});
  const sigHex = signature.r.toString(16, 32)
               + signature.s.toString(16, 32)
               + dec2Hex(signature.recoveryParam.toString());
  return {
    hash,
    signature: sigHex
  };
};

const sigToAddress = (msghash, sig) => {
  const v = Number(sig.slice(128));
  const sigbuff = hexToBuf(sig.slice(0, 128));
  const senderPubKey = secp256k1.recover(hexToBuf(msghash), sigbuff, v);
  const publickey = secp256k1.publicKeyConvert(senderPubKey, false).slice(1);
  return bufToHex(ethUtil.pubToAddress(publickey));
};

module.exports = {
  recoverPrivateKey,
  privateKeyToAddress,
  keccak256,
  createKeyPair,
  signHash,
  sigToAddress
};
