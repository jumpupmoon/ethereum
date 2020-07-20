pragma solidity >=0.4.22 <0.7.0;
import "remix_tests.sol"; // this import is automatically injected by Remix.
import "remix_accounts.sol"; // test account create
import "../erc20.sol";

// File name has to end with '_test.sol', this file can contain more than one testSuite contracts
contract testSuite is ERC20 {
    string testName = "testToken";
    string testSymbol = "test";
    uint8 testDecimals = 4;
    uint testTotalSupply = 1000;
    address acc0;
    address acc1;
    address acc2;
    
    constructor() public ERC20(testName, testSymbol, testDecimals, testTotalSupply) {
        
    }
    
    function beforeAll() public {
        acc0 = TestsAccounts.getAccount(0);
        acc1 = TestsAccounts.getAccount(1);
        acc2 = TestsAccounts.getAccount(2);
    }
    
    function checkName() public {
        Assert.equal(name, testName, 'name');
    }
    
    function checkSymbol() public {
        Assert.equal(symbol, testSymbol, 'symbol');
    }
    
    function checkDecimals() public {
        Assert.equal(uint(decimals), uint(testDecimals), 'decimals');
    }
    
    function checkTotalSupply() public {
        Assert.equal(totalSupply, testTotalSupply, 'totalSupply');
    }
    
    function checkBalanceOf() public {
        Assert.equal(testTotalSupply, balanceOf[msg.sender], 'balanceOf');
    }
    
    function checkTransfer() public {
        uint testVal0 = balanceOf[acc0];
        uint testVal1 = balanceOf[acc1];
        transfer(acc1, 100);
        Assert.lesserThan(balanceOf[acc0], testVal0, 'transfer acc0');
        Assert.greaterThan(balanceOf[acc1], testVal1, 'transfer acc1');
    }
    
    function checkApprove() public {
        Assert.equal(allowance[acc0][acc2], 0, 'before approve');
        approve(acc2, 50);
        Assert.equal(allowance[acc0][acc2], 50, 'after approve');
    }
    
    function checkAllowance() public {
        Assert.equal(allowance[acc0][acc1], 0, 'allowance acc0 -> acc1');
        Assert.equal(allowance[acc0][acc2], 50, 'allowance acc0 -> acc2');
        Assert.equal(allowance[acc1][acc0], 0, 'allowance acc1 -> acc0');
    }
    
    function checkTransferFrom() public {
        uint testVal0 = balanceOf[acc0];
        uint testVal2 = balanceOf[acc2];
        transferFrom(acc0, acc2, 50);
        Assert.lesserThan(balanceOf[acc0], testVal0, 'transferFrom acc0');
        Assert.greaterThan(balanceOf[acc2], testVal2, 'transferFrom acc2');
    }

    // /// 'beforeAll' runs before all other tests
    // /// More special functions are: 'beforeEach', 'beforeAll', 'afterEach' & 'afterAll'
    // function beforeAll() public {
    //     // Here should instantiate tested contract
    //     Assert.equal(uint(1), uint(1), "1 should be equal to 1");
    // }

    // function checkSuccess() public {
    //     // Use 'Assert' to test the contract, 
    //     // See documentation: https://remix-ide.readthedocs.io/en/latest/assert_library.html
    //     Assert.equal(uint(2), uint(2), "2 should be equal to 2");
    //     Assert.notEqual(uint(2), uint(3), "2 should not be equal to 3");
    // }

    // function checkSuccess2() public pure returns (bool) {
    //     // Use the return value (true or false) to test the contract
    //     return true;
    // }
    
    // function checkFailure() public {
    //     Assert.equal(uint(1), uint(2), "1 is not equal to 2");
    // }
}
