prs-utility 是 PRS 提供的算法工具库，包含项目中需要使用的所有哈希、加密算法。

## 注意

[keythereum](https://github.com/ethereumjs/keythereum/issues/79) 依赖了 `scrypt` 导致，node 12 不被支持。

## 安装

通过 npm 安装:

```
npm install prs-utility --save
```

## 使用示例

```javascript
const utility = require("prs-utility");

// 根据 keystore 和 password 得到私钥。
const privateKey = utility.recoverPrivateKey(
  '{"address":"758ea2601697fbd3ba6eb6774ed70b6c4cdb0ef9","crypto":{"cipher":"aes-128-ctr","ciphertext":"92af6f6710eba271eae5ac7fec72c70d9f49215e7880a0c45d4c53e56bd7ea59","cipherparams":{"iv":"13ddf95d970e924c97e4dcd29ba96520"},"mac":"b9d81d78f067334ee922fb2863e32c14cbc46e479eeb0acc11fb31e39256004e","kdf":"pbkdf2","kdfparams":{"c":262144,"dklen":32,"prf":"hmac-sha256","salt":"79f90bb603491573e40a79fe356b88d0c7869852e43c2bbaabed44578a82bbfa"}},"id":"93028e51-a2a4-4514-bc1a-94b089445f35","version":3}',
  "123123"
);
console.log(privateKey);

// 计算文件的 hash 值。
const fs = require("fs");
const path = require("path");
let markdownFileUrl = path.join(__dirname, "./assets/test.md");
const content = fs.readFileSync(markdownFileUrl, "utf-8");
const fileHash = utility.keccak256(content);
console.log(fileHash);

// 根据 PRS 协议组合 block data, 并且使用 privateKey 进行签名。
let data = {
  file_hash: fileHash
};
const sign = utility.signBlockData(data, privateKey);
console.log(sign);

// 生成一对新密钥
const keyPair = utility.createKeyPair({ dump: true });
console.log(keyPair);
```

## API

`prs-utility` 提供了常用的加解密函数和一些用于格式转化的工具函数

### recoverPrivateKey

> recoverPrivateKey(keystore: string, password: string, options = { dump: true }): BufOrStr

根据 keystore 的值和登录密码，计算出 private key，返回 hex 字符串 （可以传入额参数 options = { dump = false } 返回 buffer 格式）

### privateKeyToAddress

> privateKeyToAddress(privateKey: string): string

根据 private key，计算出对应的 address

### createKeyPair

> createKeyPair(options = { dump: true }): KeyPair;

```typescript
interface KeyPair {
  privateKey: BufOrStr;
  publicKey: BufOrStr;
  address: BufOrStr;
}
```

随机生成一对 key，options 同上述，可以传入 { dump: true } 返回 buffer

### signHash

> signHash(hash: string, privateKey: string): SignResult

```typescript
interface SignResult {
  hash: string;
  signature: string;
}
```

对 hash 进行签名

### signText

> signText(message: string, privatekey: string): SignResult

对文本进行签名，会先将文本通过 `keccak256` 算法得到 hash，然后再签名该 hash

### signBlockData

> signBlockData(data: object, privateKey: string): SignResult

对对象进行签名，会先将对象进行处理（按照 key 升序排列后再序列化，紧接着进行 `keccak256`）得到 hash，然后签名该 hash

### sigToAddress

> sigToAddress(hash: string, signature，: string): string;

通过 hash 和 signature，得到 address

### hashBlockData

> hashBlockData(data: object): string;

对对象进行 hash，返回字符串。如上 `signBlockData` 内的步骤: 按照 key 升序排列后再序列化，紧接着进行 `keccak256`

### sigToAddressFromBlock

> sigToAddressFromBlock(data: object, sig: string): string

根据对象和它的签名，得到地址

### getSortedQS

> getSortedQS(obj: object): string

将 object 按照 key 升序排列后再序列化，得到字符串

### bufToHex

> bufToHex(buffer: Buffer): string

buffer 转 hex 字符串

### hexToBuf

> hexToBuf(hex: string): Buffer

hex 字符串转 buffer

