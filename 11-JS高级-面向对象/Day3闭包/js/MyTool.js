function myTool() {
    // 1. 私有的数据
    var money = 1000;
    // 2. 提供操作私有数据的函数
    function earn() {
        money *= 10;
        console.log("赚钱中，总资产：" + money + "元");
    }
    function spend() {
        money -= 10;
        console.log("花钱中，总资产：" + money + "元");
    }

    return {
        earn: earn,
        spend: spend
    };
}
