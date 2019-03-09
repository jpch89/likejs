/**
 * 获取滚动的头部距离和左边距离
 * scroll().top scroll().left
 * @returns {{top: number, left: number}}
 */
function scroll() {
    if (window.pageYOffset !== null) {
        return {
            top: window.pageYOffset,
            left: window.pageXOffset
        };
    } else if (document.compatMode === "CSS1Compat") {  // W3C
        return {
            top: document.documentElement.scrollTop,
            left: document.documentElement.scrollLeft
        };
    }
    return {
        top: document.body.scrollTop,
        left: document.body.scrollLeft
    };
}


function $(id) {
    return typeof id === "string" ? document.getElementById(id) : null;
}


function show(obj) {
    obj.style.display = "block";
}

function hide(obj) {
    obj.style.display = "none";
}

/**
 * 获取屏幕的宽度和高度
 * @returns {{width: number, height: number}}
 */
function client() {
    if (window.innerWidth) {  // ie9+ 和最新浏览器
        return {
            "width": window.innerWidth,
            "height": window.innerHeight
        };
    } else if (document.compatMode === "CSS1Compat") {  // 遵循 W3C 标准
        return {
            "width": document.documentElement.clientWidth,
            "height": document.documentElement.clientHeight
        };
    }
    return { // 非标准模式（怪异模式）
        "width": document.body.clientWidth,
        "height": document.body.clientHeight
    };
}

/**
 * 匀速动画函数
 * @param {object}obj
 * @param {number}target
 * @param {number}speed
 */
function constant(obj, target, speed) {
    // 1. 清除定时器
    clearInterval(obj.timer);

    // 2. 判断方向
    var dir = obj.offsetLeft < target ? speed : -speed;

    // 2. 设置定时器
    obj.timer = setInterval(function () {
        obj.style.left = obj.offsetLeft + dir + "px";
        if (Math.abs(target - obj.offsetLeft) < Math.abs(dir)) {
            clearInterval(obj.timer);
            obj.style.left = target + "px";
            console.log(obj.offsetLeft, target);
        }
    }, 20);
}