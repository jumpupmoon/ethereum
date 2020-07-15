import crypto from 'crypto';
import secp256k1 from 'secp256k1';
import key from './key.js';

// 서명
function sign(message, privateKey) {
    const hash = crypto.createHash('sha256').update(message).digest();
    return secp256k1.ecdsaSign(hash, privateKey);
}

// 검증
function recover(message, signature) {
    const hash = crypto.createHash('sha256').update(message).digest();
    // false 압축되지 않은 공개키 리턴 요청
    return Buffer.from(secp256k1.ecdsaRecover(signature.signature, signature.recid, hash, false));
}

const privateKey = key.createPrivateKey();
const publicKey = key.createPublicKey(privateKey);
// 개인키로 메시지 서명
const signature = sign('hello', privateKey);
// 메시지와 서명을 가지고 공개키가 나오는지 검증
const recoveredKey = recover("hello", signature);

// console.log(publicKey.toString('hex'));
// console.log(recoveredKey.toString('hex'));

export default {
    sign,
    recover,
}