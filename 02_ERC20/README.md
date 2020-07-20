# ERC20
- https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md
- remix https와 http로 접속했을 때 스토리지가 다름
    - 필요에 따라 접속
- 솔리디티 공식 문서 https://solidity.readthedocs.io
- pragma solidity >=0.4 <0.7
- pragma solidity ^0.6.0;
- 0.6.0 버전 이후 부터는 string이 memory인지 storage인지 구분해서 적어줘야 함
- view(Write X Read O) / pure(Write X Read X)
- 구조체는 return 할 수 없음
- 이더리움은 실패한 tx도 블록에 담기 때문에 event를 통해 정상 실행되었다는 것을 알림

#ERC20 TEST
- remix_accounts.sol
- https://remix-ide.readthedocs.io/en/latest/unittesting_examples.html#simple-example
- beforeEach : 매번 테스트 전 실행
- beforeAll : 테스트 전 1회 실행
- afterEach : 매번 테스트 후 실행
- afterAll : 테스트 후 1회 실행
- test contract의 msg.sender는 기본적으로 account0
- /// #sender: account-1 : 함수 위에 기재시 해당 함수에 대해서만 msg.sender를 account1로 변경
- 각 테스트 케이스는 다른 테스트 케이스와 의존성이 없도록 구현해야 함(순서가 바뀌는 등의 변화가 있어도 테스트를 정상적으로 할 수 있도록)
- webhook(★) / CICD(★)
- gist.github.com : 코드 공유