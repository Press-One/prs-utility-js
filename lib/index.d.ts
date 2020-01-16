declare module "prs-utility" {
  import { Hash } from "js-sha3";
  type Buffer = any; // nodejs buffer
  type BufOrStr = string | Buffer;

  interface KeyPair {
    privateKey: BufOrStr;
    publicKey: BufOrStr;
    address: BufOrStr;
  }

  interface SignResult {
    hash: string;
    signature: string;
  }

  type SignAlg = "sha256" | "keccak256";

  export function recoverPrivateKey(
    keystore: string,
    password: string,
    options?: object
  ): BufOrStr;
  export function privateKeyToAddress(privateKey: string): string;
  export var keccak256: Hash;
  export var SHA256: any;
  export function createKeyPair(options?: object): KeyPair;
  export function signHash(hash: string, privateKey: string): SignResult;
  export function signText(
    message: string,
    privatekey: string,
    alg: SignAlg
  ): SignResult;
  export function signBlockData(
    data: object,
    privateKey: string,
    alg: SignAlg
  ): SignResult;
  export function sigToAddress(msghash: string, sig: string): string;
  export function hashText(message: string, alg: SignAlg): string;
  export function hashBlockData(data: object, alg: SignAlg): string;
  export function sigToAddressFromBlock(
    data: object,
    sig: string,
    alg: SignAlg
  ): string;
  export function getSortedQS(obj: object): string;
  export function bufToHex(buffer: Buffer): string;
  export function hexToBuf(hex: string): Buffer;
  export function bufToWordArray(buffer: Buffer): any;
}

