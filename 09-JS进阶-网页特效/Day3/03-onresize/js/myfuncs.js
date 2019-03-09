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
