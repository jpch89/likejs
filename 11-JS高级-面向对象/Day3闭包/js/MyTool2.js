// 立即执行函数可以用于封装 js 模块
// 它的好处在于可以接收参数
(function (w) {
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

    // 向外部暴露对象
    // 动态向全局添加属性和方法
    w.myTool = {
        earn: earn,
        spend: spend
    }
})(window);
