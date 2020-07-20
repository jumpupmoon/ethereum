pragma solidity >=0.4.22 <0.7.0;
import "remix_tests.sol";
import "remix_accounts.sol";
import "../ERC20.sol";

contract ERC20Test is ERC20 {

    string testName = "MyToken";
    string testSymbol = "MTN";
    uint8 testDecimals = 2;
    uint testTotalSupply = 1000000;
    
    address acc0;
    address acc1;
    address acc2;
    
    bool account1Approved;
    bool account2Approved; 
    
    constructor() public ERC20(testName, testSymbol, testDecimals, testTotalSupply) {
    }

    function beforeAll() public {
        acc0 = TestsAccounts.getAccount(0); 
        acc1 = TestsAccounts.getAccount(1);
        acc2 = TestsAccounts.getAccount(2);
    }
    
    function beforeEach() public {
        transfer(acc1, 10000);
        transfer(acc2, 10000);
    }

    function afterEach() public {
        if (account1Approved) {
            transferFrom(acc1, acc0, balanceOf(acc1));
        }
        if (account2Approved) {
            transferFrom(acc2, acc0, balanceOf(acc2));
        }
    }

    /// #sender: account-1
    function approveAccount1() public {
        approve(acc0, uint(-1));
        account1Approved = true;
    }
    
    /// #sender: account-1
    function approveAccount1_2() public {
        approve(acc2, uint(-1));
    }

    /// #sender: account-2
    function approveAccount2() public {
        approve(acc0, uint(-1));
        account2Approved = true;
    }

    function checkName() public {
        Assert.equal(name, testName, "invalid value");
    }
    
    function checkSymbol() public {
        Assert.equal(symbol, testSymbol, "invalid value");
    }
    
    function checkDecimals() public {
        Assert.equal(uint(decimals), uint(testDecimals), "invalid value");
    }
    
    function checkBalanceOf() public {
        Assert.equal(balanceOf(acc1), 10000, "invalid balance of account-1");
    }
    
    function checkTotalSupply() public {
        Assert.equal(totalSupply, testTotalSupply, "invalid amount of totalSupply");
    }

    /// #sender: account-1
    function checkTransfer() public {
        Assert.ok(transfer(acc2, 5000), "transfer to acc1 has failed");
        Assert.equal(balanceOf(acc1), 5000, "invalid balance of account-1");
        Assert.equal(balanceOf(acc2), 15000, "invalid balance of account-2");
    }
    
    function checkTransferThrowsOverdrawnBalance() public {
        ERC20 erc20 = new ERC20(testName, testSymbol, testDecimals, 10000);
        try erc20.transfer(acc0, 15000) returns (bool r) {
            Assert.ok(false, "transfer should fail");
        } catch Error(string memory reason) {
            Assert.equal(reason, "overdrawn balance", reason);
        }
    }

    /// #sender: account-2
    function checkTransferFrom() public {
        Assert.ok(transferFrom(acc1, acc2, 5000), "transfer to acc1 has failed");
        Assert.equal(balanceOf(acc1), 5000, "invalid balance of account-1");
        Assert.equal(balanceOf(acc2), 15000, "invalid balance of account-2");
    }

    function checkApprove() public {
        Assert.ok(approve(acc1, 10000), "approve to acc1 has failed");
        Assert.equal(allowance(acc0, acc1), 10000, "invalid amount of allowance");
    }
}