import EthereumTx from 'ethereumjs-tx';
import createKeccakHash from 'keccak';
import secp256k1 from 'secp256k1';

// 이더 송금 트랜잭션 구현
const tx = new EthereumTx.Transaction({
    nonce: "0x2",
    gasPrice: "0x2540BE400",
    gasLimit: "0x33450",
    to: "0x687422eEA2cB73B5d3e242bA5456b782919AFc85",
    value: "0x2540BE400",
    data: "0x" + Buffer.from('let mo go home').toString('hex'),
}, {chain: 'ropsten'});

//console.log(tx.serialize().toString('hex'));

// tx v 값에 ropsten의 체인아이디 3 입력
tx.raw[6] = Buffer.from('03', 'hex');

//console.log(tx);
// 서명 안 된 트랜잭션
//console.log(tx.serialize().toString('hex'));

const hash = createKeccakHash('keccak256').update(tx.serialize()).digest();
const privateKey = Buffer.from('895917bf5509fe12b2f9788965539e3a2c0f84463ac4ef9043d6f7c6c0116d43', 'hex');
const signature = secp256k1.ecdsaSign(hash, privateKey);

// tx r 값 = hash 후 서명한 값 중 signature.signature 중 앞 32
tx.raw[7] = Buffer.from(signature.signature.slice(0, 32));
// tx s 값 = hash 후 서명한 값 중 signature.signature 중 뒤 32
tx.raw[8] = Buffer.from(signature.signature.slice(32));
// v 값 갱신 = chaninId * 2 + 35 + recid(0 또는 1)
tx.raw[6] = Buffer.from((3 * 2 + 35  + signature.recid).toString(16), 'hex');

// 서명된 트랜잭션(이더리움에 전송할 트랜잭션)
console.log(tx.serialize().toString('hex'));