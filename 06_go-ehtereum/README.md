```
- 테스트용 체인링크 토큰 받기 https://ropsten.chain.link/
- truffle init
- npm install @chainlink/contracks
- npm install @openzeppelin/contracts@2.3.0
- modules 안에 있는 파일 솔리디티 버전도 수정
- wsl 초기화 / ubuntu -> 앱 설정 -> 초기화
- 카카오 서버에서 apt 받아옴(속도 빠름) : sudo sed -i "s/archive.ubuntu/mirror.kakao/g" /etc/apt/sources.list
- sudo apt update
- apt policy golang-go : 다운 받아질 go 버전 확인


# 이더리움에 처음으로 트랜잭션을 날린 주소의 데이터값을 extra에 등록하도록 메인넷 수정


    1  sudo sed -i "s/archive.ubuntu/mirror.kakao/g" /etc/apt/sources.list
    2  sudo apt update
    3  apt policy golang-go
    4  sudo add-apt-repository ppa:longsleep/golang-backports
    5  sudo apt update
    6  sudo apt install golang-go
    7  apt policy golang-go
    8  go version
    9  git clone https://github.com/ethereum/go-ethereum
   10  cd go-ethereum/
   11  make all
   12  cd build/bin/
   13  ls
   14  ./puppeth
   15  ls
   16  ./geth --datadir data init genesis.json
   17  ./geth --datadir account import keyfile
   18  rm -rf account
   19  ./geth --datadir data account import keyfile
   20  cat > password.txt
   21  ./geth --datadir data --syncmode "full" --http --http.addr "0.0.0.0" --http.port 8545 --http.api "eth,admin,net,clique" --unlock "0x25c54DEea9b9bcd72a57d0591b25c0fd86349901" --password "password.txt" --allow-insecure-unlock --networkid 9999 --mine
   22  cd ..
   23  make all
   24  cd build/bin/
   25  rm -rf data/geth/
   26  ./geth --datadir data init genesis.json
   27  ./geth --datadir data --syncmode "full" --http --http.addr "0.0.0.0" --http.port 8545 --http.api "eth,admin,net,clique" --unlock "0x25c54DEea9b9bcd72a57d0591b25c0fd86349901" --password "password.txt" --allow-insecure-unlock --networkid 9999 --mine




### 수정한 파일
- core/state/state_object.go // 107, 121~123, 135~150
- core/state/statedb.go // 878~891
- core/state/journal.go // 133~136 , 242~248
- core/vm/evm.go // 220~222
- core/vm/interface.go // 36~37
- internal/ethapi/api.go // 559~566






### post man / check

- wallet/transaction.js 수정 후 실행한 hash 값 params로
{
    "jsonrpc": "2.0",
    "method": "eth_sendRawTransaction",
    "id": 0,
    "params": ["0xf879808502540be40082c35094687422eea2cb73b5d3e242ba5456b782919afc858502540be4008e6c6574206d6f20676f20686f6d65824e42a0bb3cb5d9ecb3569e6d6856d92a11f24ad6839672a28d4cb3e5bc8cef6c7a02a9a0795fb4ab60a7a56855381b406c0a117943ed04c8f9b480280124aedade55ed69"]
}



- 첫 트랜잭션을 날린 주소에 들어간 extra 확인 
{
    "jsonrpc": "2.0",
    "method": "eth_getExtra",
    "id": 0,
    "params": ["0x687422eEA2cB73B5d3e242bA5456b782919AFc85", "latest"]
}
```
