function Ball(option) {
    this._init(option);
}

Ball.prototype = {
    _init: function (option) {
        // 1. 必要属性
        this.parentId = option.parentId;
        this.left = option.left;
        this.top = option.top;
        this.r = 60;
        this.bgColor = option.bgColor || "red";
        // 小球坐标变化量
        this.dX = _.random(-5, 5);
        this.dY = _.random(-5, 5);
        this.dR = _.random(1, 3);

        this.render();
    },

    render: function () {
        var parentNode = document.getElementById(this.parentId);
        var childNode = document.createElement("div");
        parentNode.appendChild(childNode);

        childNode.style.position = "absolute";
        childNode.style.left = this.left + "px";
        childNode.style.top = this.top + "px";
        childNode.style.width = this.r + "px";
        childNode.style.height = this.r + "px";
        childNode.style.borderRadius = "50%";
        childNode.style.backgroundColor = this.bgColor;
    },

    update: function () {
        this.left += this.dX;
        this.top += this.dY;
        this.r -= this.dR;
        if (this.r <= 0) {
            this.r = 0;
            // 把小球移除掉
            balls = _.without(balls, this);
        }
    }
};
