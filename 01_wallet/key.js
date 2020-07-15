// Math.random은 보안에 취약하기 때문에 crypto 이용
import crypto from 'crypto';
// 2^^256 값 중 일부 값(2^^256 - 2^^32 - 2^^9 - 2^^8 - 2^^7 - 2^^6 - 2^^4 - 1) 제외
import secp256k1 from 'secp256k1';
// 이더리움 hash 값 만들기 위해 필요
import createKeccakHash from 'keccak';
// 니모닉 만들어주는 라이브러리
import Mnemonic from 'bitcore-mnemonic';

// 개인키 생성
function createPrivateKey() {
    let privateKey;

    do {
        // buffer 형태로 만들어짐
        privateKey = crypto.randomBytes(32);
    // random 값이 secp256k1 값을 만족 할 때까지 private key 생성을 반복
    } while (secp256k1.privateKeyVerify(privateKey) === false);

    return privateKey;
}

// console.log(createPrivateKey());
// console.log(createPrivateKey().toString("hex"));

// 공개키 생성
function createPublicKey(privateKey, compressed = false) {
    // secp256k1 통해 생성된 값은 uint8array / 타입 통일성을 위해 buffer로 변경
    return Buffer.from(secp256k1.publicKeyCreate(privateKey, compressed));
}

// 테스트 출력
function testPrint(a, b) {
    return console.log(a, b.toString('hex'));
}

const privateKey = createPrivateKey();
// 압축된 공개키는 02 또는 03으로 시작
const compressedPublicKey = createPublicKey(privateKey, true);
// 압축 안 된 공개키는 04로 시작
const uncompressedPublicKey = createPublicKey(privateKey);

// testPrint('privateKey ->', privateKey);
// testPrint('', compressedPublicKey);
// testPrint('publicKey ->', uncompressedPublicKey);

// 이더리움 주소 만들기
function createAddress(publicKey) {
    //createKeccakHash(x) x 종류로 hash 값을 만듦
    //update(x) x 값을 hash 함
    //slice 하는 이유는 앞의 부호를 나타내는 값을 잘라내기 위해
    //digest(x) x진수로 변경
    const hash = createKeccakHash("keccak256").update(publicKey.slice(1)).digest('hex');
    //이더리움 주소는 맨 앞에 16진수를 나타내는 0x를 붙여주는 것이 관례
    return "0x" + hash.slice(24);
}

const address = createAddress(uncompressedPublicKey);
//consolelog('adress ->', address);

// eip55 - 이더리움 주소 중 일부를 대문자로 만들어주는 규칙
function toChecksumAddress (address) {
    address = address.toLowerCase().replace('0x', '')
    var hash = createKeccakHash('keccak256').update(address).digest('hex')
    var ret = '0x'

    for (var i = 0; i < address.length; i++) {
        if (parseInt(hash[i], 16) >= 8) {
        ret += address[i].toUpperCase()
        } else {
        ret += address[i]
        }
    }

    return ret
}

// 니모닉 만들기
function createMnemonic(numWords = 12) {
    if(numWords < 12 || numWords > 24 || numWords % 3 !== 0) {
        throw new Error('invalid number of words');
    }
    const entropy = (16 + (numWords - 12) / 3 * 4) * 8;
    return new Mnemonic(entropy);
}

// 니모닉으로 개인키 가져오기
function mnemonicToPrivateKey(mnemonic) {
    const privateKey = mnemonic.toHDPrivateKey().derive("m/44'/60'/0'/0/0").privateKey;
    return Buffer.from(privateKey.toString(), "hex");
}

const mnemonic = createMnemonic();
const mnemonicPrivateKey = mnemonicToPrivateKey(mnemonic);
// console.log(mnemonic.toString());
// testPrint('mnemonic ->', mnemonicPrivateKey);

// 개인키로 이더리움 주소 반환
function privatekeyToAddress(privateKey) {
    const publicKey = createPublicKey(privateKey);
    const address = createAddress(publicKey);
    return toChecksumAddress(address);
}

export default {
    createPrivateKey,
    createPublicKey,
    createAddress,
    toChecksumAddress,
    createMnemonic,
    mnemonicToPrivateKey,
    privatekeyToAddress,
}