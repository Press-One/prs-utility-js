import { Hash } from 'js-sha3';

declare module 'prs-utility';
type Buffer = any;  // nodejs buffer
type BufOrStr = string | Buffer;

interface KeyPair {
  privateKey: BufOrStr, publicKey: BufOrStr, address: BufOrStr
}

interface SignResult {
  hash: string, signature: string
}

interface PRSUtil {
  recoverPrivateKey(keystore: string, password: string, options?: object):
    BufOrStr;
  privateKeyToAddress(privateKey: string): string;
  keccak256: Hash;
  createKeyPair(options?: object): KeyPair;
  signHash(hash: string, privateKey: string): SignResult;
  signText(message: string, privatekey: string): string;
  signBlockData(data: object, privateKey: string): SignResult;
  sigToAddress(msghash: string, hash: string): string;
  hashBlockData(data: object): string;
  signBlockData(data: object, privateKey: string): SignResult;
  sigToAddressFromBlock(data: object, sig: string): string;
  getSortedQS(obj: object): string;
  bufToHex(buffer: Buffer): string;
  hexToBuf(buffer: string): Buffer;
}
declare var prsUtil: PRSUtil;

export = prsUtil;
