'use strict';

const utility = require('../lib');

describe('Utility', function () {
  it('recover privateKey', async function () {
    const privateKey = utility.recoverPrivateKey('{"address":"758ea2601697fbd3ba6eb6774ed70b6c4cdb0ef9","crypto":{"cipher":"aes-128-ctr","ciphertext":"92af6f6710eba271eae5ac7fec72c70d9f49215e7880a0c45d4c53e56bd7ea59","cipherparams":{"iv":"13ddf95d970e924c97e4dcd29ba96520"},"mac":"b9d81d78f067334ee922fb2863e32c14cbc46e479eeb0acc11fb31e39256004e","kdf":"pbkdf2","kdfparams":{"c":262144,"dklen":32,"prf":"hmac-sha256","salt":"79f90bb603491573e40a79fe356b88d0c7869852e43c2bbaabed44578a82bbfa"}},"id":"93028e51-a2a4-4514-bc1a-94b089445f35","version":3}', '123123');
    privateKey.should.equal('6e204c62726a19fe3f43c4ca9739b7ffa37e4a3226f824f3e24e00a5890addc6');
  });

  it('privateKeyToAddress', async function () {
    const address = utility.privateKeyToAddress('6e204c62726a19fe3f43c4ca9739b7ffa37e4a3226f824f3e24e00a5890addc6');
    address.should.equal('758ea2601697fbd3ba6eb6774ed70b6c4cdb0ef9');
  });

  it('keccak256', async function () {
    const message = 'hello prs';
    const hash = utility.keccak256(message);
    hash.should.equal('647df39ad889e83cc0b9b65375672d1bfe282565c564d3d553a435bf80e67d92');
  });

  it('create key pair', async function () {
    const pair = utility.createKeyPair();
    pair.should.have.ownProperty('privateKey');
    pair.should.have.ownProperty('publicKey');
    pair.should.have.ownProperty('address');
  });

  it('sigToAddress', function () {
    const { privateKey, address } = utility.createKeyPair();
    const data = { a: 111, b: 222 };
    const { hash, signature } = utility.signBlockData(data, privateKey);
    const recoverAddr = utility.sigToAddress(hash, signature);
    address.should.equal(recoverAddr);
  });
});
