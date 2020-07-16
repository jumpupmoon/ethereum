pragma solidity ^0.6.0;

contract ERC20 {
    // 토큰 이름 ex) 비트코인
    string public name;
    // 토큰 심볼 ex) BTC
    string public symbol;
    // 소수점 자리수
    uint8 public decimals;
    // 총 발행량
    uint public totalSupply;
    
    // 토큰 보유량 확인
    mapping (address => uint) public balanceOf;
    // 타인의 토큰 이동 권한 부여 여부 및 이동 가능량 확인
    mapping (address => mapping (address => uint256)) public allowance;
    
    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);
    
    // 컨트랙트 배포시 배포한 사람에게 총 발행량을 모두 전송 + 토큰 설정
    constructor(string memory _name, string memory _symbol, uint8 _decimals, uint _totalSupply) public {
        name = _name;
        symbol = _symbol;
        decimals = _decimals;
        totalSupply = _totalSupply * (10 ** decimals);
        
        balanceOf[msg.sender] = totalSupply;
        emit Transfer(address(0), msg.sender, totalSupply);
    }

    // function name() public pure returns (string memory) {
    //     return 'ether';
    // }
    
    // function symbol() public view returns (string memory) {
    //     return "eth";
    // }
    
    // function decimals() public view returns (uint8) {
    //     return 0;
    // }
    
    // function totalSupply() public view returns (uint256) {
    //     return 1000;
    // }
    
    // function balanceOf(address _owner) public view returns (uint256 balance) {
    //     return _balance[_owner];
    // }
    
    // 내 토큰 타인에게 전송
    function transfer(address _to, uint _value) public returns (bool success) {
        return _transfer(msg.sender, _to, _value);
    }
    
    // 권한이 있는 타인의 토큰 3자에게 전송
    function transferFrom(address _from, address _to, uint _value) public returns (bool success) {
        require(allowance[_from][_to] >= _value);
        allowance[_from][msg.sender] -= _value;
        return _transfer(_from, _to, _value);
    }

    // 토큰 전송 공통
    function _transfer(address _from, address _to, uint _value) private returns(bool success) {
        require(balanceOf[_from] >= _value);
        require(balanceOf[_to] + _value > balanceOf[_to]);
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(_from, _to, _value);
        return true;
    }
    
    // 내 토큰을 다른 사람이 전송할 수 있도록 허가
    function approve(address _spender, uint _value) public returns (bool success) {
        allowance[msg.sender][_spender] = _value;
        Approval(msg.sender, _spender, _value);
        return true;  
    }
}