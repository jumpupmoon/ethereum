import express from "express";
import bodyParser from "body-parser";
import key from './key.js';
import ecdsa from './ecdsa.js';
import Mnemonic from "bitcore-mnemonic";

const port = 3000;
const host = '127.0.0.1';

const app = express();
app.use(bodyParser.json());

app.post('/', (_, res) => {
    res.send('success');
})

let privateKey;
// 니모닉, 개인키, 이더리움 주소 만들기
app.post('/create_key', (_, res) => {
    const mnemonic = key.createMnemonic();
    privateKey = key.mnemonicToPrivateKey(mnemonic);
    const publicKey = key.createPublicKey(privateKey);
    const address = key.createAddress(publicKey);
    const checksumAddress = key.toChecksumAddress(address);
    
    res.json({
        mnemonic: mnemonic.toString(),
        privateKey: privateKey.toString('hex'),
        address: checksumAddress
    })
})

// 저장된 이더리움 주소 확인
app.post('/current_address', (_, res) => {
    res.json({
        address: key.privatekeyToAddress(privateKey),
    })
})

// 니모닉 또는 개인키로 이더리움 주소 만들기
app.post('/import_key', (req, res) => {
    if(req.body.hasOwnProperty('privateKey')) {
        privateKey = Buffer.from(req.body.privateKey, 'hex');
    } else if(req.body.hasOwnProperty('mnemonic')) {
        const mnemonic = new Mnemonic(req.body.mnemonic);
        privateKey = key.mnemonicToPrivateKey(mnemonic);
    } else {
        res.status(500).json({
            error: 'private or mnemonic is necessary'
        });
        return;
    }

    res.json({
        address: key.privatekeyToAddress(privateKey)
    })
})

// 메시지 서명
app.post('/sign', (req, res) => {
    const signature = ecdsa.sign(req.body.message, privateKey);
    res.json({
        signature: {
            // signature 16진수로 변환
            signature: Buffer.from(signature.signature).toString('hex'),
            recid: signature.recid,
        },
        message: req.body.message,
    })
})

// 서명된 메시지를 통해 이더리움 주소 확인
app.post('/recover', (req, res) => {
    const signature = {
        // 16진수로 들어왔다고 간주하고 다시 buffer 형태로 변환
        signature: Buffer.from(req.body.signature.signature, 'hex'),
        recid: req.body.signature.recid,
    }
    
    const publicKey = ecdsa.recover(req.body.message, signature);
    const address = key.createAddress(publicKey);
    res.json({
        address: address,
    })
})

app.listen(port, host);