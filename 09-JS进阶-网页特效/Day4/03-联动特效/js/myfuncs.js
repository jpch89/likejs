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

/**
 * 获取CSS样式值
 * @param {object}obj
 * @param {string}attr
 * @returns {string}
 */
function getCssStyleValue(obj, attr) {
    if (obj.currentStyle) {  // IE 和 Opera
        return obj.currentStyle[attr];
    } else {
        return window.getComputedStyle(obj, null)[attr];
    }
}

/**
 * 缓动动画
 * @param obj
 * @param json
 * @param fn
 */
function buffer(obj, json, fn) {
    // 1.1 清除定时器
    clearInterval(obj.timer);

    // 1.2 设置定时器
    var begin = 0;
    var target = 0;
    var speed = 0;
    obj.timer = setInterval(function () {
        // 1.3.0 旗帜
        var flag = true;
        for (var k in json) {
            // 1.3 获取初始值
            if ("opacity" === k) {  // 设置透明度
                begin = Math.round(parseFloat(getCssStyleValue(obj, k)) * 100) || 100;
                target = parseInt(json[k] * 100);
            } else {  // 其他情况
                begin = parseInt(getCssStyleValue(obj, k)) || 0;
                target = json[k];
            }


            // 1.4 求出步长
            speed = (target - begin) * .2;
            // 1.5 判断是否向上取整
            speed = target > begin ? Math.ceil(speed) : Math.floor(speed);
            // 1.6 动起来
            if ("opacity" === k) {
                // 遵循 W3C的浏览器
                obj.style.opacity = (begin + speed) / 100;
                // ie 浏览器
                obj.style.filter = "alpha(opacity:" + (begin + speed) + ")";
            } else {
                obj.style[k] = begin + speed + "px";
            }

            // 1.7 判断
            if (begin !== target) {
                flag = false;
            }
        }
        // 1.3 清除定时器
        if (flag) {
            clearInterval(obj.timer);

            // 判断有没有回调函数
            if (fn) {
                fn();
            }

        }
    }, 20);
}