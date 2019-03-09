window.onload = function () {
    // 1. 获取需要的标签
    var slider = $("slider");
    // slider_main 就是有两个图片宽度的，可以滚动的那个东西
    // 它下面有所有的图
    var slider_main = $("slider_main");
    var slider_main_img = slider_main.children;
    var slider_ctl = slider.children[1];
    var iNow = 0;  // 当前索引

    // 2. 动态创建指示器
    var span;
    for (var i = 0; i < slider_main_img.length; i++) {
        span = document.createElement("span");
        span.className = "slider-ctl-icon";
        span.innerText = slider_main_img.length - i - 1;
        slider_ctl.insertBefore(span, slider_ctl.children[1]);
    }

    // 3. 让第一选中：注意赋值是覆盖操作，不是叠加操作！
    slider_ctl.children[1].className = "slider-ctl-icon current";

    // 4. 让滚动的内容归位
    var scroll_w = slider.offsetWidth;
    for (var j = 1; j < slider_main_img.length; j++) {
        slider_main_img[j].style.left = scroll_w + "px";
    }

    // 5. 遍历监听操作
    var slider_ctl_children = slider_ctl.children;
    for (var i = 0; i < slider_ctl_children.length; i++) {
        // 5.1 监听点击
        slider_ctl_children[i].onmousedown = function () {
            // 5.2 判断点击的位置
            if (this.className === "slider-ctl-prev") {  // 左边
                // 注意：点左边是看上一张，图片要右移！！！
                /*
                 1. 当前可视区域的图片快速右移
                 2. 上一张图片快速出现在可视区域的左边
                 3. 让这张图片做动画进入
                 */
                buffer(slider_main_img[iNow], {"left": scroll_w});
                iNow--;
                // 判断
                if (iNow < 0) {
                    iNow = slider_main_img.length - 1;
                }
                slider_main_img[iNow].style.left = -scroll_w + "px";
                buffer(slider_main_img[iNow], {"left": 0});

            } else if (this.className === "slider-ctl-next") {  // 右边
                /*
                 1. 当前可视区域的图片快速左移
                 2. 下一张图片快速出现在可视区域的右边
                 3. 让这张图片做动画进入
                 */
                buffer(slider_main_img[iNow], {"left": -scroll_w});
                iNow++;
                // 判断
                if (iNow > slider_main_img.length - 1) {
                    iNow = 0;
                }
                slider_main_img[iNow].style.left = scroll_w + "px";
                buffer(slider_main_img[iNow], {"left": 0});
            } else {  // 下边
                /*
                 1. 用当前点击的索引和选中索引对比
                 2. 点击的 > 选中的，相当于点击了右边的按钮
                 3. 点击的 < 选中的，相当于点击了左边的按钮
                 */
                // 获取索引号
                var index = parseInt(this.innerText);
                // 对比
                if (index > iNow) {
                    buffer(slider_main_img[iNow], {"left": -scroll_w});
                    slider_main_img[index].style.left = scroll_w + "px";
                } else if (index < iNow) {
                    buffer(slider_main_img[iNow], {"left": scroll_w});
                    slider_main_img[index].style.left = -scroll_w + "px";
                }
                iNow = index;
                buffer(slider_main_img[iNow], {"left": 0});
            }
            changeIndex();
        };
    }

    // 6. 切换索引
    function changeIndex() {
        for (var i = 1; i < slider_ctl_children.length - 1; i++) {
            slider_ctl_children[i].className = "slider-ctl-icon";
        }
        slider_ctl_children[iNow + 1].className = "slider-ctl-icon current";
    }

    // 7. 自动播放
    function autoplay() {
        /*
         1. 当前可视区域的图片快速左移
         2. 下一张图片快速出现在可视区域的右边
         3. 让这张图片做动画进入
         */
        buffer(slider_main_img[iNow], {"left": -scroll_w});
        iNow++;
        // 判断
        if (iNow > slider_main_img.length - 1) {
            iNow = 0;
        }
        slider_main_img[iNow].style.left = scroll_w + "px";
        buffer(slider_main_img[iNow], {"left": 0});
        changeIndex();
    }

    var timer = setInterval(autoplay, 1000);

    // 8. 设置和清除定时器
    slider.onmouseover = function () {
        clearInterval(timer);
    };
    slider.onmouseout = function () {
        timer = setInterval(autoplay, 1000);
    };

};