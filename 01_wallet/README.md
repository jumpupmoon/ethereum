# key
- utuntu node 설치
    - node 다운로드 -> 패키지 관리자를 통한 Node.js 설치 -> 데비안과 우분투 기반 리눅스 배포판. 엔터프라이즈 리눅스/페도라와 Snap 패키지 -> 공식 Node.js 바이너리 배포판 -> Installation instructions
- 압축 안 된 공개키(x, y) -> 64 
- 압축된 공개키 (x) + 1(정수인지 음수인지) -> 33
- 주소 대소문자 규칙 : https://github.com/ethereum/EIPs/blob/master/EIPS/eip-55.md
- 니모닉 12단어 -> 128bit / 15단어 -> 160bit / 18 192 / 21 224 / 24 256
- 암호화폐 : https://github.com/satoshilabs/slips/blob/master/slip-0044.md

- 이더리움 nonce 확인(포스트맨) 
    - jsonrpc 2.0 규약을 따름 - id 없으면 응답 의무 X
    - 요청을 보낼 때 적은 id를 응답할 때도 동일하게 보내 줌
    - POST https://ropsten-rpc.linkpool.io
    - req
        {
            "jsonrpc": "2.0",
            "method": "eth_getTransactionCount",
            "id": 0,
            "params": ["이더 주소"]
        }
    - 결과
        {
            "jsonrpc": "2.0",
            "result": "0x0",
            "id": 0
        }

- 이더리움 이더 전송(포스트맨)
    - POST https://ropsten-rpc.linkpool.io
    - req
        {
            "jsonrpc": "2.0",
            "method": "eth_sendRawTransaction",
            "id": 0,
            "params": ["서명된 Tx"]
        }
    - 결과
        {
        "jsonrpc": "2.0",
        "result": "0x8f1f0c37375284f604a04c463e4b8216aabac10c790c3226ea1125a570c9c6df",
        "id": 0
    }