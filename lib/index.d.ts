import prsUtils = require('./index');
import { Hash } from 'js-sha3';

declare module 'prs-utility';

type Buffer = any; // nodejs buffer

type BufOrStr = string | Buffer;

interface KeyPair {
  privateKey: BufOrStr,
  publicKey: BufOrStr,
  address: BufOrStr
}

interface SignResult {
  hash: string,
  signature: string
}

export function recoverPrivateKey(keystore: string, password: string, options?: object): BufOrStr;
export function privateKeyToAddress(privateKey: string): string;
export var keccak256: Hash;
export function createKeyPair(options?: object): KeyPair;
export function signHash(hash: string, privateKey: string): SignResult;
export function signBlockData(data: object, privateKey: string): SignResult;
export function sigToAddress(msghash: string, hash: string): string;
export function getSortedQS(obj: object): string;
export function bufToHex (buffer: Buffer): string;
export function hexToBuf (buffer: string): Buffer;
