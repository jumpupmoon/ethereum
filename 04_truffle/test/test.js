const {constants, expectRevert } = require('openzeppelin-test-helpers');
const ContractName = artifacts.require('mytoken');


contract("mytoken 컨트랙트 테스트", async function ([성은, 철수, 영희, 민수]) {

    beforeEach(async function () {
        this.contract = await ContractName.new();
    })

    describe("시나리오 1 - 토큰의 기본 정보 테스트", function () {
        it("배포된 컨트랙트의 토큰 이름이 지정한 이름과 동일해야한다", async function () {
            assert.equal(await this.contract.name(), 'mytoken', "토큰의 이름이 'mytoken'이 아닙니다.");
        })
        it("배포된 컨트랙트의 토큰 심볼이 지정한 심볼과 동일해야한다", async function () {
            assert.equal(await this.contract.symbol(), 'mtn', "토큰의 심볼이 'mtn'이 아닙니다.");
        })
        it("배포된 컨트랙트의 토큰 초기 발행량이 지정한 발행량과 동일해야한다.", async function () {
            assert.equal(await this.contract.totalSupply(),  10000000000 * (10 ** 18), "토큰의 총 발행량이 '10000000000 * (10 ** 18)'이 아닙니다.");
        })
    })
    
    describe("시나리오 2 - 토큰 전송 테스트", function () {
        it("성은이 철수에게 토큰 100개를 전송하면 철수의 토큰 잔액이 100개가 되어야한다.", async function () {
            await this.contract.transfer(철수, 100, { from : 성은 });
            assert.equal(await this.contract.balanceOf(철수), 100, "철수의 토큰 잔액이 100개가 아닙니다.");
        })
        it("성은이 철수에게 토큰 100개를 전송한 후 또 다시 100개 전송하면 철수의 토큰 잔액이 200개가 되어야한다.", async function () {
            await this.contract.transfer(철수, 100, { from : 성은 });
            await this.contract.transfer(철수, 100, { from : 성은 });
            assert.equal(await this.contract.balanceOf(철수), 200, "철수의 토큰 잔액이 200개가 아닙니다.");
        })
        it("성은이 없는 주소(0)로 토큰 100개를 전송하면 해당 트랜잭션은 실패해야한다.", async function () {
            await expectRevert.unspecified(this.contract.transfer(constants.ZERO_ADDRESS, 100, { from: 성은 }));
        })
        it("성은이 철수에게 음수 개의 토큰을 전송하면 해당 트랜잭션은 실패해야한다.", async function () {
            await expectRevert.unspecified(this.contract.transfer(철수, -1, { from: 성은 }));
        })
        it("영희는 토큰을 0개 가지고 있다. 만약, 민수에게 토큰을 100개 전송하려하면 해당 트랜잭션을 실패해야한다.", async function () {
            await expectRevert.unspecified(this.contract.transfer(민수, 100, { from: 영희 }));
        })
    })
 
})